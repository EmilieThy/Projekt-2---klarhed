// ===============================
// 🍔 HAMBURGER MENU (med ARIA)
// ===============================
const hamMenu = document.querySelector('.ham-menu');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.body;

// Tilgængelighed
hamMenu.setAttribute("role", "button");
hamMenu.setAttribute("tabindex", "0");
hamMenu.setAttribute("aria-label", "Åbn menu");
hamMenu.setAttribute("aria-expanded", "false");

hamMenu.addEventListener('click', toggleMenu);
hamMenu.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

function toggleMenu() {
  const isOpen = hamMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');
  body.classList.toggle('menu-open');

  hamMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
  hamMenu.setAttribute("aria-label", isOpen ? "Luk menu" : "Åbn menu");
}

// ===============================
// ⬆️ "BACK TO TOP" KNAP (ARIA)
// ===============================
const backTop = document.querySelector('.back-top');

backTop.setAttribute("role", "button");
backTop.setAttribute("aria-label", "Tilbage til toppen");
backTop.setAttribute("tabindex", "0");

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const footer = document.querySelector('footer');
  const footerRect = footer.getBoundingClientRect();

  if (scrollY > 100) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }

  const windowHeight = window.innerHeight;
  const overlap = windowHeight - footerRect.top;

  backTop.style.bottom = overlap > 0 ? `${overlap + 20}px` : '130px';
});

backTop.addEventListener('click', scrollTopSmooth);
backTop.addEventListener('keydown', (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    scrollTopSmooth();
  }
});

function scrollTopSmooth() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===============================
// 📂 COLLAPSIBLE (med ARIA)
// ===============================
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((button, index) => {
  const content = button.nextElementSibling;

  // Unikke ID'er til ARIA
  const contentId = `collapsible-content-${index}`;
  content.setAttribute("id", contentId);

  // ARIA-roller
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", contentId);
  button.setAttribute("role", "button");
  button.setAttribute("tabindex", "0");

  content.setAttribute("role", "region");
  content.setAttribute("aria-hidden", "true");

  button.addEventListener("click", () => toggleCollapsible(button, content));
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCollapsible(button, content);
    }
  });
});

function toggleCollapsible(button, content) {
  const isOpen = button.classList.toggle("active");
  const textSpan = button.querySelector(".collapsible-text");

  if (isOpen) {
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.add("open");
    content.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    if (textSpan) textSpan.textContent = "Luk";
  } else {
    content.style.maxHeight = null;
    content.classList.remove("open");
    content.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    if (textSpan) textSpan.textContent = "Fold ud";
  }
}

// ===============================
// 🌐 ÅBN LINKS I NY FANE (WCAG safe)
// ===============================
document.querySelectorAll('.gå-til-side').forEach(link => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('role', 'link');
});

// ===============================
// 🚫 SKJUL PILE NÅR MENU ER ÅBEN
// ===============================
const arrows = document.querySelectorAll('.arrow_downward');

const observer = new MutationObserver(() => {
  if (body.classList.contains('menu-open')) {
    arrows.forEach(arrow => arrow.style.display = 'none');
  } else {
    arrows.forEach(arrow => arrow.style.display = '');
  }
});

observer.observe(body, { attributes: true, attributeFilter: ['class'] });
