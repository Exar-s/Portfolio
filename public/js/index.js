import imgCollection from './pics.js';

const nav = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('li');
const bar = document.querySelector('.bar');

const navOptions = {
  rootMargin: '-60% 0px -40% 0px',
};

//show nav background after scrolling past home
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

//prevent nav slider from moving back and forth
let clicked = null;

function scrollTo(e) {
  document.getElementById(e.target.dataset.sec).scrollIntoView();
  clicked = e.target.dataset.sec;
}

navLinks.forEach((link) => {
  link.addEventListener('click', scrollTo);
});

//Slide nav bar based on in view section
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
      arr = imgCollection.gacha;
    } else if (type === 'dailyten') {
      arr = imgCollection.dailyten;
    } else if (type === 'pokedex') {
      arr = imgCollection.pokedex;
    } else if (type === 'weather') {
      arr = imgCollection.weather;
    }
    currpage = 0;
    totalpage = arr.length;
    changeInner();
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
  });
});

//change image
function changeInner() {
  if (currpage >= totalpage) {
    currpage = 0;
  } else if (currpage < 0) {
    currpage = totalpage - 1;
  }
  modalPage.innerText = `${currpage + 1}/${totalpage}`;
  modalImg.src = arr[currpage].img;
  modalDesc.innerText = arr[currpage].desc;
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
  document.body.style.overflow = 'initial';
});

//Copy to Clipboard
const contact = document.querySelector('.contact');
const text = document.querySelector('.contact-context').innerText;
const copied = document.querySelector('.contact-copy');

contact.addEventListener('click', async () => {
  navigator.clipboard.writeText(text);
  copied.innerText = 'Copied';
  setTimeout(() => {
    copied.innerText = 'Click to copy';
  }, 10000);
});
