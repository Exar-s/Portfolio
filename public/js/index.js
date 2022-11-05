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
