// Just WoodVIbes!!!!
const tocarMusica = () =>{
  let music = document.getElementById("music");
  music.play()
}
//Variables
var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d"),
  cronometro,
  gravedad = 3.7,
  frames = 0,
  currentFrame = 0,
  arrayattack1 = [],
  arrayattack2 = [],
  arrayattack3 = [],
  arrayattack4 = [],
  arrayCoins1 = [],
  arrayCoins2 = [],
  arrayCoins3 = [],
  arrayLifes1 = [],
  arrayLifes2 = [],
  arrayNinjaAttack = [],
  currentFrame = 0,
  disableButtons = false;

//canvas.width = window.innerWidth;
canvas.width = 1435;
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
    this.img.src = "./assets/img/fondoCompleto2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x--, this.y, this.w, this.h);
    if (this.x <= -7750) {
      this.x = 0;
    }
  }
}
// Nubes
class Cloud {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/cloud.png";
    this.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x--, this.y, this.w, this.h);
    if (this.x > 0) {
      this.x += 1.5;
    }
  }
}
//nube 2
class Cloud2 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/cloud.png";
    this.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x--, this.y, this.w, this.h);
    if (this.x > 0) {
      this.x -= 0.5;
    }
  }
}
// Ninja 1 Personaja Principal Jugador 1
class Ninja {
  constructor(x, y, w, h, mx, my, mw, mh) {
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
    this.img.src = "./assets/img/runSB.png";

    this.img.onload = this.draw();

    this.life = 3;
    this.coins = 0;

    this.isJumping = false;
  }
  draw() {
    context.drawImage(
      this.img,
      currentFrame * (500 / 10),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }

  gravity() {
    this.y += gravedad;
    this.x +=0.8;
  }

  moveRight() {
    if (this.x < window.innerWidth && this.x < 1350) this.x += 20;
    this.img.src = "./assets/img/runSB.png";
  }

  moveLeft() {
    if (this.x > -1) {
      this.x -= 20;
      this.img.src = "./assets/img/runLeftSA.png";
    }
  }

  moveJump() {
    if (this.y > 320) this.isJumping = true;

    if (this.y < 500 && this.y > 30 && this.isJumping) {
      this.y -= 200;
      soundJump.play();
      this.isJumping = false;
      this.img.src = "./assets/img/runSB.png";
    }
  }

  crashWith(ninja) {
    return (
      this.x + this.w - 13 > ninja.x &&
      this.x < 13 + ninja.x + ninja.w &&
      this.y + this.w > ninja.y &&
      this.y < ninja.y + ninja.w
    );
  }
}
//ataque deljugador1 al jugador 2 (congela los ataques por 5 segundos)
class AttackNinja {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/Gem-2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
//funciones Generate Attack Ninja
function generateAttackNinja() {
  arrayNinjaAttack.forEach(array => array.draw());

  var x = Math.random() * (+800 - +500) + +500,
    y = Math.random() * (+200 - +150) + +150;

  if (frames % 900 === 0) {
    if (arrayNinjaAttack.length === 0)
      arrayNinjaAttack.push(new AttackNinja(x, y, 45, 45));
  }
}

//colision Attack Ninja
function checkCollisionAttackNinja() {
  arrayNinjaAttack.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayNinjaAttack.splice(i, 1);
      blockPlayer2();
      soundGreenGem.play();
    }
  });
}
var countBlock = 6,
  countCongelado = "";
var counthtml = document.getElementById("conteoCongelado");

function blockPlayer2() {
  disableButtons = true;
  var cronometro = setInterval(() => {
    if (countBlock <= 6) {
      countBlock--;
      countCongelado = countBlock;
      counthtml.innerHTML = countCongelado;
    }
    if (countBlock <= 0) {
      clearInterval(cronometro);
      disableButtons = false;
      if (clearInterval) {
        countBlock = 6;
        countCongelado = 0;
        counthtml.innerHTML = countCongelado;
      }
    }
  }, 1000);
}

//Ataque 1 (Cohete) Jugador 2
class Attack1 {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/coheteS.png";
    this.img.onload = this.draw();
  }

  draw() {
    this.x -= 7;
    context.drawImage(
      this.img,
      currentFrame * (180 / 3),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
//Funciones Ataque 1 Generacion, Dibujo y Colision Jugador 2

function generateAttack1() {
  arrayattack1.push(new Attack1(1400, 370, 180 / 3, 30, 0, 0, 180 / 3, 30));
}

function drawAttack1() {
  arrayattack1.forEach(array => array.draw());
}

var vidasId = document.getElementById("vidas");

function checkCollision1() {
  arrayattack1.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayattack1.splice(i, 1);
      ninja.life--;
      //generateStar();
      sound1.play();
    }
    if (ninja.life >= 0) vidasId.innerHTML = ninja.life;
  });
}
// Ataque 2 Shuriken(Ninja Star) Jugador 2
class Attack2 {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/shurikenS.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(
      this.img,
      currentFrame * (300 / 6),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
    if (this.y < 370) this.y += 1;
    if (this.y === 370) this.x += 8;
  }
}
//Funciones Ataque 2 Generacion, Dibujo y Colision Jugador 2
function generateAttack2() {
  arrayattack2.push(new Attack2(10, 10, 300 / 6, 40, 0, 0, 300 / 6, 40));
}

function drawAttack2() {
  arrayattack2.forEach(array => array.draw());
}

function checkCollision2() {
  arrayattack2.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayattack2.splice(i, 1);
      ninja.life--;
      soundMetal.play();
    }
    if (ninja.life >= 0) vidasId.innerHTML = ninja.life;
  });
}
// Ataque 3 Jugador 2

class Attack3 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/fire.png";
    this.img.onload = this.draw();

    this.random = Math.floor(Math.random() * (+1100 - +200) + +100);
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);

    if (this.y === 455) this.x += 5;
    if (this.x > 1400) this.y -= 5;
  }

  moving() {
    if (this.x > this.random) this.y -= 10;
  }
}

//Funciones Ataque 3 Generacion, Dibujo y Colision Jugador 2
function generateAttack3() {
  arrayattack3.push(new Attack3(1, 455, 80, 70));
}

function drawAttack3() {
  arrayattack3.forEach(array => array.draw());
}

function checkCollision3() {
  arrayattack3.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayattack3.splice(i, 1);
      ninja.life--;
      soundFire.play();
    }
    if (ninja.life >= 0) vidasId.innerHTML = ninja.life;
  });
}

function attack3Attacking() {
  arrayattack3.forEach(array => array.moving());
}
// Ataque 4 Jugador 2

//Stars show after collision
//change image
class Star {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/star-2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(
      this.img,
      this.mx,
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}
// funcion genera estrellas
function generateStar() {
  var star1 = new Star(ninja.x, ninja.y, 120, 120, 0, 0, 120, 120);
  star1.draw();
}
//Moneda 1 (Monedas aleatorias lado izquierdo de la pantalla)
class Coin1 {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/coinS2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(
      this.img,
      currentFrame * (160 / 4),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  clickable(evento) {
    return (
      this.x < evento.layerX &&
      this.x + this.w > evento.layerX &&
      this.y < evento.layerY &&
      this.y + this.w > evento.layerY
    );
  }
}

//funciones Monedas
function generateCoins1() {
  arrayCoins1.forEach(array => array.draw());

  var x = Math.random() * (+250 - +0) + +0,
    y = Math.random() * (+300 - +150) + +150;

  if (frames % 150 === 0) {
    if (arrayCoins1.length < 3)
      arrayCoins1.push(new Coin1(x, y, 160 / 4, 40, 0, 0, 160 / 4, 40));
  }
}

var coin = document.getElementById("puntosCoin");

function checkCollisionCoins1() {
  arrayCoins1.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayCoins1.splice(i, 1);
      ninja.coins++;
      soundCoin1Player.play();
    }
    if (ninja.coins >= 0) coin.innerHTML = ninja.coins;
  });
}

var player2Coins = document.getElementById("puntosCoin2");
var coinsPlayer2 = 0;

function checkClick1(evento, i) {
  arrayCoins1.forEach((array, i) => {
    if (array.clickable(evento)) {
      arrayCoins1.splice(i, 1);
      coinsPlayer2++;
      soundCoin2Player.play();
    }
    if (coinsPlayer2 >= 0) player2Coins.innerHTML = coinsPlayer2;
  });
}

//Moneda 2
class Coin2 {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/coinS2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(
      this.img,
      currentFrame * (160 / 4),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  clickable(evento) {
    return (
      this.x < evento.layerX &&
      this.x + this.w > evento.layerX &&
      this.y < evento.layerY &&
      this.y + this.w > evento.layerY
    );
  }
}
//funciones Monedas 2
function generateCoins2() {
  arrayCoins2.forEach(array => array.draw());

  var x = Math.random() * (+900 - +500) + +500,
    y = Math.random() * (+300 - +150) + +150;

  if (frames % 300 === 0) {
    if (arrayCoins2.length < 5)
      arrayCoins2.push(new Coin2(x, y, 160 / 4, 40, 0, 0, 160 / 4, 40));
  }
}

var coin = document.getElementById("puntosCoin");
//colision Moneda 2
function checkCollisionCoins2() {
  arrayCoins2.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayCoins2.splice(i, 1);
      ninja.coins++;
      soundCoin1Player.play();
    }
    if (ninja.coins >= 0) coin.innerHTML = ninja.coins;
  });
}

function checkClick2(evento, i) {
  arrayCoins2.forEach((array, i) => {
    if (array.clickable(evento)) {
      arrayCoins2.splice(i, 1);
      coinsPlayer2++;
      soundCoin2Player.play();
    }
    if (coinsPlayer2 >= 0) player2Coins.innerHTML = coinsPlayer2;
  });
}

//Moneda 3
class Coin3 {
  constructor(x, y, w, h, mx, my, mw, mh) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.mx = mx;
    this.my = my;
    this.mw = mw;
    this.mh = mh;

    this.img = new Image();
    this.img.src = "./assets/img/coinS2.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(
      this.img,
      currentFrame * (160 / 4),
      this.my,
      this.mw,
      this.mh,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
  clickable(evento) {
    return (
      this.x < evento.layerX &&
      this.x + this.w > evento.layerX &&
      this.y < evento.layerY &&
      this.y + this.w > evento.layerY
    );
  }
}
//funciones Monedas 3
function generateCoins3() {
  arrayCoins3.forEach(array => array.draw());

  var x = Math.random() * (+1399 - +1170) + +1170,
    y = Math.random() * (+300 - +150) + +150;

  if (frames % 150 === 0) {
    if (arrayCoins3.length < 3)
      arrayCoins3.push(new Coin3(x, y, 160 / 4, 40, 0, 0, 160 / 4, 40));
  }
}

var coin = document.getElementById("puntosCoin");
//colision Moneda 3
function checkCollisionCoins3() {
  arrayCoins3.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayCoins3.splice(i, 1);
      ninja.coins++;
      soundCoin1Player.play();
    }
    if (ninja.coins >= 0) coin.innerHTML = ninja.coins;
  });
}

function checkClick3(evento, i) {
  arrayCoins3.forEach((array, i) => {
    if (array.clickable(evento)) {
      arrayCoins3.splice(i, 1);
      coinsPlayer2++;
      soundCoin2Player.play();
    }
    if (coinsPlayer2 >= 0) player2Coins.innerHTML = coinsPlayer2;
  });
}
//Vidas 1
class Life1 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/Gem-1.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
//funciones Vidas
function generateLifes1() {
  arrayLifes1.forEach(array => array.draw());

  var x = Math.random() * (+490 - +260) + +260,
    y = Math.random() * (+300 - +150) + +150;

  if (frames % 300 === 0) {
    if (arrayLifes1.length < 1) arrayLifes1.push(new Life1(x, y, 40, 40));
  }
}

var vidas = document.getElementById("vidas");
//colision Vidas
function checkCollisionLifes1() {
  arrayLifes1.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayLifes1.splice(i, 1);
      ninja.life++;
      soundLife.play();
    }
    if (ninja.life >= 0) vidas.innerHTML = ninja.life;
  });
}
//Vida 2
class Life2 {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.img = new Image();
    this.img.src = "./assets/img/Gem-1.png";
    this.img.onload = this.draw();
  }
  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
//funciones Vidas
function generateLifes2() {
  arrayLifes2.forEach(array => array.draw());

  var x = Math.random() * (+1160 - +910) + +910,
    y = Math.random() * (+300 - +150) + +150;

  if (frames % 300 === 0) {
    if (arrayLifes2.length < 1) arrayLifes2.push(new Life2(x, y, 40, 40));
  }
}

var vidas = document.getElementById("vidas");
//colision Vidas
function checkCollisionLifes2() {
  arrayLifes2.forEach((array, i) => {
    if (ninja.crashWith(array)) {
      arrayLifes2.splice(i, 1);
      ninja.life++;
      soundLife.play();
    }
    if (ninja.life >= 0) vidas.innerHTML = ninja.life;
  });
}

// OBJETOS
var board = new Board(),
  ninja = new Ninja(200, 305, 500 / 10, 80, 0, 0, 500 / 10, 80),
  cloud1 = new Cloud(20, 20, 300, 200),
  cloud2 = new Cloud2(1400, 20, 250, 200),
//SONIDOS
  sound1 = new Audio("./assets/Sounds/explosion.wav"), 
  soundJump = new Audio("./assets/Sounds/bubble.WAV"),
  soundMetal = new Audio("./assets/Sounds/metal.wav"),
  soundCoin2Player = new Audio("./assets/Sounds/coin2player.wav"),
  soundFire = new Audio("./assets/Sounds/fire.WAV"),
  soundLife = new Audio("./assets/Sounds/vida.wav"),
  soundCoin1Player = new Audio("./assets/Sounds/coinPlayer1B.wav"),
  soundAttacks = new Audio("./assets/Sounds/ataques.wav"),
  soundNoButton = new Audio("./assets/Sounds/noButton.wav"),
  soundGreenGem = new Audio("./assets/Sounds/greenGem.wav"),
  soundLostLife = new Audio("./assets/Sounds/lostLife.wav");

//MOTOR
function update() {
  //Background
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  //ninja1 Personaje Principal
  ninja.draw();
  if (ninja.y < canvas.height - 180) ninja.gravity();
  //nubes
  cloud1.draw();
  if (cloud1.x > 1400) cloud2.draw();
  //coin1,2,3 sprite
  if (frames % 10 === 0) {
    currentFrame = ++currentFrame % 4;
  }
  frames++;
  //ataques
  drawAttack1();
  drawAttack2();
  drawAttack3();
  //Checa colisiones de ataques
  checkCollision1();
  checkCollision2();
  checkCollision3();
  //generador de monedas
  generateCoins1();
  generateCoins2();
  generateCoins3();
  //Checa colisiones de monedas
  checkCollisionCoins1();
  checkCollisionCoins2();
  checkCollisionCoins3();
  // Genera gemas rojas que equivalen a una vida del ninja
  generateLifes1();
  generateLifes2();
  // checa la colision de las gemas rojas o vidas
  checkCollisionLifes1();
  checkCollisionLifes2();
  //attack3B
  attack3Attacking();
  gameOver();
  //Ninja 1 ataque (Jugador 1)
  generateAttackNinja();
  checkCollisionAttackNinja();
}
//ON-MOTOR
function start() {
  inicio = setInterval(update, 1000 / 60);
  countdown1();
  countdown2();
}

// Teclas de movimiento
window.addEventListener("keydown", e => {
  if (e.keyCode === 77) ninja.moveRight();

  if (e.keyCode === 67) ninja.moveLeft();

  if (e.keyCode === 32) ninja.moveJump();
});
//BOTONES DE ATAQUE

//BOTON 1
var countAttack1 = document.getElementById("buttonAttack1"),
  buttonAttack1 = document.getElementById("button1"),
  conteo1 = 5,
  conteo1B = 5;

function menosUno() {
  if (conteo1 > 0 && disableButtons === false) conteo1--;
  countAttack1.innerHTML = conteo1;
}
buttonAttack1.addEventListener("click", e => {
  if (conteo1B > 0 && disableButtons === false) {
    generateAttack1();
    menosUno();
    conteo1B--;
    soundAttacks.play();
  }
  if (disableButtons) soundNoButton.play();
});
//BOTON 2
var countAttack2 = document.getElementById("buttonAttack2"),
  buttonAttack2 = document.getElementById("button2"),
  conteo2 = 2,
  conteo2B = 2;

function menosUno2() {
  if (conteo2 > 0 && disableButtons === false) conteo2--;
  countAttack2.innerHTML = conteo2;
}
buttonAttack2.addEventListener("click", e => {
  if (conteo2B > 0 && disableButtons === false) {
    generateAttack2();
    menosUno2();
    conteo2B--;
    soundAttacks.play();
  }
  if (disableButtons) soundNoButton.play();
});
//BOTON 3
var countAttack3 = document.getElementById("buttonAttack3"),
  buttonAttack3 = document.getElementById("button3"),
  conteo3 = 3,
  conteo3B = 3;

function menosUno3() {
  if (conteo3 > 0 && disableButtons === false) conteo3--;
  countAttack3.innerHTML = conteo3;
}

buttonAttack3.addEventListener("click", e => {
  if (conteo3B > 0 && disableButtons === false) {
    generateAttack3();
    menosUno3();
    conteo3B--;
    soundAttacks.play();
  }
  if (disableButtons) soundNoButton.play();
});

canvas.addEventListener("click", e => {
  checkClick1(e);
  checkClick2(e);
  checkClick3(e);
});

//Cuentas Regresivas
var seg1 = 75,
  seg2 = 75,
  timer1 = document.getElementById("timer1"),
  timer2 = document.getElementById("timer2"),
  auxTimer = "";
//Cuenta regresiva 1 Jugador 1
function countdown1() {
  cronometro1 = setInterval(() => {
    if (seg1 <= 9) auxTimer = "0" + seg1;
    else if (seg1 >= 10 && seg1 <= 75) auxTimer = seg1;
    timer1.innerHTML = auxTimer;
    seg1--;

    if (auxTimer == 0 || ninja.life === 0) clearInterval(cronometro1);
  }, 1000);
}
//countdown1();
//Cuenta regresiva 2 Jugador 2
function countdown2() {
  cronometro2 = setInterval(() => {
    if (seg2 <= 9) auxTimer = "0" + seg2;
    else if (seg2 >= 10 && seg2 <= 75) auxTimer = seg2;
    timer2.innerHTML = auxTimer;
    seg2--;

    if (auxTimer == 0 || ninja.life === 0) clearInterval(cronometro2);
  }, 1000);
}

function gameOver() {
  if (ninja.life === 0) {
    player2Wins();
  } else if (seg1 === 0) {
    if (ninja.coins > coinsPlayer2) player1Wins();
    else if (ninja.coins === coinsPlayer2) draw();
    else player2Wins();
  }
}

function player1Wins() {
  document.location.assign("player1wins.html");
}
function player2Wins() {
  document.location.assign("player2wins.html");
}
function draw() {
  document.location.assign("draw.html");
}

start();

//Jquery
$(document).ready(function() {
  $(".lifesImg")
    .hide(500)
    .show(800);
  $("#moneda1")
    .hide(500)
    .show(800);
  $("#cronometroImg1")
    .hide(500)
    .show(800);

  $("#moneda2")
    .hide(500)
    .show(800);
  $("#cronometroImg2")
    .hide(500)
    .show(800);
});

(function() {
  $("#moneda1")
    .hide(500)
    .show(800);
});
