'use strict';

const EMAILJS_PUBLIC_KEY = '73JM40BjXt8SRmZiy';
const EMAILJS_SERVICE_ID = 'service_fw5vzhf';
const EMAILJS_CONTACT_TEMPLATE = 'template_pdgep2i';
const EMAILJS_MEETING_TEMPLATE = 'template_meeting';

const emailJsAvailable = typeof window !== 'undefined' && typeof window.emailjs !== 'undefined';

if (emailJsAvailable) {
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
}

function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-checkmark">
      <i class="fas fa-check"></i>
    </div>
    <p>${message}</p>
  `;

  document.body.appendChild(successDiv);

  requestAnimationFrame(() => {
    successDiv.classList.add('show');
  });

  window.setTimeout(() => {
    successDiv.classList.remove('show');
    window.setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 220);
  }, 3600);
}

function observeRevealElements() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  revealElements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${index * 70}ms`);
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((element) => observer.observe(element));
}

function buildMailtoLink(name, email, message) {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:loftintitus@utexas.edu?subject=${subject}&body=${body}`;
}

function initializeContactForm() {
  const form = document.querySelector('[data-form]');
  const button = document.querySelector('[data-form-btn]');

  if (!form || !button) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const fromName = formData.get('from_name');
    const fromEmail = formData.get('from_email');
    const message = formData.get('message');

    button.setAttribute('disabled', '');
    button.textContent = 'Sending...';

    if (!emailJsAvailable) {
      window.location.href = buildMailtoLink(fromName, fromEmail, message);
      button.textContent = 'Send Message';
      button.removeAttribute('disabled');
      return;
    }

    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE, {
        from_name: fromName,
        from_email: fromEmail,
        message
      });

      form.reset();
      showSuccessMessage('Message sent successfully!');
    } catch (error) {
      window.location.href = buildMailtoLink(fromName, fromEmail, message);
      showSuccessMessage('Email client opened as a fallback.');
    } finally {
      button.textContent = 'Send Message';
      button.removeAttribute('disabled');
    }
  });
}

function formatCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function buildCalendarUrl(startDateTime, endDateTime, meetingName, meetingEmail, meetingMessage) {
  const title = encodeURIComponent(`Meeting with ${meetingName}`);
  const dates = `${formatCalendarDate(startDateTime)}/${formatCalendarDate(endDateTime)}`;
  const details = encodeURIComponent(`Attendee: ${meetingName} (${meetingEmail})\nMessage: ${meetingMessage}`);
  const add = encodeURIComponent(meetingEmail);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&add=${add}`;
}

async function requestMeeting() {
  const meetingDate = document.getElementById('meeting-date');
  const meetingTime = document.getElementById('meeting-time');
  const meetingEmail = document.getElementById('meeting-email');
  const meetingName = document.getElementById('meeting-name');
  const meetingMessage = document.getElementById('meeting-message');
  const meetingButton = document.getElementById('meeting-submit');

  if (!meetingDate || !meetingTime || !meetingEmail || !meetingName || !meetingButton) {
    return;
  }

  if (!meetingDate.value || !meetingTime.value || !meetingEmail.value || !meetingName.value) {
    showSuccessMessage('Please fill in all required meeting details.');
    return;
  }

  const startDateTime = new Date(`${meetingDate.value}T${meetingTime.value}`);

  if (Number.isNaN(startDateTime.getTime())) {
    showSuccessMessage('Please choose a valid meeting date and time.');
    return;
  }

  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  const calendarUrl = buildCalendarUrl(
    startDateTime,
    endDateTime,
    meetingName.value,
    meetingEmail.value,
    meetingMessage ? meetingMessage.value : ''
  );

  const originalText = meetingButton.textContent;
  meetingButton.textContent = 'Scheduling...';
  meetingButton.setAttribute('disabled', '');

  const templateParams = {
    meeting_type: 'Meeting',
    meeting_date: meetingDate.value,
    meeting_time: meetingTime.value,
    attendee_name: meetingName.value,
    attendee_email: meetingEmail.value,
    meeting_message: meetingMessage ? meetingMessage.value : '',
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

  try {
    if (emailJsAvailable) {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_MEETING_TEMPLATE, templateParams);
      showSuccessMessage('Meeting request sent! Google Calendar opened for the event.');
    } else {
      showSuccessMessage('Google Calendar opened for your meeting request.');
    }
  } catch (error) {
    showSuccessMessage('Google Calendar opened. Email notification may not have sent.');
  } finally {
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');

    const meetingForm = document.getElementById('meeting-form');
    if (meetingForm) {
      meetingForm.reset();
    }

    meetingButton.textContent = originalText;
    meetingButton.removeAttribute('disabled');
  }
}

function initializeMeetingForm() {
  const meetingButton = document.getElementById('meeting-submit');

  if (!meetingButton) {
    return;
  }

  meetingButton.addEventListener('click', requestMeeting);
}

document.addEventListener('DOMContentLoaded', () => {
  observeRevealElements();
  initializeContactForm();
  initializeMeetingForm();
});
