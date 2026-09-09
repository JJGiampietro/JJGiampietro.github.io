// Small, dependency-free enhancements. The page is fully readable and
// fully laid out without this file — it only adds the mobile menu toggle,
// the footer year, scroll-triggered reveals, a nav bar that firms up on
// scroll, and a cursor-tilt on the hero mockup. Nothing here is required
// for the page to work.

(function () {
  var nav = document.querySelector(".nav-shell");
  var toggle = document.getElementById("nav-toggle");
  if (!nav || !toggle) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll(".nav-links a"));

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

var prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Nav bar firms up once you've scrolled past the top of the hero. Purely a
// background/shadow change, so it's left on even for reduced-motion users —
// the CSS transition behind it already collapses to ~instant for them.
(function () {
  var nav = document.querySelector(".nav-shell");
  if (!nav) return;

  var ticking = false;
  function update() {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
})();

// Scroll-triggered reveals. Elements only get hidden here, in JS — if this
// script fails to load, or IntersectionObserver isn't supported, or the
// person prefers reduced motion, everything just stays at its default
// visible CSS state. Nothing is ever hidden by CSS alone.
(function () {
  if (prefersReducedMotion) return;
  if (!("IntersectionObserver" in window)) return;

  var els = Array.prototype.slice.call(
    document.querySelectorAll(".will-reveal")
  );
  if (!els.length) return;

  var groupCounts = new Map();
  els.forEach(function (el) {
    var parent = el.parentElement;
    var index = groupCounts.get(parent) || 0;
    groupCounts.set(parent, index + 1);
    el.style.transitionDelay = Math.min(index, 5) * 80 + "ms";
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach(function (el) {
    observer.observe(el);
  });
})();

// Cursor-follow tilt on the "Workspace" hero mockup. Desktop-with-a-mouse
// only — touch devices don't have hover to drive this, and on mobile the
// mockup is laid out in plain stacked flow anyway (see styles.css).
(function () {
  if (prefersReducedMotion) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  var stage = document.querySelector(".product-stage");
  var card = document.querySelector(".main-window");
  if (!stage || !card) return;

  var floaters = Array.prototype.slice.call(stage.querySelectorAll(".mini-card"));

  function onMove(event) {
    var rect = stage.getBoundingClientRect();
    var x = (event.clientX - rect.left) / rect.width - 0.5;
    var y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transition = "none";
    card.style.transform =
      "perspective(900px) rotateY(" + x * 8 + "deg) rotateX(" + y * -8 + "deg)";

    floaters.forEach(function (el) {
      el.style.transition = "none";
      el.style.transform = "translate(" + x * 10 + "px, " + y * 10 + "px)";
    });
  }

  function onLeave() {
    card.style.transition = "transform 0.5s ease";
    card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    floaters.forEach(function (el) {
      el.style.transition = "transform 0.5s ease";
      el.style.transform = "translate(0px, 0px)";
    });
  }

  stage.addEventListener("mousemove", onMove);
  stage.addEventListener("mouseleave", onLeave);
})();


// Click-only 4Runner drive-by from the About photo.
(function () {
  var trigger = document.querySelector("[data-4runner-trigger]");
  var driveBy = document.querySelector(".fourrunner-drive");
  var isDriving = false;

  if (!trigger || !driveBy || prefersReducedMotion) return;

  function playDriveBy() {
    if (isDriving) return;
    isDriving = true;
    driveBy.classList.remove("is-driving");
    window.requestAnimationFrame(function () {
      driveBy.classList.add("is-driving");
    });
    window.setTimeout(function () {
      driveBy.classList.remove("is-driving");
      isDriving = false;
    }, 3300);
  }

  trigger.addEventListener("click", playDriveBy);
  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playDriveBy();
    }
  });
})();