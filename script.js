'use strict';
emailjs.init("73JM40BjXt8SRmZiy");


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Function to show success message
function showSuccessMessage() {
  // Create success message element
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-checkmark">
      <i class="fas fa-check"></i>
    </div>
    <p>Message sent successfully!</p>
  `;
  
  // Add to body
  document.body.appendChild(successDiv);
  
  // Show with fade in
  setTimeout(() => {
    successDiv.classList.add('show');
  }, 10);
  
  // Hide and remove after 3 seconds
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 3000);
}

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Add form submission handler
form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('Form submission started');
  
  // Show loading state
  formBtn.textContent = 'Sending...';
  formBtn.setAttribute("disabled", "");
  
  // Get form data
  const formData = new FormData(this);
  const templateParams = {
    from_name: formData.get('from_name'),
    from_email: formData.get('from_email'),
    message: formData.get('message')
  };
  
  console.log('Template params:', templateParams);
  
  // Send email using EmailJS
  emailjs.send('service_fw5vzhf', 'template_pdgep2i', templateParams)
    .then(function(response) {
      console.log('EmailJS Success:', response);
      console.log('About to show success message');
      
      // Show success confirmation
      showSuccessMessage();
      
      // Reset form
      form.reset();
      formBtn.textContent = 'Send Message';
      formBtn.removeAttribute("disabled");
      
    }, function(error) {
      console.error('EmailJS Error:', error);
      formBtn.textContent = 'Failed to Send';
      
      setTimeout(() => {
        formBtn.textContent = 'Send Message';
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        }
      }, 3000);
    });
});

function requestMeeting() {
    const meetingType = document.getElementById('meeting-type').value;
    const meetingDate = document.getElementById('meeting-date').value;
    const meetingTime = document.getElementById('meeting-time').value;
    const meetingEmail = document.getElementById('meeting-email').value; // Add email field
    const meetingName = document.getElementById('meeting-name').value; // Add name field
    const meetingMessage = document.getElementById('meeting-message').value || ''; // Add message field
    
    if (!meetingType || !meetingDate || !meetingTime || !meetingEmail || !meetingName) {
        alert('Please fill in all required meeting details');
        return;
    }
    
    // Show loading state
    const meetingBtn = document.querySelector('.meeting-scheduler-section button');
    const originalText = meetingBtn.textContent;
    meetingBtn.textContent = 'Scheduling...';
    meetingBtn.setAttribute("disabled", "");
    
    // Create Google Calendar event URL
    const startDateTime = new Date(`${meetingDate}T${meetingTime}`);
    const endDateTime = new Date(startDateTime.getTime() + (60 * 60000)); // 1 hour later
    
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meetingType + ' Meeting with ' + meetingName)}&dates=${formatDate(startDateTime)}/${formatDate(endDateTime)}&details=${encodeURIComponent('Meeting Type: ' + meetingType + '\nAttendee: ' + meetingName + ' (' + meetingEmail + ')\nMessage: ' + meetingMessage)}&add=${encodeURIComponent(meetingEmail)}`;
    
    // Prepare EmailJS template parameters
    const templateParams = {
        meeting_type: meetingType,
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        attendee_name: meetingName,
        attendee_email: meetingEmail,
        meeting_message: meetingMessage,
        calendar_link: calendarUrl,
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
    emailjs.send('service_fw5vzhf', 'template_meeting', templateParams) // You'll need to create this template
        .then(function(response) {
            console.log('Meeting email sent successfully:', response);
            
            // Open Google Calendar in new tab
            window.open(calendarUrl, '_blank');
            
            // Show success message
            showSuccessMessage('Meeting request sent! Google Calendar opened - please add the event.');
            
            // Reset form
            document.getElementById('meeting-type').value = '';
            document.getElementById('meeting-date').value = '';
            document.getElementById('meeting-time').value = '';
            document.getElementById('meeting-email').value = '';
            document.getElementById('meeting-name').value = '';
            if (document.getElementById('meeting-message')) {
                document.getElementById('meeting-message').value = '';
            }
            
            // Reset button
            meetingBtn.textContent = originalText;
            meetingBtn.removeAttribute("disabled");
            
        }, function(error) {
            console.error('Failed to send meeting email:', error);
            
            // Still open calendar even if email fails
            window.open(calendarUrl, '_blank');
            
            // Show partial success message
            showSuccessMessage('Google Calendar opened. Email notification may have failed - please mention this when we meet.');
            
            // Reset button
            meetingBtn.textContent = 'Failed to Send Email';
            setTimeout(() => {
                meetingBtn.textContent = originalText;
                meetingBtn.removeAttribute("disabled");
            }, 3000);
        });
}

// Enhanced success message function to handle custom messages
function showSuccessMessage(customMessage) {
    const message = customMessage || 'Message sent successfully!';
    
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-checkmark">
            <i class="fas fa-check"></i>
        </div>
        <p>${message}</p>
    `;
    
    // Add to body
    document.body.appendChild(successDiv);
    
    // Show with fade in
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 10);
    
    // Hide and remove after 4 seconds (longer for meeting messages)
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 4000);
}

// Skills continuous sliding animation - UPDATED
function initSkillsAnimation() {
  const skillsSection = document.querySelector('.skills');
  const skillsList = document.querySelector('.skills-list');
  
  if (!skillsSection || !skillsList) {
    console.log('Skills elements not found');
    return;
  }

  // Duplicate skills for seamless loop
  const skillsItems = Array.from(skillsList.children);
  skillsItems.forEach(item => {
    const clone = item.cloneNode(true);
    skillsList.appendChild(clone);
  });

  // Intersection Observer to control animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(skillsSection);
}

// Initialize when DOM is ready
function initializeSkillsWhenReady() {
  const checkAndInit = () => {
    if (document.querySelector('.skills') && document.querySelector('.skills-list')) {
      initSkillsAnimation();
    } else {
      setTimeout(checkAndInit, 100);
    }
  };
  
  checkAndInit();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSkillsWhenReady);
} else {
  initializeSkillsWhenReady();
}

window.addEventListener('load', initializeSkillsWhenReady);

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