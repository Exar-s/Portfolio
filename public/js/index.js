import imgCollection from './pics.js';

const nav = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('li');
const bar = document.querySelector('.bar');
const dropDown = document.querySelector('.dropdown');

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
//Clicking another section too fast causes bar to land on the prev clicked
// let clicked = null;

function scrollTo(e) {
  // clicked = e.target.dataset.sec;
  document.getElementById(e.target.dataset.sec).scrollIntoView();
}

navLinks.forEach((link) => {
  link.addEventListener('click', scrollTo);
});

//Slide nav bar based on in view section
const navScrollObeserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const page = document.querySelector(`[data-sec='${entry.target.id}']`);
      bar.style.width = page.offsetWidth + 'px';
      bar.style.transform = `translateX(${page.offsetLeft}px)`;
    } else {
      return;
    }
  });
}, navOptions);

//wait till load to observer to prevent wrong width values
window.addEventListener('load', () => {
  sections.forEach((section) => {
    navScrollObeserver.observe(section);
  });
});

//window resize causes an error to underline width
//changed from innerwidth to pos incase of users with large font size
function checkSize() {
  const pos = getComputedStyle(dropDown).position;
  if (pos === 'relative') {
    sections.forEach((section) => {
      navScrollObeserver.observe(section);
    });
  } else if (pos === 'absolute') {
    sections.forEach((section) => {
      navScrollObeserver.unobserve(section);
    });
  }
}

window.addEventListener('resize', checkSize);

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

//Navbar hamburger
const ham = document.querySelector('.navbar');

ham.addEventListener('click', () => {
  if (!ham.classList.contains('active')) {
    ham.classList.add('active');
  } else {
    ham.classList.remove('active');
  }
});

//Resume
const resumeBtn = document.querySelector('.resume');

resumeBtn.addEventListener('click', () => {
  window.open('resume.pdf', '_blank');
});
