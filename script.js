// ============================================================
// KERALA EVENTS CO. — SHARED SCRIPT
// ============================================================

// TODO: replace with the real business WhatsApp number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "919400000000";

document.addEventListener("DOMContentLoaded", function () {

  // ---------- Mobile nav toggle ----------
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      hamburgerBtn.classList.toggle("open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu after tapping a nav link (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        hamburgerBtn.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Sticky header shadow on scroll ----------
  const siteHeader = document.getElementById("siteHeader");
  if (siteHeader) {
    window.addEventListener("scroll", function () {
      siteHeader.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  // ---------- Simple fade-in on scroll ----------
  const fadeEls = document.querySelectorAll(
    ".section, .service-card, .testimonial-card"
  );
  fadeEls.forEach(function (el) { el.classList.add("fade-in"); });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---------- Contact form -> WhatsApp redirect ----------
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const eventType = document.getElementById("eventType").value;
      const eventDate = document.getElementById("eventDate").value;
      const message = document.getElementById("message").value.trim();

      const errName = document.getElementById("err-name");
      const errPhone = document.getElementById("err-phone");
      const errEventType = document.getElementById("err-eventType");
      const formStatus = document.getElementById("formStatus");

      // Reset errors
      errName.textContent = "";
      errPhone.textContent = "";
      errEventType.textContent = "";
      formStatus.textContent = "";

      let hasError = false;

      if (!name) {
        errName.textContent = "Please enter your name.";
        hasError = true;
      }
      if (!phone) {
        errPhone.textContent = "Please enter your phone number.";
        hasError = true;
      }
      if (!eventType) {
        errEventType.textContent = "Please select an event type.";
        hasError = true;
      }

      if (hasError) return;

      // Build the WhatsApp message
      const lines = [
        "Hi, I'd like to enquire about an event.",
        "Name: " + name,
        "Phone: " + phone,
        "Event Type: " + eventType,
        "Event Date: " + (eventDate || "Not specified"),
        "Message: " + (message || "-")
      ];

      const encodedMessage = encodeURIComponent(lines.join("\n"));
      const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodedMessage;

      formStatus.textContent = "Redirecting you to WhatsApp...";

      setTimeout(function () {
        window.location.href = whatsappUrl;
      }, 700);
    });
  }

});