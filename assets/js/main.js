(() => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  const sections = [...document.querySelectorAll("main section[id]")];

  const setActiveLink = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (!id) return;

      const link = nav ? nav.querySelector(`a[href="#${id}"]`) : null;
      if (!link) return;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", setActiveLink);
  window.addEventListener("load", setActiveLink);

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    reveals.forEach((item) => observer.observe(item));
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const scriptUrl = contactForm.dataset.scriptUrl;
      if (
        !scriptUrl ||
        scriptUrl ===
          "https://docs.google.com/spreadsheets/d/1_Z8Bi5c6z-zJjixGd0RyrP8x3ErQL7UwcpP-_522jg4/edit?usp=sharing"
      ) {
        alert("Please set your Google Apps Script URL in the contact form.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "";

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Sending...";
        }

        const payload = new URLSearchParams({
          name: String(contactForm.name.value || "").trim(),
          email: String(contactForm.email.value || "").trim(),
          message: String(contactForm.message.value || "").trim(),
          submitted_at: new Date().toISOString(),
        });

        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: payload,
        });

        alert("Message sent successfully!");
        contactForm.reset();
      } catch (error) {
        alert("Failed to send message. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
})();
