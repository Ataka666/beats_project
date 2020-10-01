let player;

const playerContainer = $(".player");
const playButton=$(".player__start");
const playerPlay=$('.player__play--play');
const playerStop=$('.player__play--stop')
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "CRT39ITMANs",
   playerVars: {
   controls: 0,
   modestbranding: 0,
   showinfo: 0,
   rel: 0,
   iv_load_policy: 3
    },

   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   }
 });
};
const onPlayerStateChange = e =>{
 if (player.getPlayerState()==1){
  playerStop.addClass("active").siblings().removeClass("active")
 }
 else if (player.getPlayerState()==2){
  playerPlay.addClass("active").siblings().removeClass("active");
 }
}
playButton.click(e=>{
   if (playerPlay.hasClass("active")){
       player.playVideo()
   }
   else {
    player.pauseVideo();
   }
});
const funTime = time =>{
    const roundTime = Math.round(time);
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    $(".player__duration-estimate").text(funTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
      }
      
    interval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        const completedPercent = (currentTime / durationSec) * 100;
        $(".player__playback-button").css({
            left: `${completedPercent}%`
          });
        $(".player__duration-completed").text(funTime(currentTime));
      }, 1000);
     };

       $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec =
          (player.getDuration() / 100) * newButtonPositionPercent;
        
        $(".player__playback-button").css({
          left: `${newButtonPositionPercent}%`
        });
        
        player.seekTo(newPlaybackPositionSec);
       });

