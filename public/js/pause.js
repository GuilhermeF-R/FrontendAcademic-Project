document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector('.welcome-video');
    const pauseBtn = document.getElementById('pauseBtn');
    let isManuallyPaused = false;

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

    // Simula o loop, mas só se não estiver pausado manualmente
    video.addEventListener('ended', () => {
      if (!isManuallyPaused) {
        video.currentTime = 0;
        video.play();
      }
    });
  });