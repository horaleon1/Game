//Variables
var canvas = document.getElementById('canvas'), context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 500;
//Clases
class Board{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.w= canvas.width;
    this.h = canvas.height;
  }

  draw(){
   canvas.fillRect(0,0,canva.width,canvas.height);
  }
  
}

var board = new Board();


class Ninja{
  constructor(x,y,w,h){

   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.velX = 0;
   this.velY = 0;
   this.jumping = true;
   
  }
  draw(){
    context.fillStyle = "rgb(200,0,200)";
    context.fillRect(50,440,50,50);
  }
  // moveRight(){
  //     this.x = this.x + 50;
  //   }
  }


var ninja = new Ninja();

class Ataque1{
  constructor(){
    this.x = x;
  }
}

function update() {
  ninja.draw();
}

update()

// function controles(){
//   var left = false, right = false, up = false;


// }

// //time countdown
// var time = 60;
// var countdown1 = getElementById('countdown1');
// fucntion countdown1(){
   
// }

//listeners
addEventListener.


window.onkeydown = function (event){
  var key = event.keyCode;
  if ( key === 39){
   ninja.x = ninja.x + 50;
  }
}