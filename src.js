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
    if (this.x > 0) this.x -= 20;
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
var ataque1 = new Ataque1(400,450,50,50);


function update() {
  // crea
  context.clearRect(0, 0, canvas.width, canvas.height);
  //da gravedad al ninja y cae adelante en cada brinco
  if(ninja.y < (canvas.height - 50)) ninja.gravity();
  //crea ninja
  ninja.draw();
  //ataque1.draw();   empezar ataque when click
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

let bottonAttack1 = document.getElementById("buttonAttack1");
document.onclick = buttonAttackFunction1;
function buttonAttackFunction1 (element){
  console.log("ataque1");
  ataque1.draw();
}


var seg1 = 75, seg2 = 75;
let timer1 = document.getElementById("timer1"), timer2 = document.getElementById("timer2");
let auxTimer = "";

function countdown1() {

    cronometro1 = setInterval(() => {

    if (seg1 <= 9) auxTimer = "0" + seg1;
    else if (seg1 >= 10 && seg1 <= 75) auxTimer = seg1;
    timer1.innerHTML = auxTimer;
    seg1--;

    if (auxTimer == 0) clearInterval(cronometro1);
    
  }, 200);
}
countdown1();

function countdown2() {

  cronometro2 = setInterval(() => {

  if (seg2 <= 9) auxTimer = "0" + seg2;
  else if (seg2 >= 10 && seg2 <= 75) auxTimer = seg2;
  timer2.innerHTML = auxTimer;
  seg2--;

  if (auxTimer == 0) clearInterval(cronometro2);
  
}, 200);
}
countdown2();

