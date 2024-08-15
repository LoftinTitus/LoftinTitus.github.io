function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('scroll', function() {
  const skillsWrapper = document.querySelector('.skills-wrapper');
  const scrollY = window.scrollY;
  skillsWrapper.style.transform = `translateX(-${scrollY}px)`;
});
