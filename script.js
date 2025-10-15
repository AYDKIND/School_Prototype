document.addEventListener('DOMContentLoaded', function () {
  // set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', function () {
    const visible = mainNav.getAttribute('data-visible') === 'true';
    mainNav.setAttribute('data-visible', String(!visible));
    navToggle.setAttribute('aria-expanded', String(!visible));
  });
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      // ignore links that are only toggles/buttons with no target
      const target = this.getAttribute('href');
      if (target && target.length > 1) {
        e.preventDefault();
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav after clicking
        if (mainNav.getAttribute('data-visible') === 'true') {
          mainNav.setAttribute('data-visible', 'false');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Contact form - basic validation and simulated submit
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    // simple validation
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    if (!name || !email || !message) {
      alert('Please fill all contact form fields.');
      return;
    }
    alert(`Thank you! Your message has been received. `);
    form.reset();
  });

  // Admissions modal
  const openAdmissionForm = document.getElementById('openAdmissionForm');
  const admissionModal = document.getElementById('admissionModal');
  const closeAdmissionModal = document.getElementById('closeAdmissionModal');
  const cancelAdmission = document.getElementById('cancelAdmission');

  function showModal() {
    admissionModal?.setAttribute('aria-hidden', 'false');
  }
  function hideModal() {
    admissionModal?.setAttribute('aria-hidden', 'true');
  }

  openAdmissionForm?.addEventListener('click', showModal);
  closeAdmissionModal?.addEventListener('click', hideModal);
  cancelAdmission?.addEventListener('click', hideModal);

  // Admission form handling
  const admissionForm = document.getElementById('admissionForm');
  admissionForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const cls = form.querySelector('input[name="class"]').value.trim();
    const contact = form.querySelector('input[name="contact"]').value.trim();
    if (!name || !cls || !contact) {
      alert(`Please complete all fields in the admission form.`);
      return;
    }
    // simulate submit for prototype
    alert(`Application received. We will contact you shortly.`);
    form.reset();
    hideModal();
  });

  // close modal on outside click
  admissionModal?.addEventListener('click', function (evt) {
    if (evt.target === admissionModal) hideModal();
  });

});
