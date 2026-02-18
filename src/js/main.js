import '../scss/main.scss';

import img1Url from '../images/img1.webp?url';
import img2Url from '../images/img2.webp?url';

const gallery = document.getElementById('gallery');

[img1Url, img2Url].forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  gallery.appendChild(img);
});

const animateBtn = document.getElementById("animateBtn");
const clickBox = document.querySelector(".click-box");

animateBtn.addEventListener("click", () => {
  clickBox.classList.add("active");
  setTimeout(() => {
    clickBox.classList.remove("active");
  }, 500);
});