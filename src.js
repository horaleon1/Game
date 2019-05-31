//Variables
var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 500;
//Clases
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = canvas.width;
    this.h = canvas.height;
  }
  draw() {
    canvas.fillRect(0, 0, canvas.width, canvas.height);
  }
}

var board = new Board();

class Ninja {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velX = 0;
    this.velY = 0;
    this.jumping = true;
  }
  draw() {
    context.fillStyle = "rgb(200,0,200)";
    context.fillRect(this.x, this.y, this.w, this.h);
  }
  moveRight() {
    if (this.x < 950) this.x += 10;
  }

  moveLeft() {
    if (this.x > 0) this.x -= 10;
  }

  moveJump() {
 
    if (this.y < 500 && this.y > 30) {
       this.y -= 20;
    }
      ninja.velY += 1.5;

  }
  moveDown() {
    console.log(this.y, this.h)
    if (this.y > 0 && this.y + this.h <= 500) this.y += 30;
  }
}

var ninja = new Ninja(10, 450, 50, 50);

//let { x,y,w,h } = ninja;

//console.log( x,y,w,h)

//Hacer el draw de cada clase
function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ninja.draw();
}

setInterval(() => {
  update();
}, 1000 / 60);

window.addEventListener("keydown", e => {
  if (e.keyCode === 39) ninja.moveRight();
  
  if (e.keyCode === 37) ninja.moveLeft();

  
  if (e.keyCode === 38) {

     ninja.moveJump();
    //ninja.jumping = false;

  }

  if (e.keyCode === 40) {
    ninja.moveDown();
  }
});

var seg = 75;
let timer = document.getElementById("timer");
let auxTimer = "";

function cronometro() {
  setInterval(() => {
    if (seg <= 9) auxTimer = "0" + seg;
    else if (seg >= 10 && seg <= 75) auxTimer = seg;
    // else if (seg > 59)
      // if (seg % 60 == 0) {
      //   console.log("1:00");
      // }
    timer.innerHTML = auxTimer;
    seg--;
    
  }, 200);
}
cronometro();

// function stopCronometro(){
//   if (cronometro() >= 0){
//     clearInterval();
//     }
// }
// stopCronometro();
