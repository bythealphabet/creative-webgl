"use strict";

const c = (() => {
    let canvas, ctx, x, y;
    let savedgco;
    let colors = [];
    let array = [];
    let life = [];
    let angle = [];
    let amt = 30;
    const rectangle = {name: "rectangle", x: 400, y: 400, w: 100, h: 150, color: "blue"};
    const init = () => {
        canvas = document.getElementById("canvas1");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.onmousedown = () => {
            return false;
        }

        ctx = canvas.getContext("2d");
        savedgco = ctx.globalCompositeOperation;
        ctx.save();
        canvas.addEventListener("mousemove", onMouseMove, false);
        const frame = {{x: 0, y: 0, w: 800, h: 600, color: "#cccc"}
        const elements = [
            {
                name: "circle",
                x: 200,
                y: 200,
                radius: 100,
                startAngle: 0,
                endAngle: Math.PI * 2,
                counterclockwise: true,
                color: "salmon"
            },
            {name: "rectangle", x: 400, y: 400, w: 100, h: 150, color: "blue"}
        ]
        rendering(frame, elements)
    };


    function createElement() {

    }

    function createFrame({ctx, frame}) {
        ctx.clearRect(frame.x, frame.y, frame.width, frame.height);
        ctx.strokeStyle = frame.color;
        ctx.lineWidth = 5;


        ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
    }

    const onMouseMove = e => {
        ctx.fillStyle = 'hsla(0, 0%, 0%, .1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // x = e.pageX;
        // y = e.pageY;
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        for (let i = 0; i < amt; i++) {
            array.push(createSprite(mouseX, mouseY, COLORS[i]));
            life.push(1);
            angle.push(i + 360);
        }
    };

    const rendering = (elements, frame) => {
        createFrame({ctx, frame})
        for (let i = 0; i < elements.length; i++) {
            let {x, y, w, h, color} = elements[i];
            ctx.fillStyle = color;

            const rectangle = new Path2D();
            rectangle.rect(x, y, w, h);
            ctx.fill(rectangle);
        }
        requestAnimationFrame(rendering);
    };

    function paint(colors) {
        // for (let i = 0; i < amt; i++) {
        //     colors.push(`hsl(${i * 360 / amt}, 100%, 50%, 1)`);
        // }
        return colors.map((color) => {
            return `hsl(${i * 360 / amt}, 100%, 50%, 1)`
        });
    };

    return {
        canvas,
        ctx,
        x,
        y,
        amt,
        colors,
        array,
        life,
        angle,
        init,
    };
})();

window.addEventListener("load", () => {
    c.init();
});

// class Sprite {
//     constructor(options) {
//         this.x = this.oldX = options.x;
//         this.y = this.oldY = options.y;
//         this.l = options.l;
//         this.color = options.color;
//         this.dx = this.dy = undefined;
//         this.shift = undefined;
//         this.gravity = 0.3;
//     }
// }

// update(i) {
//     if (c.life[i] < 150) {
//         c.life[i]++;
//         this.shift = ((this.x - c.x) ** 2 + (this.y - c.y) ** 2) ** 0.25;
//         c.angle[i] -= 0.0001 * c.angle[i];
//         this.dx = this.shift * Math.cos(c.angle[i]);
//         this.dy = this.shift * Math.sin(c.angle[i]);
//         this.x += this.dx + (this.oldX - this.x) * this.gravity;
//         this.y += this.dy + (this.oldY - this.y) * this.gravity;
//         c.ctx.fillStyle = this.color;
//         c.ctx.fillRect(
//             this.x,
//             this.y,
//             this.l - c.life[i] / 5,
//             this.l - c.life[i] / 5
//         );
//     } else {
//         c.array.splice(i, 1);
//         c.angle.splice(i, 1);
//         c.life.splice(i, 1);
//     }
//
// }
