const body = document.querySelector("body");
const button = document.createElement("button");
const modalFrame = document.createElement("div");
const modalContent = document.createElement("div");
const p = document.createElement("p");
const modalText = modalContent.appendChild(p);
const closeButton = document.createElement("button");
const modalButton = modalContent.appendChild(closeButton);
const link = document.createElement("a");

body.appendChild(link);
link.textContent = "follow the light";
link.href = "traffic_lights.html";
link.classList.add("link");
modalFrame.classList.add("modal-frame");
modalContent.classList.add("modal-content");
button.textContent = "Open";
button.classList.add("button");
button.classList.add("button--modal");
body.style.textAlign = "center";
body.style.paddingTop = "20px";
body.appendChild(button);
body.appendChild(modalFrame);
modalFrame.appendChild(modalContent);
p.classList.add("modal-text");
closeButton.textContent = "Close";
closeButton.classList.add("close-button");
const textOdyn = "Ю-ху-у-у-у-у-у";
const textDva = "Ги-ги-и-и-и-и-и";
p.textContent = textOdyn;
button.addEventListener("click", () => {
  p.textContent = p.textContent === textOdyn ? textDva : textOdyn;
  modalFrame.classList.add("open");
});
closeButton.addEventListener("click", () => {
  modalFrame.classList.remove("open");
});
