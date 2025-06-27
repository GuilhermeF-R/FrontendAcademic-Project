//welcome video
const hero = document.querySelector('.video-hero');
const video = document.querySelector('.welcome-video');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Quando desce (ativa o efeito ao passar de 50px)
  if (scrollY > 50) {
    hero.classList.add('shrink');
  } else {
    hero.classList.remove('shrink');
  }
});
