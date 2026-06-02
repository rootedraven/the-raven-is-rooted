(function () {
  "use strict";

  // Replace with your Hipcamp listing URL
  const HIP_CAMP_URL =
    "https://www.hipcamp.com/en-US/land/washington-rooted-raven-dw9hym2p?adults=1&children=0";
  const AIRBNB_URL = "https://www.airbnb.com";

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll(".hipcamp-link").forEach(function (link) {
    link.href = HIP_CAMP_URL;
  });

  document.querySelectorAll(".airbnb-link").forEach(function (link) {
    link.href = AIRBNB_URL;
  });

  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");

  function onScroll() {
    const scrolled = window.scrollY > 48;
    if (header) {
      header.classList.toggle("is-scrolled", scrolled);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (hero && header && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "scroll",
      function () {
        const offset = Math.min(window.scrollY * 0.35, 180);
        hero.style.setProperty("--parallax", offset + "px");
        const layers = hero.querySelectorAll(".hero-media");
        layers.forEach(function (layer, i) {
          const factor = i === 0 ? 0.2 : 0.12;
          layer.style.transform = "translate3d(0, " + offset * factor + "px, 0)";
        });
      },
      { passive: true }
    );
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
