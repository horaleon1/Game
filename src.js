//Variables
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    cronometro
    gravedad = 4;

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
    this.x += 3;
  }

  moveRight() {
    if (this.x < 950) this.x += 20;
  }

  moveLeft() {
    if (this.x > 0) this.x -= 10;
  }

  moveJump() {
    if (this.y < 500 && this.y > 30) this.y -= 100;
  }

  moveDown() {
    if (this.y > 0 && this.y + this.h <= 500) this.y += 30;
  }
}

class Ataque1 {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(){
    context.fillStyle = "rgb(30,144,255)";
    context.fillRect (this.x,this.y,this.w,this.h);
  }
}

var board = new Board();
var ninja = new Ninja(10, 450, 50, 50);
var ataque1 = new Ataque1(500,450,50,50);


function update() {
  // crea
  context.clearRect(0, 0, canvas.width, canvas.height);
  //da gravedad al ninja y cae adelante en cada brinco
  if(ninja.y < (canvas.height - 50)) ninja.gravity();
  //crea ninja
  ninja.draw();
  ataque1.draw();
}

setInterval(() => {
  update();
}, 1000 / 60);

window.addEventListener("keydown", e => {

  if (e.keyCode === 39) ninja.moveRight();
  
  if (e.keyCode === 37) ninja.moveLeft();
  
  if (e.keyCode === 38) ninja.moveJump();

  if (e.keyCode === 40) ninja.moveDown();
  
});

var seg = 75;
let timer = document.getElementById("timer");
let auxTimer = "";

function countdown() {

    cronometro = setInterval(() => {

    if (seg <= 9) auxTimer = "0" + seg;
    else if (seg >= 10 && seg <= 75) auxTimer = seg;
    timer.innerHTML = auxTimer;
    seg--;

    if (auxTimer == 0) clearInterval(cronometro)
    
  }, 200);
}
countdown();


