import imgCollection from './pics.js';

const nav = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('li');
const bar = document.querySelector('.bar');

const navOptions = {
  rootMargin: '-60% 0px -40% 0px',
};

let clicked = null;

const navObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add('bg');
    } else {
      nav.classList.remove('bg');
    }
  });
}, navOptions);

navObserver.observe(home);

function scrollTo(e) {
  document.getElementById(e.target.dataset.sec).scrollIntoView();
  clicked = e.target.dataset.sec;
}

navLinks.forEach((link) => {
  link.addEventListener('click', scrollTo);
});

const navScrollObeserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (clicked && entry.target.id !== clicked) return;
      const page = document.querySelector(`[data-sec='${entry.target.id}']`);
      bar.style.width = page.offsetWidth + 'px';
      bar.style.transform = `translateX(${page.offsetLeft}px)`;
      clicked = null;
    } else {
      return;
    }
  });
}, navOptions);

sections.forEach((section) => {
  navScrollObeserver.observe(section);
});

//Image Modal
const modal = document.querySelector('.modal-container');
const modalPage = document.querySelector('.modal-page');
const modalImg = document.querySelector('.modal-img');
const modalDesc = document.querySelector('.modal-desc');
const modalNext = document.querySelector('.modal-next');
const modalPrev = document.querySelector('.modal-prev');
const modalClose = document.querySelector('.modal-close');
const screenshots = document.querySelectorAll('[data-screen]');

let currpage = 0;
let totalpage = 0;
let arr;

screenshots.forEach((screenshot) => {
  screenshot.addEventListener('click', (e) => {
    const type = e.target.dataset.screen;
    if (type === 'anidisc') {
      arr = imgCollection.anidisc;
    } else if (type === 'gacha') {
      arr = imgCollection.gacha
    } else if (type === 'dailyten') {
      arr = imgCollection.dailyten
    } else if (type === 'pokedex') {
      arr = imgCollection.pokedex
    } else if (type === 'weather') {
      arr = imgCollection.weather
    }
    currpage = 0;
    totalpage = arr.length;
    changeInner();
    document.body.style.overflow = 'hidden'
    modal.classList.add('active');
  });
});

function changeInner() {
  if(currpage >= totalpage){
    currpage = 0
  } else if (currpage < 0){
    currpage = totalpage - 1
  }
  modalPage.innerText = `${currpage + 1}/${totalpage}`;
  modalImg.src = arr[currpage].img;
  modalDesc.innerText = arr[currpage].desc
}

function changePage(direction) {
  if (direction === 'next') {
    currpage = currpage + 1;
    changeInner();
  } else {
    currpage = currpage - 1;
    changeInner();
  }
}

modalNext.addEventListener('click', () => changePage('next'));
modalPrev.addEventListener('click', () => changePage('prev'));
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = "initial"
})