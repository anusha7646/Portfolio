const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');
const contactForm = document.querySelector('#contact-form');

function toggleMobileNavigation() {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNavigation.classList.toggle('is-open', !isOpen);
}

function closeMobileNavigation(event) {
  if (!event.target.closest('a')) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNavigation.classList.remove('is-open');
}

function setFieldError(fieldId, message) {
  const field = document.querySelector(`#${fieldId}`);
  const error = document.querySelector(`#${fieldId}-error`);
  field.closest('.form-field').classList.toggle('has-error', Boolean(message));
  error.textContent = message;
  return !message;
}

function validateContactForm() {
  const name = document.querySelector('#contact-name').value.trim();
  const email = document.querySelector('#contact-email').value.trim();
  const message = document.querySelector('#contact-message').value.trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameIsValid = setFieldError('contact-name', name ? '' : 'Please add your name.');
  const validEmail = setFieldError('contact-email', emailIsValid ? '' : 'Please enter a valid email.');
  const messageIsValid = setFieldError('contact-message', message ? '' : 'Please add a message.');
  return nameIsValid && validEmail && messageIsValid;
}

function handleContactSubmit(event) {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.className = 'form-status';
  if (!validateContactForm()) {
    status.textContent = 'Please check the highlighted fields.';
    status.classList.add('error');
    return;
  }
  status.textContent = 'Thanks for reaching out. This form is front-end only, so please use the social links to contact me directly.';
  status.classList.add('success');
  contactForm.reset();
}

menuToggle.addEventListener('click', toggleMobileNavigation);
primaryNavigation.addEventListener('click', closeMobileNavigation);
contactForm.addEventListener('submit', handleContactSubmit);