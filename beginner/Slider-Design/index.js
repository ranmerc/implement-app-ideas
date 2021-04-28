let currentPane = 1;
const rightArrow = document.querySelector('.arrow-right');
const leftArrow = document.querySelector('.arrow-left');
const slider = document.querySelector('.slider');
const posPix = { 1: '0', 2: '480', 3: '960', 4: '1440', 5: '1920' };

const slideLeft = () => {
  currentPane = --currentPane === 0 ? 5 : currentPane;
  slider.style.transform = `translateX(${-posPix[currentPane]}px)`;
};
const slideRight = () => {
  currentPane = (currentPane % 5) + 1;
  slider.style.transform = `translateX(${-posPix[currentPane]}px)`;
};

rightArrow.addEventListener('click', slideRight);

leftArrow.addEventListener('click', slideLeft);

setInterval(() => {
  slideRight();
}, 3000);
