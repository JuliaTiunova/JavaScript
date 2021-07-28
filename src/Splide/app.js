// https://splidejs.com/

new Splide(".splide", {
  type: "loop",
  perPage: 4,
  perMove: 1,
  rewind: true,
  heightRatio: 0.2,
  cover: true,
  speed: 500,
  padding: {
    left: 0,
    right: "1rem",
  },
}).mount();

let slide = document.querySelector(".splide");
const slides = document.querySelectorAll(".slide");
