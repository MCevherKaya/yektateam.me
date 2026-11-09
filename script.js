const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-nav");
const narrow = window.matchMedia("(max-width: 760px)");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menu.hidden = narrow.matches && !open;
}

function updateNavigation() {
  menuButton.hidden = !narrow.matches;
  setMenu(false);
}

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
menu.addEventListener("click", (event) => {
  if (event.target.closest("a") && narrow.matches) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
narrow.addEventListener("change", updateNavigation);
updateNavigation();

const dialog = document.querySelector("#photo-dialog");
if (typeof dialog.showModal === "function") {
  const largePhoto = dialog.querySelector("img");
  const caption = dialog.querySelector("p");

  document.querySelectorAll(".gallery-photo").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const figure = link.closest("figure");
      largePhoto.src = link.href;
      largePhoto.alt = link.querySelector("img").alt;
      caption.textContent = figure.querySelector("figcaption").lastChild.textContent.trim();
      dialog.showModal();
    });
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
