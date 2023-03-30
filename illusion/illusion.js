"use strict"

let c = {
    ctx: null,
    canvas: null,
    w: undefined,
    h: undefined,
    init() {
        this.canvas = document.getElementById("canvas1")
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w; 
        this.canvas.height = this.h; 
        this.ctx = this.canvas.getContext("2d")
        console.log("ctx", this.ctx);
    }
}

function lightShadow(x, y) {
    let indentX = x - c.w / 2
    let indentY = y - c.h / 2;
    let L = Math.sqrt(Math.pow(indentX, 2) + Math.pow(indentY, 2)) + 0.1;
    let dx = c.h / 100 * indentX / Math.sqrt(L);
    let dy = c.h / 100 * indentY / Math.sqrt(L);

    c.canvas.width = c.canvas.width;
    c.ctx.arc(c.w / 2, c.h / 2, c.h / 3.5, 0, 2 * Math.PI);
    let gradient = c.ctx.createRadialGradient(c.w/2 + dx, c.h/2 + dy, 0,
                                            c.w/2 + dx, c.h/2 + dy, c.h/3.5);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "black");
    c.ctx.fillStyle = gradient;

    c.ctx.shadowColor = "#3e3e3e"
    c.ctx.shadowBlur = 50;
    c.ctx.shadowOffsetX = -dx;
    c.ctx.shadowOffsetY = -dy;
    c.ctx.fill();
}


window.addEventListener("load", () => {
    c.init();
    lightShadow(c.w / 2, c.h / 2);
})

window.addEventListener('mousemove', function (e) {
    lightShadow(e.x, e.y)
}, false)
