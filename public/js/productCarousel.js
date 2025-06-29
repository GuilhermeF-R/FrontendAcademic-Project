const carousel = document.getElementById('carousel');
const cards = carousel.querySelectorAll('.card');
const btnPrev = document.querySelector('.carousel-button.prev');
const btnNext = document.querySelector('.carousel-button.next');

// Obtem o card com margens
function getCardWidth() {
  const card = cards[0];
  const style = window.getComputedStyle(card);
  const width = card.offsetWidth +
    parseFloat(style.marginLeft) +
    parseFloat(style.marginRight)
    + 20;
  return width;
}

// Atualiza o estado dos botões com base na posição do scroll
function updateButtons() {
  const scrollLeft = Math.round(carousel.scrollLeft);
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  btnPrev.disabled = scrollLeft <= 0;
  btnNext.disabled = scrollLeft >= maxScrollLeft - 5; // margem de erro
}

// Avança ou volta
btnNext.addEventListener('click', () => {
  carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
});
btnPrev.addEventListener('click', () => {
  carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
});

// Atualiza botões após scroll
carousel.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);
window.addEventListener('load', updateButtons);
