"use strict";

let c = {
  canvas: null,
  ctx: null,
  tileSize: 240.4,
  hoverColor: "rgba(255, 0, 0, 1)",
  defaultColor: "rgba(0, 255, 0, 1)",
  //   fillColor: "rgba(255, 255, 255, 0)",
  fillColor: "rgba(0, 0, 0, 1)",

  closeCircleColor: "rgba(0, 0, 255, 1)",
  fadeOutPaths: [],
  paths: [],
  init() {
    this.canvas = document.getElementById("canvas1");
    this.ctx = this.canvas.getContext("2d");
    this.updateCanvasSize();
    window.addEventListener("resize", this.updateCanvasSize.bind(this));
    this.canvas.addEventListener(
      "mousemove",
      this.throttle(this.handleMouseMove.bind(this), 10)
    );
    this.savedgco = this.ctx.globalCompositeOperation;
    this.prevMouseX = null;
    this.prevMouseY = null;
    this.ctx.save();
    this.rendering();
  },
  updateCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  rendering() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.paths.length === 0) {
      for (let x = 0; x < this.canvas.width; x += this.tileSize) {
        for (let y = 0; y < this.canvas.height; y += this.tileSize) {
          this.drawTile({ x, y });
        }
      }
    } else {
      this.paths.forEach((pathObject, index) => {
        if (index === 1) {
        }

        // Gradually adjust opacity towards targetOpacity
        if (pathObject.opacity < pathObject.targetOpacity) {
          pathObject.opacity += 0.05; // Speed of fade in
        } else if (pathObject.opacity > pathObject.targetOpacity) {
          pathObject.opacity -= 0.05; // Speed of fade out
        }
        pathObject.opacity = Math.max(0, Math.min(1, pathObject.opacity)); // Clamp between 0 and 1

        // Apply opacity to fillColor and strokeColor
        const fillColor = this.applyOpacityToColor(
          pathObject.fillColor,
          pathObject.opacity
        );
        const strokeColor = this.applyOpacityToColor(
          pathObject.color,
          pathObject.opacity
        );

        this.ctx.fillStyle = fillColor;
        this.ctx.strokeStyle = strokeColor;
        this.ctx.stroke(pathObject.path);
        this.ctx.fill(pathObject.path);
      });
    }
    this.handleFadeOut();
    requestAnimationFrame(this.rendering.bind(this));
  },
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Reset styles for all paths
    this.paths.forEach((path) => {
      path.color = this.defaultColor; // Reset to default color
      path.fillColor = this.fillColor; // Reset to default fill color
      path.targetOpacity = 0; // Set default target opacity for fade out
    });

    let hoveredCircleIndex = null;
    this.paths.forEach((path, index) => {
      if (this.ctx.isPointInPath(path.path, mouseX, mouseY)) {
        hoveredCircleIndex = index;
        path.targetOpacity = 1; // Fade in
      }
    });

    if (hoveredCircleIndex !== null) {
      const hoveredCircle = this.paths[hoveredCircleIndex];
      const diagonalCircle = this.findDiagonalCircle(hoveredCircle);
      if (diagonalCircle) {
        diagonalCircle.targetOpacity = 1; // Fade in
      }
    }

    // No need to call rendering here; it's continuously called by requestAnimationFrame
  },
  findDiagonalCircle(hoveredCircle) {
    const diagonalCircleDistance =
      Math.sqrt(Math.pow(this.tileSize, 2) + Math.pow(this.tileSize, 2)) / 2;
    const potentialDiagonalCircles = this.paths.filter((path) => {
      const xDistance = Math.abs(path.centerX - hoveredCircle.centerX);
      const yDistance = Math.abs(path.centerY - hoveredCircle.centerY);
      return (
        Math.abs(xDistance - diagonalCircleDistance) < 10 &&
        Math.abs(yDistance - diagonalCircleDistance) < 10
      );
    });

    // Return the first circle found that matches the criteria or null if none found
    return potentialDiagonalCircles.length > 0
      ? potentialDiagonalCircles[0]
      : null;
  },
  applyOpacityToColor(color, opacity) {
    // Assuming color is in "rgba(r, g, b, a)" format
    return color.replace(/[\d\.]+\)$/g, `${opacity})`);
  },
  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  },
  handleFadeOut() {
    this.fadeOutPaths = this.fadeOutPaths.filter((path) => {
      const color = path.color;
      const alpha = parseFloat(
        color.slice(color.lastIndexOf(",") + 1, color.length - 1)
      );
      if (alpha <= 0) {
        return false; // remove the path from fadeOutPaths array if its alpha is 0
      } else {
        // reduce the alpha by 0.01 (you can adjust this value for faster or slower fade)
        const newAlpha = Math.max(0, alpha - 0.01);
        path.color = color.replace(alpha, newAlpha);
        return true;
      }
    });
  },
  drawTile({ x, y }) {
    const squareSize = 240.4;

    const shapes = [
      //   { name: "square", type: "rect", params: [x, y, squareSize, squareSize] },
      //   { name: "circleA", type: "arc", params: [x, y, 58.8, 0, Math.PI * 2] },
      {
        name: "circleAInner",
        type: "arc",
        params: [x, y, 40.75, 0, Math.PI * 2],
      },
      {
        name: "circleB",
        type: "arc",
        params: [x + squareSize / 2, y + squareSize / 2, 129.2, 0, Math.PI * 2],
      },
      {
        name: "circleBInner",
        type: "arc",
        params: [
          x + squareSize / 2,
          y + squareSize / 2,
          111.18,
          0,
          Math.PI * 2,
        ],
      },
      {
        name: "circleC",
        type: "arc",
        params: [x + squareSize / 2, y + squareSize / 2, 58.8, 0, Math.PI * 2],
      },
      {
        name: "circleCInner",
        type: "arc",
        params: [x + squareSize / 2, y + squareSize / 2, 40.75, 0, Math.PI * 2],
      },
    ];

    shapes.forEach((shape) => {
      const path = new Path2D();
      path[shape.type](...shape.params);
      this.paths.push({
        name: shape.name,
        path,
        color: shape.color || this.defaultColor,
        fillColor: shape.fillColor || this.fillColor,
        centerX: x + squareSize / 2,
        centerY: y + squareSize / 2,
        opacity: 0, // Start fully transparent
        targetOpacity: 0, // Target opacity, will change on hover
      });
    });
  },
};

window.addEventListener("load", () => {
  c.init();
});
