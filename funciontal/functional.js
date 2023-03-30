// "use strict";
//
// const c = (() => {
//     let canvas, ctx, x, y, amt, colors, array, life, angle;
//
//     const init = () => {
//         canvas = document.getElementById("canvas1");
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         ctx = canvas.getContext("2d");
//         paint();
//         canvas.addEventListener("mousemove", onMouseMove, false);
//         rendering();
//     };
//
//     const onMouseMove = e => {
//         ctx.fillStyle = 'hsla(0, 0%, 0%, .1)';
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         x = e.pageX;
//         y = e.pageY;
//         for (let i = 0; i < amt; i++) {
//             array.push(new Sprite({x, y, l: 20, color: colors[i]}));
//             life.push(1);
//             angle.push(i + 360);
//         }
//     };
//
//     const rendering = () => {
//         for (let i = 0; i < array.length; i++) {
//             array[i].update(i);
//         }
//         requestAnimationFrame(rendering);
//     };
//
//     const paint = () => {
//         colors = [];
//         for (let i = 0; i < amt; i++) {
//             colors.push(hsl(${i * 360 / amt}, 100 %, 50 %, 1));
//         }
//     };
//
//     return {
//         canvas,
//         ctx,
//         x,
//         y,
//         amt: 30,
//         colors: [],
//         array: [],
//         life: [],
//         angle: [],
//         init,
//     };
// })();
//
// window.addEventListener("load", () => {
//     c.init();
// });
//
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
//
//     update(i) {
//         if (c.life[i] < 150) {
//             c.life[i]++;
//         }
//     }


    "use strict";

    const COLORS = Array.from({ length: 30 }, (_, i) =>`hsl(${i * 360 / 30}, 100%, 50%, 1)`);

    const createSprite = (x, y, color) => ({
        x,
        y,
        oldX: x,
        oldY: y,
        l: 20,
        color,
        dx: undefined,
        dy: undefined,
        shift: undefined,
        gravity: 0.3,
    });

    const updateSprite = (sprite, index, mouseX, mouseY, ctx) => {
        if (sprite.life < 150) {
            sprite.life++;
            sprite.shift = ((sprite.x - mouseX) ** 2 + (sprite.y - mouseY) ** 2) ** 0.25;
            sprite.angle -= 0.0001 * sprite.angle;
            sprite.dx = sprite.shift * Math.cos(sprite.angle);
            sprite.dy = sprite.shift * Math.sin(sprite.angle);
            sprite.x += sprite.dx + (sprite.oldX - sprite.x) * sprite.gravity;
            sprite.y += sprite.dy + (sprite.oldY - sprite.y) * sprite.gravity;
            ctx.fillStyle = sprite.color;
            ctx.fillRect(sprite.x, sprite.y, sprite.l - sprite.life / 5, sprite.l - sprite.life / 5);
        } else {
            c.array.splice(index, 1);
            c.angle.splice(index, 1);
            c.life.splice(index, 1);
        }
    };

    const initialize = () => {
        const canvas = document.getElementById("canvas1");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");
        const array = [];
        const life = [];
        const angle = [];

        const paint = () => {
            for (let i = 0; i < COLORS.length; i++) {
                COLORS.push(`hsl(${i * 360 / COLORS.length}, 100%, 50%, 1)`);
            }
        };

        canvas.addEventListener("mousemove", (e) => {
            ctx.fillStyle = "hsla(0, 0%, 0%, .1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const mouseX = e.pageX;
            const mouseY = e.pageY;
            for (let i = 0; i < COLORS.length; i++) {
                array.push(createSprite(mouseX, mouseY, COLORS[i]));
                life.push(1);
                angle.push(i + 360);
            }
        }, false);

        const rendering = () => {
            for (let i = 0; i < array.length; i++) {
                updateSprite(array[i], i, c.x, c.y, ctx);
            }
            requestAnimationFrame(rendering);
        };

        return {
            canvas,
            ctx,
            array,
            life,
            angle,
            rendering,
        };
    };

    const c = initialize();

    window.addEventListener("load", () => {
    c.rendering();
});