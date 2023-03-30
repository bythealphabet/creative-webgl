"use strict"

var Painter = (function(){

    var context = null;
    var donuts = [];
    var text = "bobconton";
    var font = "48px Arial";
    var colors = ["#ff4d4d", "#ff80bf", "#ffcccc"];

    function initDonuts() {
        for (var i = 0; i < 3; i++) {
            var donut = {
                x: Math.random() * context.canvas.width,
                y: Math.random() * context.canvas.height,
                radius: 50 + Math.random() * 50,
                color: colors[i],
                vx: Math.random() * 10 - 5,
                vy: Math.random() * 10 - 5
            };
            donuts.push(donut);
        }
    }

    function drawDonut(donut) {
        context.beginPath();
        context.arc(donut.x, donut.y, donut.radius, 0, 2 * Math.PI, false);
        context.fillStyle = donut.color;
        context.shadowBlur = 20;
        context.shadowColor = "#999";
        context.fill();
    }

    function drawText() {
        context.font = font;
        context.fillStyle = "#fff";
        context.textAlign = "center";
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            if (char == "o") {
                var donut = donuts[i % donuts.length];
                context.fillStyle = donut.color;
                drawDonut(donut);
            } else {
                context.fillText(char, context.canvas.width/2 + (i - 2) * 60, context.canvas.height/2 + 20);
            }
        }
    }

    function animate(startTime) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i = 0; i < donuts.length; i++) {
            var donut = donuts[i];
            donut.x += donut.vx;
            donut.y += donut.vy;
            if (donut.x < donut.radius || donut.x > context.canvas.width - donut.radius) {
                donut.vx = -donut.vx;
            }
            if (donut.y < donut.radius || donut.y > context.canvas.height - donut.radius) {
                donut.vy = -donut.vy;
            }
            drawDonut(donut);
        }
        drawText();
        if (Date.now() - startTime < 5000) {
            requestAnimationFrame(animate);
        }
    }

    return {
        init : function(ctx){
            context = ctx;
            initDonuts();
        },
        drawAnimation : function(){
            let startTime = Date.now();
            animate(startTime);
        }
    }

})();

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
Painter.init(context);
Painter.drawAnimation();
