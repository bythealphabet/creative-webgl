"use strict"

let c = {
    canvas: null,
    ctx: null,
    tileSize: 240.4,
    hoverColor: 'rgba(255, 0, 0, 1)',
    defaultColor: 'rgba(0, 255, 0, 1)',
    paths: [],
    init() {
        this.canvas = document.getElementById("canvas1");
        this.ctx = this.canvas.getContext("2d");
        this.updateCanvasSize();
        window.addEventListener('resize', this.updateCanvasSize.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
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
            this.paths.forEach(pathObject => {
                this.ctx.strokeStyle = pathObject.color;
                this.ctx.stroke(pathObject.path);
            });
        }

        requestAnimationFrame(this.rendering.bind(this));
    },
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.paths.forEach(path => {
            if (this.ctx.isPointInStroke(path.path, x, y)) {
                console.log('path.color', path.color);
                path.color = this.hoverColor;
            } else {
                path.color = this.defaultColor;
            }
        });
    },
    drawTile({ x, y }) {

        const squareSize = 240.4;

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
            this.paths.push({ path, color: shape.color || this.defaultColor });
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
