const tocarMusica = () =>{
  let music = document.getElementById("music");
  music.play()

var time = 0;
function countdownCredits(){
var cronometro = setInterval(()=>{

  if (time >= 0) time++;
  
  if(time === 80) {
    clearInterval(cronometro);
    document.location.assign('index.html');
}
 },1000);
}
countdownCredits();



}
