import './index.html';
import './index.scss';

const burger = document.querySelector('.header-burger'),
  body = document.querySelector('body'),
  menuButton = document.querySelector('.header-menu__mobile'),
  burgerImg = document.querySelector('.header-burger__img'),
  nav = document.querySelector('.header-nav'),
  headerItem = document.querySelectorAll('.header-item'),
  dots = document.querySelectorAll('.slider-dot'),
  refreshButton = document.querySelector('.menu-refresh'),
  menu = document.querySelector('.main'),
  sliderNext = document.querySelector('.arrow-right'),
  sliderPrev = document.querySelector('.arrow-left'),
  slider = document.querySelector('.slider-inner'),
  grid = document.querySelectorAll('.menu-grid__items'),
  tabs = document.querySelectorAll('.menu-tabs__item'),
  sliderItem = Array.from(document.querySelectorAll('.slider-item__img')),
  sliderLabel = Array.from(document.querySelectorAll('.slider-dots__label')),
  blogs = Array.from(document.querySelectorAll('.slider-item')),
  current = Array.from(document.querySelectorAll('.current'));
let position = 0,
  dotIndex = 0,
  timerCurrent = 0,
  isMove = false,
  currentIndex = 0,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0;

// function burger
burger.addEventListener('click', function () {
  nav.classList.toggle('active');
  burger.classList.toggle('active');
  body.classList.toggle('active');
});
headerItem.forEach(el => {
  el.addEventListener('click', function () {
    nav.classList.remove('active');
    burger.classList.remove('active');
    body.classList.remove('active');
  });
});

function activeSlide(index) {
  dotIndex = index;
  slider.style.transform = 'translate(' + -100 * index + '%)';
}

function clearDots() {
  dots.forEach(el => {
    el.classList.remove('active');
  });
}

//slider

function activeDots(index) {
  clearDots();
  clearWidthDots();
  point = 0;
  dots[index].classList.add('active');
}

dots.forEach((el, index) => {
  el.addEventListener('click', function () {
    activeDots(index);
    activeSlide(index);
  });
});

const nextSlide = () => {
  dotIndex++;
  if (dotIndex > dots.length - 1) {
    dotIndex = 0;
  }
  point = 0;
  clearWidthDots();
  activeSlide(dotIndex);
  activeDots(dotIndex);
};
//slider prev
const prevSlide = () => {
  dotIndex--;
  if (dotIndex < 0) {
    dotIndex = dots.length - 1;
  }
  point = 0;
  clearWidthDots();
  activeSlide(dotIndex);
  activeDots(dotIndex);
};

// auto play
currentStart();

function currentStart() {
  timerCurrent = setInterval(currentDot, 50);
}

function currentStop() {
  clearInterval(timerCurrent);
  timerCurrent = null;
}

// //auto pause
// const sliderPlay = index => {
//   dots[index].classList.remove('stop');
//   currentStart();
// };
// const sliderPause = index => {
//   dots[index].classList.add('stop');
//   currentStop();
// };

let isTouch = false;

sliderItem.forEach(el => {
  el.addEventListener('mouseout', function () {
    isTouch = false;
  });
  el.addEventListener('mouseover', function () {
    isTouch = true;
  });
  el.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
  });
});

// //touch slider

blogs.forEach(slide => {
  slide.addEventListener('touchstart', touchStart);
  slide.addEventListener('touchmove', touchMove);
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('contextmenu', event => {
    event.stopPropagation();
    return false;
  });
});

function touchStart(event) {
  event.stopPropagation();
  startPos = getPos(event);
  isMove = true;
  isTouch = true;
}

function touchMove(event) {
  event.stopPropagation();
  if (isMove) {
    const currentPosition = getPos(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  isMove = false;
  isTouch = false;
  if (currentTranslate < -200) {
    nextSlide();
  }
  if (currentTranslate > 200) {
    prevSlide();
  }
  currentTranslate = 0;
}

function getPos(event) {
  return event.touches[0].clientX;
}

// arrow button
sliderPrev.addEventListener('click', prevSlide);

sliderNext.addEventListener('click', nextSlide);

//current dots
let point = 0;
console.log(isTouch);

const clearWidthDots = () => {
  current.forEach(el => {
    el.style.width = 0;
  });
};

function currentDot() {
  if (point >= 100) {
    nextSlide();
    return (point = 0);
  }
  if (!isTouch) {
    point += 1;
  }
  current[dotIndex].style.width = point + '%';
  return point;
}
