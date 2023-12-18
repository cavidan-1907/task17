const nav = document.querySelector('nav');
const menu = document.querySelector(".bi-list");

const navMenu = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  if (navMenu.style.top === "90px") {
    navMenu.style.top = "-500px";
  } else {
    navMenu.style.top = "90px";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991) {
    navMenu.style.top = "-500px";
  }
})