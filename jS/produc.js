let currentScrollPosition = 0;

function scrollCarousel(direction) {
  const carousel = document.querySelector('.carousel-track');
  const cardWidth = document.querySelector('.product-card').offsetWidth + 15; // 15px por el gap
  const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
  const maxScroll = (carousel.childElementCount - visibleCards) * cardWidth;

  currentScrollPosition += direction * cardWidth;

  if (currentScrollPosition < 0) {
    currentScrollPosition = 0;
  } else if (currentScrollPosition > maxScroll) {
    currentScrollPosition = maxScroll;
  }

  carousel.style.transform = `translateX(-${currentScrollPosition}px)`;
}
