// Fade-in de secciones
const faders = document.querySelectorAll('.fade-section');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Animar barras de habilidades al aparecer en pantalla
const skillsSection = document.querySelector('#skills');
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

function animateSkills() {
  const sectionTop = skillsSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;
  if (!skillsAnimated && sectionTop < screenHeight - 100) {
    skillFills.forEach(fill => {
      fill.style.width = fill.dataset.width;
    });
    skillsAnimated = true;
  }
}
window.addEventListener('scroll', animateSkills);

// Cambiar fondo y texto del hero al hacer scroll y los logos de las redes sociales a negro
const heroSocial = document.querySelector('.hero-social');
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    heroSection.classList.add('hero-white');
    heroSocial.classList.add('scrolled');
  } else {
    heroSection.classList.remove('hero-white');
    heroSocial.classList.remove('scrolled');
  }
});

// Fondo aleatorio para el hero
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  const colors = ['#fd3ff7ff', '#3eff37ff', '#9333ea', '#f59e42']; // azul, celeste, morado, naranja
  const random = Math.floor(Math.random() * colors.length);
  if (heroSection) {
    heroSection.style.background = colors[random];
  }
});

// Typing effect en el hero subtitle
const subtitle = document.querySelector(".hero-subtitle");
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    }
  }
  typing();
}

// Añadir porcentajes dinámicos a las barras de skills
document.querySelectorAll(".skill-bar").forEach(bar => {
  const fill = bar.querySelector(".skill-fill");
  const percent = fill.dataset.width;
  bar.setAttribute("data-percent", percent);
});

// Filtro de proyectos
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Quitar estado activo de todos
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterCategory = btn.getAttribute("data-filter");
    const filterLanguage = btn.getAttribute("data-language");

    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");
      const languages = card.getAttribute("data-language")?.split(",") || [];

      let show = true;

      if (filterCategory && filterCategory !== "all") {
        show = category === filterCategory;
      }

      if (filterLanguage) {
        show = show && languages.includes(filterLanguage);
      }

      if (show) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// Menú lateral con overlay suave
const hamburger = document.getElementById("hamburger");
const fullMenu = document.getElementById("fullMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = fullMenu.querySelectorAll("a");

function openMenu() {
  hamburger.classList.add("active");
  fullMenu.classList.add("active");
  fullMenu.classList.remove("closing");
  menuOverlay.classList.add("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  fullMenu.classList.remove("active");
  fullMenu.classList.add("closing");
  menuOverlay.classList.remove("active");

  // Después de la transición, quitar la clase 'closing'
  fullMenu.addEventListener(
    "transitionend",
    () => {
      fullMenu.classList.remove("closing");
    },
    { once: true }
  );
}

// Toggle menú al hacer clic en hamburguesa
hamburger.addEventListener("click", () => {
  if (fullMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Cerrar menú al hacer clic en overlay
menuOverlay.addEventListener("click", closeMenu);

// Cerrar menú al hacer clic en un enlace
menuLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

