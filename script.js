// Small, dependency-free enhancements. The page is fully readable without
// this file — it only handles the mobile menu toggle and the footer year.

(function () {
  var nav = document.querySelector(".nav-shell");
  var toggle = document.getElementById("nav-toggle");
  if (!nav || !toggle) return;

  var links = nav.querySelectorAll(".nav-links a");

  function closeMenu() {
    nav.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    nav.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    if (nav.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", function (event) {
    if (nav.classList.contains("menu-open") && !nav.contains(event.target)) {
      closeMenu();
    }
  });
})();

// Keep the copyright year current without needing a yearly edit.
var yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
