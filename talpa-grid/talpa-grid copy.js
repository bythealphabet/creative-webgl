"use strict"

let c = {
    canvas: null,
    ctx: null,
    tileSize: 240.4,
    renderedElements: [],
    elements: [
        {
            name: 'rectangle',
            x: 58.8,
            y: 58.8,
            w: 240.4,
            h: 240.4,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 58.8,
            y: 58.8,
            radius: 58.8,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 58.8,
            y: 58.8,
            radius: 40.75,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 178.2,
            y: 178.2,
            radius: 129.2,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 178.2,
            y: 178.2,
            radius: 111.18,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 178.2,
            y: 178.2,
            radius: 40.75,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        },
        {
            name: 'circle',
            x: 178.2,
            y: 178.2,
            radius: 58.8,
            startAngle: 0,
            endAngle: Math.PI * 2,
            color: 'rgba(0, 0, 0, 1)',
            isHovered: false
        }
    ],
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
        this.renderedElements = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.canvas.width; x += this.tileSize) {
            for (let y = 0; y < this.canvas.height; y += this.tileSize) {
                this.drawTile({ x, y });
            }
        }
        // this.elements.forEach(element => {
        //     if (element.isHovered && element.name === 'circle') {
        //         if (element.color !== 'black') {
        //             this.transitionToBlack(element);
        //         }
        //     } else if (element.color !== 'black') {
        //         element.color = 'rgba(0, 0, 0, 1)';
        //     }
        // });
        requestAnimationFrame(this.rendering.bind(this));
    },
    checkMouseHover(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.renderedElements.forEach(element => {
            if (element.name === 'circle') {
                const dx = x - element.x;
                const dy = y - element.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < element.radius) {
                    element.isHovered = true;
                } else {
                    element.isHovered = false;
                }
            }
        });
    },
    transitionToBlack(element) {
        const color = element.color.match(/\d+/g);  // get array ["0", "0", "0", "1"]
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
    },
    drawRectangle({ x, y, w, h, color }) {
        const rectangle = new Path2D();
        rectangle.rect(x, y, w, h);
        this.ctx.stroke(rectangle);
    },
    drawCircle({ x, y, radius, startAngle, endAngle, counterclockwise }) {
        const circle = new Path2D();
        circle.arc(x, y, radius, startAngle, endAngle, counterclockwise);
        this.ctx.stroke(circle);
    },
    drawTile(startPoint) {
        this.elements.forEach(element => {
            let transformedElement = {
                ...element,
                x: element.x + startPoint.x,
                y: element.y + startPoint.y
            };
            switch (element.name) {
                case 'rectangle':
                    this.drawRectangle(transformedElement);
                    break;
                case 'circle':
                    this.drawCircle(transformedElement);
                    break;
                default:
                    break;
            }
        });
    }
}

window.addEventListener("load", () => {
    c.init();
})
