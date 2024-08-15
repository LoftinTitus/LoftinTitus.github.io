function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('scroll', function() {
  const skillsContainer = document.querySelector('.skills-container');
  const skillsWrapper = document.querySelector('.skills-wrapper');
  
  // Check if both elements are found
  if (skillsContainer && skillsWrapper) {
    const rect = skillsContainer.getBoundingClientRect();
    
    // Check if the skills container is in the viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate how far the user has scrolled
      const scrollX = window.scrollY;
      
      // Apply translation based on scroll amount
      skillsWrapper.style.transform = `translateX(-${scrollX}px)`;
      
      // Ensure that the translation value wraps around correctly
      skillsWrapper.style.whiteSpace = 'nowrap'; 
    } else {
      // Reset the position if the container is out of the viewport
      skillsWrapper.style.transform = 'translateX(0)';
    }
  }
});
