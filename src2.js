// Just WoodVIbes!!!!

//Variables
var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    
  cronometro,
  gravedad = 4,
  frames = 0,
  currentFrame = 0,
  arrayattack1 = [], arrayattack2 = [],
  arrayCoins = [], arrayLifes = [], lives = 3;

  canvas.width = window.innerWidth;
  canvas.height = 500;

//Clases
//Background Principal  Area de Juego Jugador 1
class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = 9190;
    this.h = canvas.height;

    this.img = new Image();
    this.img.src = "./assets/img/fondoCompleto2.png"
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img,this.x--,this.y,this.w,this.h);
    if(this.x <= -7750){
      this.x=0;
    }
  }
}
// Nubes 
class Cloud {
  constructor(x,y,w,h){
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;

   this.img = new Image();
   this.img.src = "./assets/img/cloud.png";
   this.onload = this.draw();
  }
  draw(){
    context.drawImage(this.img,this.x--,this.y,this.w,this.h);
    if(this.x > 0){
      this.x += 2;
    }
  }
}
// Ninja 1 Personaja Principal Jugador 1
class Ninja {
  constructor(x, y, w, h,mx,my,mw,mh) {
    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velX = 0;
    this.velY = 0;

    this.img = new Image();
    this.img.src = "./assets/img/Ninja-Run.png";
    this.img.onload = this.draw();

    this.life = 3;
    this.coins = 0;

    this.isJumping = false;
  }
  draw() {
    context.drawImage(this.img,this.mx,this.my,this.mw,this.mh, this.x, this.y, this.w, this.h);
  }

  gravity() {
    this.y += gravedad;
    //this.x += 2.5;
  }

  moveRight() {
    if (this.x < window.innerWidth && this.x < 1350) this.x += 20;
        
  }

  moveLeft() {
    if (this.x > 0) this.x -= 20;
  }

  moveJump() {
    if(this.y > 320) this.isJumping = true;
  
    
    if (this.y < 500 && this.y > 30 && this.isJumping) {
      this.y -= 200;
      
      this.isJumping = false;
    }
  }

  moveDown() {
    if (this.y > 0 && this.y + this.h <= 500) this.y += 30;
  }

  crashWith(ninja) {
    return (this.x + this.w -13 > ninja.x) &&
           (this.x < 13 + ninja.x + ninja.w) &&
           (this.y + this.w > ninja.y) &&
           (this.y < ninja.y + ninja.w)
   }
}
//Ataque 1 (Cohete) Jugador 2
class Attack1 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/ROCKET0000.png"
    this.img.onload = this.draw();
  }

  draw() {
    this.x -= 3;
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
  }
}
//Funciones Ataque 1 Generacion, Dibujo y Colision Jugador 2

function generateAttack1(){
  arrayattack1.push(new Attack1(1200,370,60,30));
}

function drawAttack1(){
  arrayattack1.forEach(function(array,i){
      array.draw();
  });
}

var vidasId = document.getElementById('vidas');

function checkCollision1(){
 arrayattack1.forEach((array,i) => {
   if (ninja.crashWith(array)){
     arrayattack1.splice(i,1);
     ninja.life--;
     generateStar();
     sound1.play();
   }
   if (ninja.life >= 0)  vidasId.innerHTML = ninja.life;
 })
}
// Ataque 2 Shuriken(Ninja Star) Jugador 2
class Attack2 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/star.png"
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
     if ( this.y < 370) this.y += 2;
     if (this.y === 370) this.x += 2;
    }
}
//Funciones Ataque 2 Generacion, Dibujo y Colision Jugador 2
function generateAttack2(){
  arrayattack2.push(new Attack2(10,10,40,40));
}

function drawAttack2(){
  arrayattack2.forEach(function(array,i){
      array.draw();
  });
}

function checkCollision2(){
  arrayattack2.forEach((array,i) => {
    if (ninja.crashWith(array)){
      arrayattack2.splice(i,1);
      ninja.life--;
      generateStar();
    }
    if (ninja.life >= 0)  vidasId.innerHTML = ninja.life;
  })
}
// Ataque 3 Jugador 2

// Ataque 4 Jugador 2

//Stars show after collision
class Star{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
 
    this.img = new Image();
    this.img.src = "./assets/img/star-2.png"
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
}
// funcion genera estrellas 
function generateStar (){
  var star1 = new Star(ninja.x,ninja.y,100,100);
  star1.draw();
}
//Moneda
class Coin {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/Coin_0000003.png";
    this.img.onload = this.draw();
  }
  draw(){
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
  }
}
//funciones Monedas
function generateCoins(){

  arrayCoins.forEach((array) => array.draw());

  var x = Math.random() * (+500 - +200) + +200,
      y = Math.random() * (+320 - +150) + +150;
  
      if (frames % 250 === 0) arrayCoins.push(new Coin(x,y,40,40));
  
}

var coin = document.getElementById('puntosCoin');
//colision Moneda
 function checkCollisionCoins(){
  arrayCoins.forEach((array,i) => {
     if (ninja.crashWith(array)){
      arrayCoins.splice(i,1);
       ninja.coins++;
    }
     if (ninja.coins >= 0)  coin.innerHTML = ninja.coins;
   })
 }

 class life{
   constructor(x,y,w,h){
     this.x = x;
     this.y = y;
     this.w = w;
     this.h = h;

     this.img = new Image();
     this.img.src = "./assets/img/Gem-1.png";
     this.img.onload = this.draw();
   }
   draw(){
     context.drawImage(this.img,this.x,this.y,this.w,this.h);
   }
 }
 //funciones Monedas
function generateLifes(){

  arrayLifes.forEach((array) => array.draw());

  var x = Math.random() * (+500 - +200) + +200,
      y = Math.random() * (+320 - +150) + +150;

  if (frames % 250 === 0) arrayLifes.push(new life(x,y,40,40));
  
}

var vidas = document.getElementById('vidas');
//colision Moneda
 function checkCollisionLifes(){
  arrayLifes.forEach((array,i) => {
     if (ninja.crashWith(array)){
      arrayLifes.splice(i,1);
       ninja.life++;
    }
     if (ninja.life >= 0)  vidas.innerHTML = ninja.life;
   })
 }

// OBJETOS 
var board = new Board(),
    ninja = new Ninja(200, 350, 100, 600/10, 0, 0, 600, 5000/10),
    cloud1 = new Cloud(20,20,300,200);
//SONIDOS
var sound1 = new Audio ("./assets/Sounds/glob_explosion.wav");


//MOTOR
function update(){
  frames++;
  //Background
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  //ninja1 Personaje Principal
  ninja.draw();
  if (ninja.y < canvas.height - 160) ninja.gravity();
  //nube
  cloud1.draw();
  //ataques
  drawAttack1();
  drawAttack2();
  //colisiones de ataques
  checkCollision1();
  checkCollision2();

  generateCoins();
  checkCollisionCoins();

  generateLifes();
  checkCollisionLifes();
}


// ON-MOTOR
function start(){
  inicio = setInterval(update, 1000 / 60);
}
// Teclas de movimiento
window.addEventListener("keydown", e => {
  if (e.keyCode === 39) ninja.moveRight();

  if (e.keyCode === 37) ninja.moveLeft();

  if (e.keyCode === 38) ninja.moveJump();

  if (e.keyCode === 40) ninja.moveDown();
});
//BOTONES DE ATAQUE

//BOTON 1
var countAttack1 = document.getElementById("buttonAttack1"),
    buttonAttack1 = document.getElementById("button1"),
    conteo1 = 5, conteo1B = 5;

function menosUno() {
  if (conteo1 > 0) conteo1--;
  countAttack1.innerHTML = conteo1;
}
buttonAttack1.addEventListener("click", e => {
  if(conteo1B > 0) { 
  generateAttack1();
  conteo1B--;
  }
  menosUno();
});
//BOTON 2
var countAttack2 = document.getElementById("buttonAttack2"),
    buttonAttack2 = document.getElementById("button2"),
    conteo2 = 3, conteo2B = 3;

function menosUno2() {
  if (conteo2 > 0) conteo2--;
  countAttack2.innerHTML = conteo2;
}
buttonAttack2.addEventListener("click", e => {
  if(conteo2B > 0) {
  generateAttack2();
  menosUno2();
  conteo2B--;
  }
});
//BOTON 3
var countAttack3 = document.getElementById("buttonAttack3"),
  buttonAttack3 = document.getElementById("button3"),
  conteo3 = 3;

function menosUno3() {
  if (conteo3 > 0) conteo3--;
  countAttack3.innerHTML = conteo3;
}

buttonAttack3.addEventListener("click", e => {
  menosUno3();
});
//BOTON 4
var countAttack4 = document.getElementById("buttonAttack4"),
  buttonAttack4 = document.getElementById("button4"),
  conteo4 = 10;

function menosUno4() {
  if (conteo4 > 0) conteo4--;
  countAttack4.innerHTML = conteo4;
}
buttonAttack4.addEventListener("click", e => {
  menosUno4();
});

//Cuentas Regresivas
var seg1 = 75,
    seg2 = 75,
    timer1 = document.getElementById("timer1"),
    timer2 = document.getElementById("timer2"),
    auxTimer = "";
//Cuenta regresiva 1
function countdown1() {
  cronometro1 = setInterval(() => {
    if (seg1 <= 9) auxTimer = "0" + seg1;
    else if (seg1 >= 10 && seg1 <= 75) auxTimer = seg1;
    timer1.innerHTML = auxTimer;
    seg1--;

    if (auxTimer == 0) clearInterval(cronometro1);
  }, 1000);
}
countdown1();
//Cuenta regresiva 2
function countdown2() {
  cronometro2 = setInterval(() => {
    if (seg2 <= 9) auxTimer = "0" + seg2;
    else if (seg2 >= 10 && seg2 <= 75) auxTimer = seg2;
    timer2.innerHTML = auxTimer;
    seg2--;

    if (auxTimer == 0) clearInterval(cronometro2);
  }, 1000);
}
countdown2();

start();
