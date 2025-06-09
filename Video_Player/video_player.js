document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('customVideo');
  
  // Example of hooking into events if needed
  video.addEventListener('play', () => {
    console.log('Video is playing...');
  });

  video.addEventListener('pause', () => {
    console.log('Video is paused.');
  });

  // If you want custom controls, remove 'controls' from the <video> tag in HTML
  // and then create your own button elements + event listeners here:
  /*
  const playButton = document.getElementById('my-play-btn');
  playButton.addEventListener('click', () => {
    if(video.paused) video.play();
    else video.pause();
  });
  */

  // Fullscreen event could also be triggered from a custom button:
  /*
  const fullscreenBtn = document.getElementById('my-fullscreen-btn');
  fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  });
  */
});
