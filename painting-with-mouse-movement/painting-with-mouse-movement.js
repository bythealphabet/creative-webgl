"use strict"

let c = {
    canvas: null,
    cts: null,
    x: undefined,
    y: undefined,
    amt: 30,
    colors: [],
    array: [],
    life: [],
    angle: [],
    init() {
        this.canvas = document.getElementById("canvas1")
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d")
        this.paint();
        this.canvas.addEventListener("mousemove", function (e) {
            c.ctx.fillStyle = 'hsla(0, 0%, 0%, .1)';
            c.ctx.fillRect(0, 0, c.canvas.width, c.canvas.height);
            c.x = e.pageX;
            c.y = e.pageY;
            for (let i = 0; i < c.amt; i++) {
                c.array.push(new Sprite({x: c.x, y: c.y, l: 20, color: c.colors[i]}))
                c.life.push(1);
                c.angle.push(i + 360);
            }
        }, false)
        this.rendering();
    },
    paint() {
        for (let i = 0; i < this.amt; i++) {
            this.colors.push(`hsl(${i * 360 / this.amt}, 100%, 50%, 1)`)
        }
    },
    rendering() {
        for (let i = 0; i < c.array.length; i++) {
            c.array[i].update(i);
        }
        requestAnimationFrame(c.rendering);
    }
}

window.addEventListener("load",()=>{
    c.init();
})

class Sprite {
    constructor(options) {
        this.x = this.oldX = options.x;
        this.y = this.oldY = options.y;
        this.l = options.l;
        this.color = options.color;
        this.dx = this.dy = undefined;
        this.shift = undefined;
        this.gravity = 0.3;
    }

    update(i) {
        if (c.life[i] < 150) {
            c.life[i]++
            
            this.shift = ((this.x - c.x)**2 + (this.y - c.y)**2)**0.25;
            c.angle[i] -=0.0001 * c.angle[i]
            this.dx = this.shift * Math.cos(c.angle[i]);
            this.dy = this.shift * Math.sin(c.angle[i]);
            this.x += this.dx + (this.oldX - this.x) * this.gravity;
            this.y += this.dy + (this.oldY - this.y) * this.gravity;
            c.ctx.fillStyle = this.color;
            c.ctx.fillRect(this.x, this.y, this.l-c.life[i]/5, this.l-c.life[i]/5);
        } else {
            c.array.splice(i, 1)
            c.angle.splice(i, 1)
            c.life.splice(i, 1)
        }
    }
}