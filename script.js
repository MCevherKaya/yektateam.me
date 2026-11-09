const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#nav");
const mobile = window.matchMedia("(max-width: 840px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = mobile.matches && !open;
}

function matchNavigation() {
  menuButton.hidden = !mobile.matches;
  setMenu(false);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
mobile.addEventListener("change", matchNavigation);
matchNavigation();

for (const viewer of document.querySelectorAll("[data-viewer]")) {
  const buttons = [...viewer.querySelectorAll("[data-view]")];
  viewer.querySelector(".switch").hidden = false;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      for (const choice of buttons) {
        const selected = choice === button;
        choice.setAttribute("aria-pressed", String(selected));
        document.getElementById(choice.getAttribute("aria-controls")).hidden = !selected;
      }
    });
  }
}

const galleryControls = document.querySelector(".gallery-controls");
if (galleryControls) {
  const filters = [...galleryControls.querySelectorAll("button")];
  const figures = [...document.querySelectorAll("[data-category]")];
  galleryControls.hidden = false;
  for (const filter of filters) {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;
      for (const button of filters) button.setAttribute("aria-pressed", String(button === filter));
      for (const figure of figures) figure.hidden = category !== "all" && figure.dataset.category !== category;
    });
  }
}

const lightbox = document.querySelector(".lightbox");
if (lightbox && typeof lightbox.showModal === "function") {
  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("p");
  for (const link of document.querySelectorAll(".gallery-link")) {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = link.href;
      image.alt = link.querySelector("img").alt;
      caption.textContent = image.alt;
      lightbox.showModal();
    });
  }
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}
