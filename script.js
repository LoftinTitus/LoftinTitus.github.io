/**
 * =============================================================================
 * PERSONAL PORTFOLIO WEBSITE - MAIN JAVASCRIPT
 * =============================================================================
 * 
 * This file contains all the interactive functionality for the portfolio website
 * including navigation, modals, form handling, email integration, and animations.
 * 
 * Table of Contents:
 * 1. Initialization & Utilities
 * 2. Sidebar Navigation
 * 3. Testimonials Modal System
 * 4. Portfolio Filtering
 * 5. Page Navigation
 * 6. Contact Form & EmailJS Integration
 * 7. Meeting Scheduler
 * 8. Skills Animation
 * 9. Debug & Utilities
 * 
 * Dependencies:
 * - EmailJS for form submissions
 * - Font Awesome for icons
 * 
 * Author: Titus Loftin
 * Last Updated: July 2025
 */

'use strict';

/**
 * =============================================================================
 * 1. INITIALIZATION & UTILITIES
 * =============================================================================
 */

/**
 * Initialize EmailJS with public key for form submissions
 * This enables sending emails directly from the frontend
 */
emailjs.init("73JM40BjXt8SRmZiy");

/**
 * Universal element toggle function
 * Adds or removes the "active" class from any element
 * @param {Element} elem - The DOM element to toggle
 */
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}



/**
 * =============================================================================
 * 2. SIDEBAR NAVIGATION
 * =============================================================================
 * 
 * Handles the collapsible sidebar functionality for mobile devices.
 * The sidebar contains profile information and contact details.
 */

/**
 * Sidebar DOM elements
 * The sidebar can be expanded/collapsed on mobile for better UX
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

/**
 * Sidebar toggle functionality for mobile
 * Expands or collapses the sidebar when the button is clicked
 */
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});



/**
 * =============================================================================
 * 3. TESTIMONIALS MODAL SYSTEM
 * =============================================================================
 * 
 * Creates an interactive modal system for displaying testimonials in full detail.
 * Users can click on testimonial cards to see expanded content in a modal overlay.
 */

/**
 * Testimonials and modal DOM elements
 * These elements work together to create the modal experience
 */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

/**
 * Modal content elements that get populated with testimonial data
 */
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

/**
 * Modal toggle function
 * Shows or hides the testimonial modal with overlay
 */
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

/**
 * Add click event listeners to all testimonial items
 * When clicked, populate modal with testimonial data and show it
 */
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    // Extract data from the clicked testimonial item
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // Show the modal
    testimonialsModalFunc();
  });
}

/**
 * Modal close functionality
 * Users can close the modal by clicking the close button or overlay
 */
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



/**
 * =============================================================================
 * 4. PORTFOLIO FILTERING SYSTEM
 * =============================================================================
 * 
 * Implements a dual filtering system for portfolio projects:
 * - Mobile: Custom dropdown select
 * - Desktop: Button-based filter bar
 * Both systems filter projects by category (e.g., "all", "web design", "applications")
 */

/**
 * Custom select dropdown elements (mobile)
 * Provides a styled dropdown for category selection on mobile devices
 */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

/**
 * Toggle dropdown visibility when select is clicked
 */
select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

/**
 * Handle dropdown item selection
 * Updates the displayed value and triggers filtering
 */
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select); // Close dropdown
    filterFunc(selectedValue); // Apply filter
  });
}

/**
 * Portfolio filter elements
 * All portfolio items that can be filtered
 */
const filterItems = document.querySelectorAll("[data-filter-item]");

/**
 * Core filtering function
 * Shows/hides portfolio items based on selected category
 * @param {string} selectedValue - The category to filter by ("all", "web-design", etc.)
 */
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      // Show all items when "all" is selected
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      // Show items that match the selected category
      filterItems[i].classList.add("active");
    } else {
      // Hide items that don't match
      filterItems[i].classList.remove("active");
    }
  }
}

/**
 * Desktop filter button functionality
 * Handles the button-based filtering system for larger screens
 */
let lastClickedBtn = filterBtn[0]; // Track the currently active button

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText; // Update mobile dropdown display
    filterFunc(selectedValue); // Apply filter

    // Update active state for visual feedback
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


/**
 * =============================================================================
 * 5. PAGE NAVIGATION SYSTEM
 * =============================================================================
 * 
 * Handles single-page application navigation between different sections
 * (About, Resume, Portfolio, Blog, Contact). Updates both the visible content
 * and navigation states.
 */

/**
 * Navigation elements
 * Links in the navbar and corresponding page sections
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

/**
 * Page navigation functionality
 * Switches between different sections of the portfolio
 */
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Loop through all pages and navigation links
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        // Show the selected page and highlight its nav link
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0); // Scroll to top when switching pages
      } else {
        // Hide other pages and remove active state from other nav links
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

/**
 * =============================================================================
 * 6. CONTACT FORM & EMAILJS INTEGRATION
 * =============================================================================
 * 
 * Handles the main contact form with EmailJS integration for sending emails
 * directly from the frontend. Includes form validation, submission handling,
 * and user feedback.
 */

/**
 * Contact form elements
 * Form inputs, submit button, and the form itself
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

/**
 * Success message display function
 * Creates and shows a temporary success notification
 * @param {string} customMessage - Optional custom message to display
 */
function showSuccessMessage(customMessage) {
  const message = customMessage || 'Message sent successfully!';
  
  // Create success message element with checkmark
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-checkmark">
      <i class="fas fa-check"></i>
    </div>
    <p>${message}</p>
  `;
  
  // Add to DOM and animate
  document.body.appendChild(successDiv);
  
  // Show with fade in effect
  setTimeout(() => {
    successDiv.classList.add('show');
  }, 10);
  
  // Auto-hide after delay
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      if (document.body.contains(successDiv)) {
        document.body.removeChild(successDiv);
      }
    }, 300);
  }, customMessage ? 4000 : 3000); // Longer display for custom messages
}

/**
 * Real-time form validation
 * Enables/disables submit button based on form validity
 */
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // Check if all required fields are filled and valid
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

/**
 * Form submission handler with EmailJS
 * Sends form data via email and provides user feedback
 */
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission
  console.log('Form submission started');
  
  // Show loading state
  formBtn.textContent = 'Sending...';
  formBtn.setAttribute("disabled", "");
  
  // Prepare form data for EmailJS
  const formData = new FormData(this);
  const templateParams = {
    from_name: formData.get('from_name'),
    from_email: formData.get('from_email'),
    message: formData.get('message')
  };
  
  console.log('Template params:', templateParams);
  
  // Send email using EmailJS service
  emailjs.send('service_fw5vzhf', 'template_pdgep2i', templateParams)
    .then(function(response) {
      console.log('EmailJS Success:', response);
      console.log('About to show success message');
      
      // Show success confirmation
      showSuccessMessage();
      
      // Reset form to initial state
      form.reset();
      formBtn.textContent = 'Send Message';
      formBtn.removeAttribute("disabled");
      
    }, function(error) {
      console.error('EmailJS Error:', error);
      
      // Show error state
      formBtn.textContent = 'Failed to Send';
      
      // Reset button after delay
      setTimeout(() => {
        formBtn.textContent = 'Send Message';
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        }
      }, 3000);
    });
});

/**
 * =============================================================================
 * 7. MEETING SCHEDULER SYSTEM
 * =============================================================================
 * 
 * Advanced meeting scheduling system that:
 * - Validates meeting details
 * - Sends email notifications via EmailJS
 * - Creates Google Calendar events
 * - Provides comprehensive user feedback
 */

/**
 * Meeting request function
 * Handles the complete meeting scheduling workflow
 */
function requestMeeting() {
    // Collect all meeting details from form inputs
    const meetingType = document.getElementById('meeting-type').value;
    const meetingDate = document.getElementById('meeting-date').value;
    const meetingTime = document.getElementById('meeting-time').value;
    const meetingEmail = document.getElementById('meeting-email').value;
    const meetingName = document.getElementById('meeting-name').value;
    const meetingMessage = document.getElementById('meeting-message').value || '';
    
    // Validate required fields
    if (!meetingType || !meetingDate || !meetingTime || !meetingEmail || !meetingName) {
        alert('Please fill in all required meeting details');
        return;
    }
    
    // Update button state to show loading
    const meetingBtn = document.querySelector('.meeting-scheduler-section button');
    const originalText = meetingBtn.textContent;
    meetingBtn.textContent = 'Scheduling...';
    meetingBtn.setAttribute("disabled", "");
    
    // Create meeting date/time objects
    const startDateTime = new Date(`${meetingDate}T${meetingTime}`);
    const endDateTime = new Date(startDateTime.getTime() + (60 * 60000)); // 1 hour duration
    
    /**
     * Format date for Google Calendar URL
     * Converts date to the required format: YYYYMMDDTHHMMSSZ
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    // Generate Google Calendar event URL with all meeting details
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingType + ' Meeting with ' + meetingName)}&dates=${formatDate(startDateTime)}/${formatDate(endDateTime)}&details=${encodeURIComponent('Meeting Type: ' + meetingType + '\nAttendee: ' + meetingName + ' (' + meetingEmail + ')\nMessage: ' + meetingMessage)}&add=${encodeURIComponent(meetingEmail)}`;
    
    // Prepare email template parameters for EmailJS
    const templateParams = {
        meeting_type: meetingType,
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        attendee_name: meetingName,
        attendee_email: meetingEmail,
        meeting_message: meetingMessage,
        calendar_link: calendarUrl,
        // Format date and time for better readability in email
        formatted_date: startDateTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        formatted_time: startDateTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    };
    
    // Send meeting request email via EmailJS
    emailjs.send('service_fw5vzhf', 'template_meeting', templateParams)
        .then(function(response) {
            console.log('Meeting email sent successfully:', response);
            
            // Open Google Calendar in new tab for event creation
            window.open(calendarUrl, '_blank');
            
            // Show success message
            showSuccessMessage('Meeting request sent! Google Calendar opened - please add the event.');
            
            // Reset all form fields
            document.getElementById('meeting-type').value = '';
            document.getElementById('meeting-date').value = '';
            document.getElementById('meeting-time').value = '';
            document.getElementById('meeting-email').value = '';
            document.getElementById('meeting-name').value = '';
            if (document.getElementById('meeting-message')) {
                document.getElementById('meeting-message').value = '';
            }
            
            // Reset button to original state
            meetingBtn.textContent = originalText;
            meetingBtn.removeAttribute("disabled");
            
        }, function(error) {
            console.error('Failed to send meeting email:', error);
            
            // Even if email fails, still provide calendar functionality
            window.open(calendarUrl, '_blank');
            
            // Show partial success message
            showSuccessMessage('Google Calendar opened. Email notification may have failed - please mention this when we meet.');
            
            // Show error state temporarily
            meetingBtn.textContent = 'Failed to Send Email';
            setTimeout(() => {
                meetingBtn.textContent = originalText;
                meetingBtn.removeAttribute("disabled");
            }, 3000);
        });
}

// Skills continuous sliding animation - SIMPLIFIED
function initSkillsAnimation() {
  const skillsList = document.querySelector('.skills-list');
  
  if (!skillsList) {
    console.log('Skills list not found');
    return;
  }

  // Get all original skills
  const originalSkills = skillsList.innerHTML;
  
  // Duplicate the skills for seamless loop
  skillsList.innerHTML = originalSkills + originalSkills;
  
  console.log('Skills animation initialized');
}

// Initialize immediately when called
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for the page to fully load
  setTimeout(initSkillsAnimation, 500);
});

// Also try to initialize on window load as backup
window.addEventListener('load', function() {
  setTimeout(initSkillsAnimation, 100);
});

console.log('=== BASIC DEBUG TEST ===');
console.log('Current page:', window.location.href);
console.log('Document ready state:', document.readyState);

setTimeout(() => {
  console.log('=== AFTER 2 SECONDS ===');
  console.log('Skill section exists:', !!document.querySelector('.skill'));
  console.log('Skills list exists:', !!document.querySelector('.skills-list'));
  
  const skillsList = document.querySelector('.skills-list');
  if (skillsList) {
    console.log('Skills list children:', skillsList.children.length);
    console.log('Skills list scroll width:', skillsList.scrollWidth);
    console.log('Skills list client width:', skillsList.clientWidth);
    console.log('Can scroll horizontally:', skillsList.scrollWidth > skillsList.clientWidth);
  }
}, 2000);