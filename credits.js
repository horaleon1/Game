var time = 0;
function countdownCredits(){
var cronometro = setInterval(()=>{
  if (time >= 0){
    time++;
    console.log(time);
  }
  if(time === 60) {
    clearInterval(cronometro);
    document.location.assign('pantalla1.html');
}
 },1000);
}
countdownCredits();