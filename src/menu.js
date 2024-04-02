import './menu.html';
import './index.scss';

import products from './modules/product.json';

const burger = document.querySelector('.header-burger'),
  body = document.querySelector('body'),
  menuButton = document.querySelector('.header-menu__mobile'),
  burgerImg = document.querySelector('.header-burger__img'),
  nav = document.querySelector('.header-nav'),
  headerItem = document.querySelectorAll('.header-item'),
  refreshButton = document.querySelector('.menu-refresh'),
  menu = document.querySelector('.main'),
  grid = document.querySelectorAll('.menu-grid__items'),
  modalTitle = document.querySelector('.menu-modal__title'),
  modalText = document.querySelector('.menu-modal__text'),
  modalPrice = document.querySelector('.menu-modal__price'),
  modalItem = Array.from(document.querySelectorAll('.menu-modal__item')),
  gridImg = Array.from(document.querySelectorAll('.menu-grid__img')),
  tabs = document.querySelectorAll('.menu-tabs__item'),
  addItem = Array.from(document.querySelectorAll('input'));

//popap
const modalClose = document.querySelector('.menu-modal__close'),
  modal = document.querySelector('.menu-modal'),
  pageShadow = document.querySelector('.page-shadow'),
  menuItem = Array.from(document.querySelectorAll('.menu-grid__item')),
  modalImg = document.querySelector('.menu-modal__img');

let count = 0;
let firstPrice;
let mlCost;

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

//tabs

modalItem.forEach(el => {
  el.addEventListener('click', () => {
    for (let i of modalItem) {
      i.classList.remove('active');
    }
    el.classList.add('active');
  });
});

//function total cost

function getTotalCost() {
  modalPrice.innerHTML = `$${(Number(firstPrice) + ((Number(mlCost) || 0) + Number(count))).toFixed(2)}`;
}

menuItem.forEach((el, ind) => {
  el.addEventListener('click', () => {
    firstPrice = products[ind].price;
    getTotalCost();
    openModal();
    modalImg.src = gridImg[ind].src;
    modalTitle.innerHTML = products[ind].name;
    modalText.innerHTML = products[ind].description;
    modalItem.forEach((el, index) => {
      el.addEventListener('click', function () {
        mlCost = 0;
        if (index === 0) {
          mlCost = products[ind].sizes.s['add-price'];
        }
        if (index === 1) {
          mlCost = products[ind].sizes.m['add-price'];
        }
        if (index === 2) {
          mlCost = products[ind].sizes.l['add-price'];
        }
        getTotalCost(Number(mlCost).toFixed(2));
      });
    });
  });
});

addItem.forEach(el => {
  count = 0;
  el.addEventListener('click', function () {
    if (el.checked && count < 1.5) {
      count += 0.5;
    }
    if (!el.checked && count > 0) {
      count -= 0.5;
    }
    getTotalCost();
  });
});

if (modalClose) {
  [modalClose, pageShadow].forEach(el => {
    el.addEventListener('click', () => {
      closeModal();
    });
  });
}

function clearItem() {
  modalItem.forEach(el => {
    el.classList.remove('active');
  });
  modalItem[0].classList.add('active');
}

function clearAdditions() {
  addItem.forEach(el => {
    el.checked = false;
  });
  count = 0;
}

//function open modal
function openModal() {
  modal.classList.add('active');
  pageShadow.classList.add('active');
  document.body.classList.add('modal-open');
  clearItem();
  clearAdditions();
}

function closeModal() {
  modal.classList.remove('active');
  pageShadow.classList.remove('active');
  document.body.classList.remove('modal-open');
}

//fadeIn
const fadeIn = index => {
  grid.forEach(el => {
    el.classList.remove('active');
  });
  grid[index].style.opacity = 0;
  grid[index].classList.add('active');
  grid[index].style.transition = '1000ms';
  setTimeout(() => {
    grid[index].style.opacity = 1;
  }, 1);
};

// grid
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', () => {
    for (let tab of tabs) {
      tab.classList.remove('active');
    }
    tabs[i].classList.add('active');
    fadeIn(i);
    let item = document.querySelectorAll('.menu-grid__item');
    if (item.length < 5 && menu.offsetWidth < 1180) {
      refreshButton.style.display = 'none';
    }
  });
}
