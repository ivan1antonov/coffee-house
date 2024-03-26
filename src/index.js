import './index.html';
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
      tabs = document.querySelectorAll('.menu-tabs__item');
let position = 0,
    dotIndex = 0,
    tabsIndex,
    gridIndex;

// function burger
    burger.addEventListener('click', function() {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
    });
    headerItem.forEach(el => {
      el.addEventListener('click', function() {
        nav.classList.remove('active');
        burger.classList.remove('active');
      });
    });


const nextSlide = () => {
  dotIndex++;
  if(dotIndex > (dots.length-1)){
    dotIndex = 0;
  }
  activeSlide(dotIndex);
};
//slider prev
const prevSlide = () =>{
  dotIndex--;
  if(dotIndex < 0){
    dotIndex = (dots.length - 1);
  }
  activeSlide(dotIndex);
};
// slider active
const activeSlide = (i) => {
  dots[i].checked = true;
};

// auto play
setInterval(nextSlide, 5000);

// arrow button
sliderPrev.addEventListener('click', prevSlide);
sliderNext.addEventListener('click', nextSlide);


