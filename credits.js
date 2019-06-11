var time = 0;
function countdownCredits(){
var cronometro = setInterval(()=>{

  if (time >= 0) time++;
  
  if(time === 80) {
    clearInterval(cronometro);
    document.location.assign('pantalla1.html');
}
 },1000);
}
countdownCredits();