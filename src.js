//Variables
var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  cronometro;
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
  }
  draw() {
    context.fillStyle = "rgb(200,0,200)";
    context.fillRect(this.x, this.y, this.w, this.h);
  }

  gravity() {
    this.y += gravedad;
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

class Attack1 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    context.fillStyle = "rgb(30,144,255)";
    context.fillRect(this.x, this.y, this.w, this.h);
  }
  moveAttack() {
    if (this.x < 950) this.x -= 400;
  }
}

class Attack2 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw() {
    context.fillStyle = "rgb(255,69,0)";
    context.fillRect(this.x, this.y, this.w, this.h);
  }
  moveDown() {
    if (this.y > 0) this.y += 450;
  }
}

var board = new Board(),
    ninja = new Ninja(10, 450, 50, 50),
    attack1 = new Attack1(400, 450, 50, 50),
    attack2 = new Attack2(800, 50, 50, 50);

function update() {
  // crea
  context.clearRect(0, 0, canvas.width, canvas.height);
  //da gravedad al ninja y cae adelante en cada brinco
  if (ninja.y < canvas.height - 50) ninja.gravity();
  //crea ninja
  ninja.draw();
  //ataque1
  attack1.draw();
  //ataque2
  attack2.draw();
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

//botones de ataques
//boton1
let countAttack1 = document.getElementById("buttonAttack1"),
    buttonAttack1 = document.getElementById("button1"),
    conteo1 = 5;

function menosUno(){
  if ( conteo1 > 0) conteo1--;
    countAttack1.innerHTML = conteo1;
}
window.addEventListener("click", e =>{
   attack1.moveAttack();
   menosUno();
});

//boton2
let countAttack2 = document.getElementById("buttonAttack2"),
    buttonAttack2 = document.getElementById("button2"),
    conteo2 = 3;

function menosUno2(){
  if ( conteo2 > 0) conteo2--;
     countAttack2.innerHTML = conteo2;
}
window.addEventListener("click", e =>{
   attack2.moveDown();
   menosUno2();
});
//boton3

//boton4

//countdowns
var seg1 = 75,
  seg2 = 75;
let timer1 = document.getElementById("timer1"),
  timer2 = document.getElementById("timer2");
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
