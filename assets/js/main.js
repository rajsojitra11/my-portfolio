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
      { threshold: 0.15 }
    );

    reveals.forEach((item) => observer.observe(item));
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
