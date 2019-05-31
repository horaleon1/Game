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

var board = new Board(), gravedad = 4; 
var cronometro, friccion;

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

  gravity() {
    this.y += gravedad ;
    this.x += 2;
  }

  moveRight() {
    if (this.x < 950) this.x += 20;
  }

  moveLeft() {
    if (this.x > 0) this.x -= 10;
  }

  moveJump() {

    if (this.y < 500 && this.y > 30) {
       this.y -= 100;
    }  
        // this.velY *=0.9 
        // this.y = this.velY;

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
  if(ninja.y < (canvas.height - 50)) {
    ninja.gravity();
  }
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

  }

  if (e.keyCode === 40) {
    ninja.moveDown();
  }
});

var seg = 75;
let timer = document.getElementById("timer");
let auxTimer = "";

function cronometro() {
  cronometro = setInterval(() => {
    if (seg <= 9) auxTimer = "0" + seg;
    else if (seg >= 10 && seg <= 75) auxTimer = seg;
    // else if (seg > 59)
      // if (seg % 60 == 0) {
      //   console.log("1:00");
      // }
    timer.innerHTML = auxTimer;
    seg--;
    
  }, 200);
  if (seg <= 0){
    clearInterval(cronometro);
  }
}
cronometro();

function stopCronometro(){
  if (cronometro() >= 0){
    clearInterval(cronometro);
    }
}
stopCronometro();
