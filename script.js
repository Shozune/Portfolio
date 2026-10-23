/* ==========================================================
   Chad Kurt Loza — Portfolio
   Vanilla JavaScript, no build step.

   EDIT THIS BLOCK to add project screenshots and links.
   Leave a value as "" (empty) to keep the placeholder.
   ========================================================== */

const CONFIG = {
  email: "chadkurtloza@gmail.com",

  // Link to your credential page (for example a Certiport / Credly badge URL).
  // Leave empty to hide the "View credential" button.
  certificateUrl: "",

  projects: {
    campuscare: {
      // File name inside the assets/ folder, e.g. "campuscare.png"
      image: "",
      imageAlt: "Screenshot of the CampusCare student welfare system",
      demo: "", // e.g. "https://your-demo-link.example"
      code: ""  // e.g. "https://github.com/your-username/campuscare"
    },
    tapnbite: {
      image: "",
      imageAlt: "Screenshot of the TapNbite canteen ordering application",
      demo: "",
      code: ""
    }
  }
};

(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Mobile navigation ---------- */
  function setNavOpen(open) {
    if (!header || !navToggle) return;
    header.setAttribute("data-open", open ? "true" : "false");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNavOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (navToggle.getAttribute("aria-expanded") === "true" && !header.contains(e.target)) {
        setNavOpen(false);
      }
    });

    window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
      if (mq.matches) setNavOpen(false);
    });
  }

  /* ---------- Header border once the page scrolls ---------- */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Highlight the nav link for the section in view ---------- */
  if ("IntersectionObserver" in window && nav) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute("aria-current"); });
        var active = links[entry.target.id];
        if (active) active.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Project screenshots ---------- */
  Object.keys(CONFIG.projects).forEach(function (key) {
    var cfg = CONFIG.projects[key];
    var shot = document.querySelector('[data-shot="' + key + '"]');
    if (!shot || !cfg.image) return;

    var img = new Image();
    img.alt = cfg.imageAlt || "";
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("load", function () {
      shot.appendChild(img);
      shot.classList.add("has-image");
    });
    // If the file name is wrong, the placeholder simply stays in place.
    img.src = /^https?:\/\//.test(cfg.image) ? cfg.image : "assets/" + cfg.image;
  });

  /* ---------- Project links (demo / source code) ---------- */
  document.querySelectorAll("[data-project-link]").forEach(function (el) {
    var parts = el.getAttribute("data-project-link").split(":");
    var project = CONFIG.projects[parts[0]];
    var url = project && project[parts[1]];
    if (!url) return; // stays disabled with its "link not added yet" label

    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.classList.remove("is-disabled");
    el.removeAttribute("aria-disabled");
    el.textContent = parts[1] === "demo" ? "Live demo" : "Source code";
  });

  /* ---------- Certification link ---------- */
  var certLink = document.getElementById("cert-link");
  if (certLink && CONFIG.certificateUrl) {
    certLink.href = CONFIG.certificateUrl;
    certLink.hidden = false;
  }

  /* ---------- Resume viewer ---------- */
  var resumeToggle = document.getElementById("resume-toggle");
  var resumePanel = document.getElementById("resume-panel");
  var resumeObject = document.getElementById("resume-object");

  if (resumeToggle && resumePanel && resumeObject) {
    resumeToggle.addEventListener("click", function () {
      var open = resumeToggle.getAttribute("aria-expanded") === "true";
      if (!open && !resumeObject.getAttribute("data")) {
        resumeObject.setAttribute("data", resumeObject.getAttribute("data-src"));
      }
      resumePanel.hidden = open;
      resumeToggle.setAttribute("aria-expanded", open ? "false" : "true");
      resumeToggle.textContent = open ? "View resume" : "Hide resume";
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copy-email");

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  if (copyBtn) {
    var copyTimer;
    copyBtn.addEventListener("click", function () {
      var done = function (ok) {
        copyBtn.textContent = ok ? "Email copied" : "Copy failed, select it manually";
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function () { copyBtn.textContent = "Copy email"; }, 2200);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(CONFIG.email).then(
          function () { done(true); },
          function () { done(fallbackCopy(CONFIG.email)); }
        );
      } else {
        done(fallbackCopy(CONFIG.email));
      }
    });
  }

  /* ---------- Contact form (opens the visitor's email app via mailto:) ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("is-error");

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please fill in your name, a subject, and a message.";
        status.classList.add("is-error");
        return;
      }

      var name = form.elements.name.value.trim();
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();
      var body = message + "\n\n" + "From: " + name;

      window.location.href =
        "mailto:" + CONFIG.email +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent =
        "Your email app should open with a draft. Press send there to deliver it. " +
        "If nothing opens, email me directly at " + CONFIG.email + ".";
    });
  }
})();
