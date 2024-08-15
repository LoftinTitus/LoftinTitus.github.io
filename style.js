function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('scroll', function() {
  const skillsContainer = document.querySelector('.skills-container');
  const skillsWrapper = document.querySelector('.skills-wrapper');
  
  // Get the bounding rectangle of the skills container
  const rect = skillsContainer.getBoundingClientRect();
  
  // Check if the skills container is in the viewport
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    const scrollY = window.scrollY;
    skillsWrapper.style.transform = `translateX(-${scrollY}px)`;
  } else {
    // Reset the position if the container is out of the viewport
    skillsWrapper.style.transform = 'translateX(0)';
  }
});
