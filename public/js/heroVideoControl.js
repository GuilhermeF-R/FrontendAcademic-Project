const hero = document.querySelector('.video-hero');
const video = document.querySelector('.welcome-video');
const pauseBtn = document.getElementById('pauseBtn');

let isManuallyPaused = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    hero.classList.add('shrink');
  } else {
    hero.classList.remove('shrink');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  pauseBtn.addEventListener('click', () => {
    if (video.paused) {
      isManuallyPaused = false;
      video.play();
      pauseBtn.textContent = '❚❚';
    } else {
      isManuallyPaused = true;
      video.pause();
      pauseBtn.textContent = '▶';
    }
  });

  video.addEventListener('ended', () => {
    if (!isManuallyPaused) {
      video.currentTime = 0;
      video.play();
    }
  });
});
