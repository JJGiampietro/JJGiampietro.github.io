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


// Click-only 4Runner drive-by that opens a small, dismissible outdoor card.
(function () {
  var trigger = document.querySelector("[data-4runner-trigger]");
  var driveBy = document.querySelector(".fourrunner-drive");
  var particles = document.querySelector(".fourrunner-particles");
  var mountains = document.querySelector(".fourrunner-mountains");
  var reveal = document.querySelector(".fourrunner-reveal");
  var route = document.querySelector(".fourrunner-route");
  var dismiss = document.querySelector(".fourrunner-dismiss");
  var isDriving = false;
  var isOpen = false;
  var dustTimer = null;

  if (!trigger || !driveBy || !particles || !mountains || !reveal || !route || !dismiss || prefersReducedMotion) return;

  function clearDustEmitter() {
    if (dustTimer) {
      window.clearInterval(dustTimer);
      dustTimer = null;
    }
  }

  function emitDustParticle(wheelPosition, dustScale) {
    var rect = driveBy.getBoundingClientRect();
    var x = rect.left + rect.width * wheelPosition;
    var y = rect.top + rect.height * 0.88;
    var size;
    var particle;

    if (x < -20 || x > window.innerWidth + 20 || y < -20 || y > window.innerHeight + 20) return;

    size = (4 + Math.random() * 7) * dustScale;
    particle = document.createElement("i");
    particle.className = "fourrunner-particle";
    particle.style.left = (x + (Math.random() - 0.5) * 12) + "px";
    particle.style.top = (y + (Math.random() - 0.5) * 8) + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.setProperty("--drift-x", (24 + Math.random() * 56) * dustScale + "px");
    particle.style.setProperty("--drift-y", (-10 + Math.random() * 20) + "px");
    particles.appendChild(particle);

    window.setTimeout(function () {
      particle.remove();
    }, 1200);
  }

  function emitTireDust() {
    emitDustParticle(0.27, 0.78);
    emitDustParticle(0.76, 1);
  }

  function closeReveal() {
    if (!isOpen) return;
    reveal.classList.remove("is-revealed");
    route.classList.remove("is-revealed");
    mountains.classList.remove("is-revealed");    reveal.setAttribute("aria-hidden", "true");
    isOpen = false;
    trigger.focus();
  }

  function playDriveBy() {
    if (isDriving || isOpen) return;
    isDriving = true;
    driveBy.classList.remove("is-driving");
    mountains.classList.remove("is-revealed");    reveal.classList.remove("is-revealed");
    route.classList.remove("is-revealed");
    mountains.classList.remove("is-revealed");    reveal.setAttribute("aria-hidden", "true");
    clearDustEmitter();

    window.requestAnimationFrame(function () {
      mountains.classList.add("is-revealed");
      driveBy.classList.add("is-driving");      window.setTimeout(emitTireDust, 180);
      dustTimer = window.setInterval(emitTireDust, 115);
    });

    window.setTimeout(function () {
      route.classList.add("is-revealed");
      reveal.setAttribute("aria-hidden", "false");
      reveal.classList.add("is-revealed");
      isOpen = true;
    }, 800);

    window.setTimeout(function () {
      clearDustEmitter();
      driveBy.classList.remove("is-driving");
      isDriving = false;
    }, 5000);
  }

  dismiss.addEventListener("click", closeReveal);
  trigger.addEventListener("click", playDriveBy);
  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      playDriveBy();
    }
  });
})();