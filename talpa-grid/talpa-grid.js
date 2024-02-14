"use strict"

let c = {
    canvas: null,
    ctx: null,
    tileSize: 240.4,
    hoverColor: 'rgba(255, 0, 0, 1)',
    defaultColor: 'rgba(0, 255, 0, 1)',
    fillColor: 'rgba(255, 255, 255, 0)',
    closeCircleColor: 'rgba(0, 0, 255, 1)',
    fadeOutPaths: [],
    paths: [],
    init() {
        this.canvas = document.getElementById("canvas1");
        this.ctx = this.canvas.getContext("2d");
        this.updateCanvasSize();
        window.addEventListener('resize', this.updateCanvasSize.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
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

                this.ctx.strokeStyle = pathObject.color;
                this.ctx.fillStyle = pathObject.fillColor;
                this.ctx.stroke(pathObject.path);
                this.ctx.fill(pathObject.path);
            });
        }
        this.handleFadeOut();
        requestAnimationFrame(this.rendering.bind(this));
    },
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        let hoveredCircleCInner = null;
        this.paths.forEach(path => {
            if (this.ctx.isPointInPath(path.path, x, y) && path.name === 'circleCInner') {
                hoveredCircleCInner = path;
            }
        });

        if (hoveredCircleCInner) {
            const closestCircleCInner = this.getClosestCircleCInner(hoveredCircleCInner, x, y);

            this.paths.forEach(path => {
                if (path.name === 'circleCInner') {
                    if (path === hoveredCircleCInner) {
                        path.color = this.hoverColor;
                        path.fillColor = this.hoverColor;
                    } else if (path === closestCircleCInner) {
                        path.color = this.closeCircleColor;
                        path.fillColor = this.closeCircleColor;
                    } else {

                        if (!this.fadeOutPaths.includes(path)) {
                            console.log('path', path);
                            this.fadeOutPaths.push(path);
                        } else {
                            path.color = this.defaultColor;
                            path.fillColor = this.fillColor;

                        }
                    }
                }
            });
        }

        this.prevMouseX = x;
        this.prevMouseY = y;
    },
    getClosestCircleCInner(hoveredCircle, x, y) {
        let closestCircle;
        let closestDistance = Infinity;

        const dx = x - this.prevMouseX;
        const dy = y - this.prevMouseY;

        this.paths.forEach(path => {

            if (path.name === 'circleCInner' && path !== hoveredCircle) {
                const directionToPathX = path.centerX - hoveredCircle.centerX;
                const directionToPathY = path.centerY - hoveredCircle.centerY;

                // Check if the direction to this path is roughly the same as the direction of mouse movement
                if (dx * directionToPathX + dy * directionToPathY > 0) {
                    const distance = Math.sqrt(directionToPathX * directionToPathX + directionToPathY * directionToPathY);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCircle = path;
                    }
                }
            }
        });

        return closestCircle;
    },
    handleFadeOut() {
        this.fadeOutPaths = this.fadeOutPaths.filter(path => {
            const color = path.color;
            const alpha = parseFloat(color.slice(color.lastIndexOf(",") + 1, color.length - 1));
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
            { name: 'square', type: 'rect', params: [x, y, squareSize, squareSize] },
            { name: 'circleA', type: 'arc', params: [x, y, 58.8, 0, Math.PI * 2] },
            { name: 'circleAInner', type: 'arc', params: [x, y, 40.75, 0, Math.PI * 2] },
            { name: 'circleB', type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 129.2, 0, Math.PI * 2] },
            { name: 'circleBInner', type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 111.18, 0, Math.PI * 2] },
            { name: 'circleC', type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 58.8, 0, Math.PI * 2] },
            { name: 'circleCInner', type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 40.75, 0, Math.PI * 2] },
        ];

        shapes.forEach(shape => {
            const path = new Path2D();
            path[shape.type](...shape.params);
            this.paths.push({ name: shape.name, path, color: shape.color || this.defaultColor, fillColor: shape.fillColor || this.fillColor, centerX: x + squareSize / 2, centerY: y + squareSize / 2 });
        });
    }
}

window.addEventListener("load", () => {
    c.init();
})