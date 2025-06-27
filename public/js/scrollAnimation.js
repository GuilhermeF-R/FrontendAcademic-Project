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
