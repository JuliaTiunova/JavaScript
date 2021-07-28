const body = document.querySelector("body");
const switchLightColor = document.querySelector(".button-light");
const switchLight = document.querySelector(".button-off");
const magicButton = document.querySelector(".button--magic");
const lightForm = document.querySelector(".lights-wrapper");
const light = document.querySelectorAll(".light");
const lightRed = document.querySelector(".red");
const lightYellow = document.querySelector(".yellow");
const lightGreen = document.querySelector(".green");

let greenLight = 0;
let redLight = 0;

switchLightColor.addEventListener("click", () => {
  if (greenLight === 0 && redLight === 0) {
    lightGreen.classList.toggle("light--green");
    lightGreen.classList.toggle("light--off");
    greenLight = 1;
  } else if (greenLight === 1 && redLight === 0) {
    lightGreen.classList.toggle("light--green");
    lightGreen.classList.toggle("light--off");
    lightYellow.classList.toggle("light--yellow");
    lightYellow.classList.toggle("light--off");
    greenLight = 0;
    redLight = 1;
  } else if (redLight === 1 && greenLight === 0) {
    lightYellow.classList.toggle("light--yellow");
    lightYellow.classList.toggle("light--off");
    lightRed.classList.toggle("light--red");
    lightRed.classList.toggle("light--off");
    greenLight = 0;
    redLight = 2;
  } else if (greenLight === 0 && redLight === 2) {
    lightRed.classList.toggle("light--red");
    lightRed.classList.toggle("light--off");
    lightYellow.classList.toggle("light--yellow");
    lightYellow.classList.toggle("light--off");
    greenLight = 1;
    redLight = 1;
  } else if (greenLight === 1 && redLight === 1) {
    lightGreen.classList.toggle("light--green");
    lightGreen.classList.toggle("light--off");
    lightYellow.classList.toggle("light--yellow");
    lightYellow.classList.toggle("light--off");
    greenLight = 1;
    redLight = 0;
  }
});

switchLight.addEventListener("click", () => {
  if (greenLight === 1 && redLight === 0) {
    lightGreen.classList.toggle("light--green");
    lightGreen.classList.toggle("light--off");
  } else if (
    (redLight === 1 && greenLight === 0) ||
    (greenLight === 1 && redLight === 1)
  ) {
    lightYellow.classList.toggle("light--yellow");
    lightYellow.classList.toggle("light--off");
  } else if (greenLight === 0 && redLight === 2) {
    lightRed.classList.toggle("light--red");
    lightRed.classList.toggle("light--off");
  }
  greenLight = 0;
  redLight = 0;
});

magicButton.addEventListener("click", () => {
  lightForm.classList.toggle("lights-wrapper--vertical");
});
