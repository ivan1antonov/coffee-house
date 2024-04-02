import './index.html';
import './menu.html';
import './index.scss';

const burger = document.querySelector('.header-burger'),
  menuButton = document.querySelector('.header-menu__mobile'),
  burgerImg = document.querySelector('.header-burger__img'),
  nav = document.querySelector('.header-nav'),
  headerItem = document.querySelectorAll('.header-item'),
  dots = document.querySelectorAll('.slider-dots__input'),
  refreshButton = document.querySelector('.menu-refresh'),
  menu = document.querySelector('.main'),
  sliderNext = document.querySelector('.arrow-right'),
  sliderPrev = document.querySelector('.arrow-left'),
  slider = document.querySelector('.slider-inner'),
  grid = document.querySelectorAll('.menu-grid__items'),
  tabs = document.querySelectorAll('.menu-tabs__item'),
  sliderItem = Array.from(document.querySelectorAll('.slider-item__img')),
  sliderLabel = Array.from(document.querySelectorAll('.slider-dots__label')),
  blogs = Array.from(document.querySelectorAll('.slider-item'));
let position = 0,
  dotIndex = 0,
  timerCurrent;
let isMove = false;
let currentIndex = 0;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// function burger
// burger.addEventListener('click', function () {
//   nav.classList.toggle('active');
//   burger.classList.toggle('active');
// });
// headerItem.forEach(el => {
//   el.addEventListener('click', function () {
//     nav.classList.remove('active');
//     burger.classList.remove('active');
//   });
// });

const nextSlide = () => {
  dotIndex++;
  if (dotIndex > dots.length - 1) {
    dotIndex = 0;
  }
  activeSlide(dotIndex);
};
//slider prev
const prevSlide = () => {
  dotIndex--;
  if (dotIndex < 0) {
    dotIndex = dots.length - 1;
  }
  activeSlide(dotIndex);
};
// slider active
const activeSlide = i => {
  dots[i].checked = true;
};
// auto play
currentStart();

function currentStart() {
  timerCurrent = setInterval(nextSlide, 5000);
}

function currentStop() {
  clearInterval(timerCurrent);
  timerCurrent = null;
}

//auto pause
const sliderPlay = index => {
  sliderLabel[index].classList.remove('stop');
  currentStart();
};
const sliderPause = index => {
  sliderLabel[index].classList.add('stop');
  currentStop();
};

sliderItem.forEach((el, index) => {
  el.addEventListener('mouseout', function () {
    sliderPlay(index);
  });
  el.addEventListener('mouseover', function () {
    sliderPause(index);
  });
  el.addEventListener('touchend', function () {
    sliderPlay(index);
  });
  el.addEventListener('touchstart', function () {
    sliderPause(index);
  });
  el.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
  });
});

//touch slider

blogs.forEach(slide => {
  slide.addEventListener('touchstart', touchStart);
  slide.addEventListener('touchmove', touchMove);
  slide.addEventListener('touchend', touchEnd);
});

function touchStart(event) {
  startPos = getPos(event);
  isMove = true;
}

function touchMove(event) {
  if (isMove) {
    const currentPosition = getPos(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  isMove = false;
  const moveBy = currentTranslate - prevTranslate;
  if (moveBy < -100) {
    nextSlide();
  }
  if (moveBy > 100) {
    prevSlide();
  }
}

function getPos(event) {
  return event.touches[0].clientX;
}

// arrow button
sliderPrev.addEventListener('click', prevSlide);
sliderNext.addEventListener('click', nextSlide);

// //main.js

// // popap;
// const modalClose = document.querySelector('.menu-modal__close'),
//   modal = document.querySelector('.menu-modal'),
//   pageShadow = document.querySelector('.page-shadow'),
//   menuItem = document.querySelectorAll('.menu-grid__item'),
//   modalItem = document.querySelectorAll('.menu-modal__item');

// // function burger
// burger.addEventListener('click', function () {
//   nav.classList.toggle('active');
//   burger.classList.toggle('active');
// });
// headerItem.forEach(el => {
//   el.addEventListener('click', function () {
//     nav.classList.remove('active');
//     burger.classList.remove('active');
//   });
// });

// modalItem.forEach(el => {
//   el.addEventListener('click', () => {
//     for (let i of modalItem) {
//       i.classList.remove('active');
//     }
//     el.classList.add('active');
//   });
// });
// menuItem.forEach(el => {
//   el.addEventListener('click', () => {
//     openModal();
//   });
// });

// modalClose.addEventListener('click', () => {
//   closeModal();
// });
// pageShadow.addEventListener('click', () => {
//   closeModal();
// });

// function openModal() {
//   modal.classList.add('active');
//   pageShadow.classList.add('active');
//   document.body.classList.add('modal-open');
// }

// function closeModal() {
//   modal.classList.remove('active');
//   pageShadow.classList.remove('active');
//   document.body.classList.remove('modal-open');
// }

// //fadeIn
// const fadeIn = index => {
//   grid.forEach(el => {
//     el.classList.remove('active');
//   });
//   grid[index].style.opacity = 0;
//   grid[index].classList.add('active');
//   grid[index].style.transition = '1000ms';
//   setTimeout(() => {
//     grid[index].style.opacity = 1;
//   }, 1);
// };
// // grid
// for (let i = 0; i < tabs.length; i++) {
//   tabs[i].addEventListener('click', () => {
//     for (let tab of tabs) {
//       tab.classList.remove('active');
//     }
//     tabs[i].classList.add('active');
//     fadeIn(i);
//     let item = document.querySelectorAll('.menu-grid__item');
//     if (item.length < 5 && menu.offsetWidth < 1180) {
//       refreshButton.style.display = 'none';
//     }
//   });
// }
