
var canvas1 = document.getElementById('canvas1'),context1 = canvas1.getContext('2d');

canvas1.width = window.innerWidth;
canvas1.height = 500;

class Board{
  constructor(){
    this.x1 = 0;
    this.y1 = 0;
    this.w1= canvas1.width;
    this.h1 = canvas1.height;
  }

  draw1(){
   canvas1.fillRect(0,0,canva1.width,canvas1.height);
  }

}