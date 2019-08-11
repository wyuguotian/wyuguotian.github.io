// JavaScript source code
var circleArray = [];
var particleNum = 2; //Define the # of circles generated per mousemove
var max_radius = 7; //Define the maximum radius of the circles
var min_radius = 1; //Define the minimum radius of the circles
var colorArray = ["255,250,250", "0,255,255", "255,255,224", "147,112,219",
    "144,238,144", "255,187,255", "	255,114,86"];
var frame = 0;

function Circle(life, radius, color, posi_x, posi_y, moveDirection_x, moveDirection_y) {
    this.opacity = 1;
    this.life = life;
    this.radius = radius;
    this.color = color;
    this.posi_x = posi_x;
    this.posi_y = posi_y;
    this.moveDirection_x = moveDirection_x;
    this.moveDirection_y = moveDirection_y;
}

window.onload = function () {
    reSizeCanvas();
    circleArray = [];
    animate();
    /*setInterval(update, 50);
    setInterval(clearCanvas, 50);
    setInterval(draw, 50);*/
};

window.onresize = function () {
    reSizeCanvas();
}

window.onclick = function (event) {
    createCircle(event.x, event.y);
    /*setTimeout(clearCanvas, 4000);*/
    draw();
}

window.onmousemove = function (event) {
    createCircle(event.x, event.y);
    draw();
}

function reSizeCanvas() {
    var canvas = document.getElementById("FirstCanvas");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
}

function drawRec() {
    var canvas = document.getElementById("FirstCanvas");
    var context = canvas.getContext("2d");
    context.fillRect(10, 10, 1000, 1000);
}

function drawCircle(Circle, context) {
    context.beginPath();
    context.arc(Circle.posi_x, Circle.posi_y, Circle.radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba( " + Circle.color + "," + Circle.opacity + ") ";
    context.fill();
    context.closePath();
}

function clearCanvas() {
    var canvas = document.getElementById("FirstCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function createCircle(x, y) {
    if (max_radius < min_radius) {
        var temp = min_radius;
        min_radius = max_radius;
        max_radius = temp;
    }
    for (var i = 0; i < particleNum; i++) {
        var radius = Math.floor(min_radius + Math.random() * (max_radius - min_radius));
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        var posi_x = x;
        var posi_y = y;
        var life = Math.floor(Math.random() * 10) + 95; //Hard coded for life span
        var moveDX = Math.random() * 2.5 - 1.25;
        var moveDY = Math.random() * 2.5 - 1.25;
        var circle = new Circle(life, radius, color, posi_x, posi_y, moveDX, moveDY);
        circleArray.push(circle);
    }
}

function draw() {
    var canvas = document.getElementById("FirstCanvas");
    var context = canvas.getContext("2d");
    for (var i = 0; i < circleArray.length; i++) {
        drawCircle(circleArray[i], context);
    }
}

function update() {
    if (circleArray.length === 0) {
        return;
    }
    for (var i = 0; i < circleArray.length; i++) {
        var circle = circleArray[i];
        circle.life -= 1;
        if (circle.life <= 0) {
            circleArray.splice(i, 1);
            continue;
        }
        if (circle.posi_x + circle.moveDirection_x > window.innerWidth || circle.posi_x + circle.moveDirection_x < 0) {
            circle.moveDirection_x = -circle.moveDirection_x;
        }
        if (circle.posi_y + circle.moveDirection_y > window.innerHeight || circle.posi_y + circle.moveDirection_y < 0) {
            circle.moveDirection_y = -circle.moveDirection_y;
        }
        circle.posi_x += circle.moveDirection_x;
        circle.posi_y += circle.moveDirection_y;

        circle.opacity -= 0.01;
        
    }
}

function animate() {
    requestAnimationFrame(animate);
    clearCanvas();
    update();
    draw();
}