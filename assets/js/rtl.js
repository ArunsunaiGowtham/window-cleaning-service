/* CrystalClean - rtl.js : LTR / RTL direction switching with persistence across all pages. */
(() => {
  "use strict";
  const KEY = "crystalclean-dir";
  const root = document.documentElement;

  const setupButton = (btn, dir) => {
    const span = btn.querySelector(".dir-toggle-text") || btn.querySelector("span");
    const targetText = dir === "rtl" ? "LTR" : "RTL";

    // Remove any SVG icons from the button
    const icon = btn.querySelector(".dir-toggle-icon, svg");
    if (icon) {
      icon.remove();
    }

    if (!span) {
      btn.innerHTML = `<span class="dir-toggle-text" aria-hidden="true">${targetText}</span>`;
    } else {
      span.textContent = targetText;
    }
    btn.classList.toggle("is-rtl", dir === "rtl");
    btn.setAttribute("aria-label", dir === "rtl" ? "Switch to left to right layout" : "Switch to right to left layout");
  };

  const paint = (dir) => {
    root.setAttribute("dir", dir);
    root.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    document.querySelectorAll("#dirToggle, [data-dir-toggle]").forEach((btn) => {
      setupButton(btn, dir);
    });
  };

  const initialDir = localStorage.getItem(KEY) === "rtl" ? "rtl" : "ltr";
  paint(initialDir);

  const bindEvents = () => {
    paint(localStorage.getItem(KEY) === "rtl" ? "rtl" : "ltr");
    document.querySelectorAll("#dirToggle, [data-dir-toggle]").forEach((btn) => {
      if (!btn._rtlBound) {
        btn._rtlBound = true;
        btn.addEventListener("click", () => {
          const current = localStorage.getItem(KEY) === "rtl" ? "rtl" : "ltr";
          const next = current === "rtl" ? "ltr" : "rtl";
          localStorage.setItem(KEY, next);
          paint(next);
          window.dispatchEvent(new Event("resize"));
        });
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindEvents);
  } else {
    bindEvents();
  }
})();
