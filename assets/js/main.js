/* ============================================================
   Jimmy Zamora — Portfolio
   Interacciones compartidas
   ============================================================ */

(() => {
  "use strict";

  /* ---------- Idioma de la página ---------- */
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");

  /* ---------- Menú móvil ---------- */
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const backdrop = document.getElementById("backdrop");

  const setMenu = (open) => {
    if (!sidebar || !menuBtn || !backdrop) return;
    sidebar.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute(
      "aria-label",
      open
        ? (isEnglish ? "Close menu" : "Cerrar menú")
        : (isEnglish ? "Open menu" : "Abrir menú")
    );
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      setMenu(!sidebar.classList.contains("open"));
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", () => setMenu(false));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  /* ---------- Typewriter del sidebar ---------- */
  const typed = document.getElementById("typed");
  const roles = isEnglish
    ? [
        "Systems Administrator",
        "Information Security",
        "Blue Team · Hardening",
        "eJPTv2 · AZ-900"
      ]
    : [
        "Administrador de Sistemas",
        "Seguridad Informática",
        "Blue Team · Hardening",
        "eJPTv2 · AZ-900"
      ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typed) {
    if (reduceMotion) {
      typed.textContent = roles[0];
    } else {
      let word = 0;
      let length = 0;
      let deleting = false;

      const tick = () => {
        const current = roles[word];
        length += deleting ? -1 : 1;
        typed.textContent = current.slice(0, length);

        let delay = deleting ? 35 : 75;

        if (!deleting && length === current.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && length === 0) {
          deleting = false;
          word = (word + 1) % roles.length;
          delay = 350;
        }

        setTimeout(tick, delay);
      };

      tick();
    }
  }

  /* ---------- Copiar al portapapeles ---------- */
  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  };

  document.querySelectorAll("[data-copy]").forEach((button) => {
    const original = button.textContent;

    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy");
      if (!value) return;

      try {
        await copyText(value);
        button.textContent = isEnglish ? "copied ✓" : "copiado ✓";
      } catch {
        button.textContent = "error";
      }

      setTimeout(() => {
        button.textContent = original;
      }, 2000);
    });
  });

  /* ---------- Año del footer ---------- */
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
