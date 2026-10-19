/* CrystalClean - darkmode.js : persistent light/dark switching. */
(() => {
  "use strict";
  const KEY = "crystalclean-theme";
  const root = document.documentElement;

  const preferred = () => {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setupButton = (btn, theme) => {
    btn.setAttribute("aria-pressed", String(theme === "dark"));
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");

    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "bi bi-brightness-high" : "bi bi-moon-stars";
    }

    const isMobileOrPill = btn.classList.contains("theme-toggle-pill") ||
                           btn.classList.contains("flex-fill") ||
                           (btn.closest && btn.closest(".mobile-nav"));

    if (isMobileOrPill) {
      btn.classList.add("theme-toggle-pill");
      btn.classList.remove("icon-btn");
      let textSpan = btn.querySelector(".theme-toggle-text");
      if (!textSpan) {
        textSpan = document.createElement("span");
        textSpan.className = "theme-toggle-text";
        textSpan.setAttribute("aria-hidden", "true");
        btn.appendChild(textSpan);
      }
      textSpan.textContent = theme === "dark" ? "Light" : "Dark";
    } else {
      const textSpan = btn.querySelector(".theme-toggle-text");
      if (textSpan) {
        textSpan.textContent = theme === "dark" ? "Light" : "Dark";
      }
    }
  };

  const paint = (theme) => {
    root.setAttribute("data-bs-theme", theme);
    document.querySelectorAll(".site-footer .footer-brand img").forEach((logo) => {
      const lightSrc = logo.dataset.lightLogo || logo.getAttribute("src");
      const darkSrc = logo.dataset.darkLogo || lightSrc
        .replace(/(crystalclean|sparklepro)-logo\.svg([?#].*)?$/, "$1-logo-dark.svg$2");

      if (darkSrc !== lightSrc) {
        logo.dataset.lightLogo = lightSrc;
        logo.dataset.darkLogo = darkSrc;
        logo.setAttribute("src", theme === "dark" ? darkSrc : lightSrc);
      }
    });
    document.querySelectorAll("#themeToggle, [data-theme-toggle]").forEach((btn) => {
      setupButton(btn, theme);
    });
  };

  paint(preferred());

  const bindEvents = () => {
    paint(root.getAttribute("data-bs-theme") || preferred());
    document.querySelectorAll("#themeToggle, [data-theme-toggle]").forEach((btn) => {
      if (!btn._themeBound) {
        btn._themeBound = true;
        btn.addEventListener("click", () => {
          const current = root.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
          const next = current === "dark" ? "light" : "dark";
          localStorage.setItem(KEY, next);
          paint(next);
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

