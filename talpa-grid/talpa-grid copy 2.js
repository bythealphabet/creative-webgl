"use strict"

let c = {
    canvas: null,
    ctx: null,
    tileSize: 240.4,
    renderedElements: [],
    init() {
        this.canvas = document.getElementById("canvas1");
        this.ctx = this.canvas.getContext("2d");
        this.updateCanvasSize();
        window.addEventListener('resize', this.updateCanvasSize.bind(this));
        this.canvas.addEventListener("mousemove", this.checkMouseHover.bind(this));
        this.rendering();
    },
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    rendering() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.canvas.width; x += this.tileSize) {
            for (let y = 0; y < this.canvas.height; y += this.tileSize) {
                this.drawTile({ x, y });
            }
        }
        requestAnimationFrame(this.rendering.bind(this));
    },
    checkMouseHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.elements.forEach(element => {
            if (element.name === 'circle') {
                const dx = x - element.x;
                const dy = y - element.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < element.radius) {
                    element.isHovered = true;
                    this.transitionToBlack(element);
                } else {
                    element.isHovered = false;
                    element.color = 'rgba(255, 0, 0, 1)';
                }
            }
        });
    },
    transitionToBlack(element) {
        const color = element.color.match(/\d+/g);
        let r = Number(color[0]);
        let g = Number(color[1]);
        let b = Number(color[2]);
        let a = Number(color[3]);
        r -= 10;
        g -= 10;
        b -= 10;
        a += 0.1;
        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;
        if (a > 1) a = 1;
        element.color = `rgba(${r},${g},${b},${a})`;
        const originalElement = this.elements.find(e => e === element);
        if (originalElement) {
            originalElement.color = `rgba(${r},${g},${b},${a})`;
        }
    },
    drawTile({ x, y }) {

        const squareSize = 240.4;

        this.ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        const shapes = [
            { type: 'rect', params: [x, y, squareSize, squareSize] },
            { type: 'arc', params: [x, y, 58.8, 0, Math.PI * 2] },
            { type: 'arc', params: [x, y, 40.75, 0, Math.PI * 2] },
            { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 129.2, 0, Math.PI * 2] },
            { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 111.18, 0, Math.PI * 2] },
            { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 58.8, 0, Math.PI * 2] },
            { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 40.75, 0, Math.PI * 2] },
        ];

        shapes.forEach(shape => {
            const path = new Path2D();
            path[shape.type](...shape.params);
            this.ctx.stroke(path);
        });
    }
}



window.addEventListener("load", () => {
    c.init();
})



function createTile(startPoint) {
    const { x, y } = startPoint;
    const squareSize = 240.4;

    this.ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    const shapes = [
        { type: 'rect', params: [x, y, squareSize, squareSize] },
        { type: 'arc', params: [x, y, 58.8, 0, Math.PI * 2] },
        { type: 'arc', params: [x, y, 40.75, 0, Math.PI * 2] },
        { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 129.2, 0, Math.PI * 2] },
        { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 111.18, 0, Math.PI * 2] },
        { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 58.8, 0, Math.PI * 2] },
        { type: 'arc', params: [x + squareSize / 2, y + squareSize / 2, 40.75, 0, Math.PI * 2] },
    ];

    shapes.forEach(shape => {
        const path = new Path2D();
        path[shape.type](...shape.params);
        this.ctx.stroke(path);
    });
}


// getClosestCircleCInner(hoveredCircle, x, y) {
//     let closestCircle;
//     let closestDistance = Infinity;
//     let distance;

//     this.paths.forEach(path => {
//         if (path.name === 'circleCInner' && path !== hoveredCircle) {
//             distance = Math.sqrt(Math.pow(x - path.centerX, 2) + Math.pow(y - path.centerY, 2));

//             if (distance < closestDistance && x > hoveredCircle.centerX && hoveredCircle.centerX < path.centerX) {
//                 console.log('wow', path);
//                 console.log('centerX', path.centerX);
//                 console.log('hover', hoveredCircle.centerX);

//                 closestCircle = path;
//                 // return path

//                 console.log('wow',);
//                 return
//             }


//             // if (distance < closestDistance) {
//             //     closestDistance = distance;
//             //     closestCircle = path;
//             // }
//         }
//     });

//     return closestCircle;
// },