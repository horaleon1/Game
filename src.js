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

console.log(board.draw)

class Ninja{
  constructor(){
   this.x = 50;
   this.y = 50;
   this.w = 50;
   this.h = 40;
   this.velX = 0;
   this.velY = 0;
   this.jumping = true;
   
  }
  draw(){
    context.fillStyle = "rgb(200,0,200)";
    context.fillRect(this.x,this.y,this.w,this.h);
  }
  jump
}

var ninja = new Ninja();

function update() {
  ninja.draw();
}

update()



//listeners
// window.addEventListener('keydown', element =>{

//   if (element.keyCode == 32) 

// });