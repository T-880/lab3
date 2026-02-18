import '../scss/main.scss';

const animateBtn = document.getElementById("animateBtn");
const clickBox = document.querySelector(".click-box");

animateBtn.addEventListener("click", () => {
  clickBox.classList.add("active");
  setTimeout(() => {
    clickBox.classList.remove("active");
  }, 500);
});