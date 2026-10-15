/* CrystalClean - rtl.js : LTR / RTL direction switching with persistence across all pages. */
(() => {
  "use strict";
  const KEY = "crystalclean-dir";
  const root = document.documentElement;

  const arrowSvg = `<svg class="dir-toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16M15 4l5 4-5 4M20 16H4M9 12l-5 4 5 4"/></svg>`;

  const setupButton = (btn, dir) => {
    const icon = btn.querySelector(".dir-toggle-icon");
    const span = btn.querySelector(".dir-toggle-text");
    const targetText = dir === "rtl" ? "LTR" : "RTL";

    if (!icon || !span) {
      btn.innerHTML = `${arrowSvg}<span class="dir-toggle-text" aria-hidden="true">${targetText}</span>`;
    } else {
      span.textContent = targetText;
    }
    btn.classList.add("dir-toggle-pill");
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
