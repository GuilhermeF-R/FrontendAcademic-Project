gsap.registerPlugin(ScrollTrigger);

let introFinalizada = false; // Flag para evitar conflitos

function encerrarIntro() {
  if (introFinalizada) return; // Já foi encerrada, evita duplicação
  introFinalizada = true;

  gsap.to('#starwars-intro', {
    autoAlpha: 0,
    duration: 1.6,
    onComplete: () => {
      animatePageElements();
    }
  });
}

// Após 12s, some com a intro se o usuário não tiver pulado
setTimeout(encerrarIntro, 12000);

window.addEventListener('load', () => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const audio = document.getElementById('intro-audio');
  const skipBtn = document.getElementById('skip-intro');
  const crawl = document.querySelector('.crawl');

  // --- Funções de estrelas ---
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  let stars = [];
  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        delta: (Math.random() * 0.02) - 0.01
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(animateStars);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createStars(150);
  });

  resizeCanvas();
  createStars(150);
  animateStars();

  // Mostra botão pular
  skipBtn.style.display = 'block';

  // Configura áudio
  audio.muted = false;
  audio.volume = 0.8;
  audio.currentTime = 8.5;

  audio.play().then(() => {
    const checkTime = setInterval(() => {
      if (audio.currentTime >= 22) {
        clearInterval(checkTime);
        let currentStep = 0;
        const steps = 30;
        const interval = (3 / steps) * 1000;
        const fade = setInterval(() => {
          currentStep++;
          audio.volume = Math.max(0.10, 1 - (currentStep / steps));
          if (currentStep >= steps) clearInterval(fade);
        }, interval);
      }
    }, 500);
  }).catch(() => {
    skipBtn.style.display = 'none'; // Sem áudio, sem botão
  });

  // Botão PULAR
  skipBtn.addEventListener('click', () => {
    audio.volume = 0.15;
    skipBtn.style.display = 'none';
    crawl.style.animationPlayState = 'paused';
    encerrarIntro(); // chama com proteção
  });
});

// Função para animar a página normalmente
function animatePageElements() {
  gsap.utils.toArray('body *').forEach((el) => {
    if (
      el.offsetWidth > 0 &&
      el.offsetHeight > 0 &&
      !el.closest('#starwars-intro')
    ) {
      gsap.from(el, {
        autoAlpha: 0,
        y: 20,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 110%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    }
  });
}
