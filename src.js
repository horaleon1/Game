//Variables
var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  cronometro,
  gravedad = 4,
  frames = 0,
  currentFrame = 0,
  arrayattack1 = [], arrayattack2 = [],
  arrayCoins =[];
  
canvas.width = window.innerWidth;
canvas.height = 500;

//Clases
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
    //canvas.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(this.img,this.x--,this.y,this.w,this.h);
    if(this.x <= -7750){
      this.x=0;
    }
  }
}

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
  }
  draw() {
    context.drawImage(this.img,this.mx,this.my,this.mw,this.mh, this.x, this.y, this.w, this.h);
  }

  gravity() {
    this.y += gravedad;
    this.x += 1;
  }

  moveRight() {
    if (this.x < window.innerWidth && this.x < 1350) this.x += 20;
        
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

  crashWith(ninja) {
    return (this.x + this.w -13 > ninja.x) &&
           (this.x < 13 + ninja.x + ninja.w) &&
           (this.y + this.w > ninja.y) &&
           (this.y < ninja.y + ninja.w)

   }
}



///ATAQUE 1

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
    this.x -= 2;
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
  }
   crashWith(ninja) {
    return (this.x + this.w - 13> ninja.x) &&
           (this.x < 13 - ninja.x + ninja.w) &&
           (this.y + this.w > ninja.y) &&
           (this.y < ninja.y + ninja.w)
   }
}

function generateAttack1(){
   arrayattack1.push(new Attack1(1200,350,90,50));
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
    }
    if (ninja.life >= 0)  vidasId.innerHTML = ninja.life;
  })
}



////ATAQUE 2

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
     if ( this.y < 350) this.y += 2;
     if (this.y === 350) this.x += 2;
    }

  crashWith(ninja) {
      return (this.x + this.w  > ninja.x) &&
             (this.x < ninja.x + ninja.w) &&
             (this.y + this.w > ninja.y) &&
             (this.y < ninja.y + ninja.w)
     }
}

function generateAttack2(){
  arrayattack2.push(new Attack2(10,10,90,50));
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

///ATAQUE 3

class Attack3 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

/// coin
class Coin {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/Coin_0000003.png"
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
  crashWith(coin) {
      return (this.x + this.w > coin.x) &&
             (this.x < coin.x + coin.w) &&
             (this.y + this.w > coin.y) &&
             (this.y < coin.y + coin.w)
     }
}
//1check random numbers and 2how to create more coins
let randomX = Math.floor(Math.random() * 1100)+ 300,
    randomY = Math.floor(Math.random() * 220);+ 100
    console.log(randomX,randomY);

function generateCoins(){
  arrayCoins.push(new Coin(randomX,randomY,40,40));
}

function drawCoins(){
  arrayCoins.forEach((array,i) => {
    array.draw();
  });
}
var puntosCoin = document.getElementById("puntosCoin");

// 3 Checkcollision
function checkCollisionCoins(){
  arrayCoins.forEach((array,i) => {
    if (ninja.crashWith(array)){
      arrayCoins.splice(i,1);
      ninja.coins++;
    }
    if (ninja.life >= 0)  puntosCoin.innerHTML = ninja.coins;
  })
}


// 4delay Image
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

function generateStar (){
  var star1 = new Star(ninja.x,ninja.y,100,100);
  star1.draw();
}



//OBJETOS
/////////////////////////////////////////////
var board = new Board(),
    ninja = new Ninja(200, 350, 100, 600/10, 0, 0, 600, 5000/10),
    //coin = new Coin (100,100,40,40);
    cloud1 = new Cloud(20,20,300,200);
//////////////////////////////////////////////


////////MOTOR/////////////
function update() {
  // crea
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  // crea nubes
  cloud1.draw();
  //da gravedad al ninja y cae adelante en cada brinco
  if (ninja.y < canvas.height - 160) ninja.gravity();
  //crea ninja
  ninja.draw();
  // Dibuja el attaque 1;
  drawAttack1()
  drawAttack2();
  //ataque1
  //attack1.draw();
  //ataque2
  // attack2.draw();
  // if (frames % 7 == 0){
  //   currentFrame == ++ currentFrame % 3;
  // }
  // frames++;  
  //colisiones
  checkCollision1();
  checkCollision2();
  //generateStar();
  generateCoins();
  checkCollisionCoins();
}

function start(){
 
inicio = setInterval(update, 1000 / 60);

}



window.addEventListener("keydown", e => {
  if (e.keyCode === 39) ninja.moveRight();

  if (e.keyCode === 37) ninja.moveLeft();

  if (e.keyCode === 38) ninja.moveJump();

  if (e.keyCode === 40) ninja.moveDown();
});

//BOTONES DE ATAQUES
//boton1
let countAttack1 = document.getElementById("buttonAttack1"),
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

//boton2
let countAttack2 = document.getElementById("buttonAttack2"),
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


//boton3
let countAttack3 = document.getElementById("buttonAttack3"),
  buttonAttack3 = document.getElementById("button3"),
  conteo3 = 3;

function menosUno3() {
  if (conteo3 > 0) conteo3--;
  countAttack3.innerHTML = conteo3;
}

buttonAttack3.addEventListener("click", e => {
  menosUno3();
});
//boton4
let countAttack4 = document.getElementById("buttonAttack4"),
  buttonAttack4 = document.getElementById("button4"),
  conteo4 = 10;

function menosUno4() {
  if (conteo4 > 0) conteo4--;
  countAttack4.innerHTML = conteo4;
}
buttonAttack4.addEventListener("click", e => {
  menosUno4();
});

//countdowns
let seg1 = 75,
    seg2 = 75,
   timer1 = document.getElementById("timer1"),
   timer2 = document.getElementById("timer2"),
   auxTimer = "";

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

//var finished = "Game Over"

function gameOver(){
  clearInterval(inicio);
}

start();
