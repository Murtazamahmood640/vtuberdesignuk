// Contact Form Handler — VTuber Design UK
// Intercepts all .banner-form-val forms and POSTs to /api/contact via fetch

(function () {
  function initForms() {
    const forms = document.querySelectorAll('form.banner-form-val');
    forms.forEach(function (form) {
      // Avoid double-binding
      if (form.dataset.contactBound) return;
      form.dataset.contactBound = 'true';

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('[type="submit"]');
        const originalVal = submitBtn ? submitBtn.value : '';

        // Basic client-side validation
        const name = (form.querySelector('[name="name"]') || {}).value || '';
        const email = (form.querySelector('[name="email"]') || {}).value || '';
        const phone = (form.querySelector('[name="phone"]') || {}).value || '';
        const message = (form.querySelector('[name="message"]') || {}).value || '';
        const service = (form.querySelector('[name="service"]') || {}).value || '';
        const budget = (form.querySelector('[name="budget"]') || {}).value || '';
        const website = (form.querySelector('[name="website"]') || {}).value || '';

        if (!name.trim() || !email.trim() || !message.trim()) {
          showFormMsg(form, 'Please fill in all required fields.', false);
          return;
        }

        // Disable button, show loading
        if (submitBtn) { submitBtn.value = 'Sending…'; submitBtn.disabled = true; }

        // Determine endpoint — works on Vercel and local HTTP servers
        const endpoint = '/api/contact';

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, service, budget, website }),
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data.success) {
              showFormMsg(form, data.message || 'Message sent! We\'ll be in touch shortly.', true);
              form.reset();
            } else {
              showFormMsg(form, data.message || 'Something went wrong. Please try again.', false);
            }
          })
          .catch(function () {
            showFormMsg(form, 'Network error. Please email us at support@vtuberdesign.co.uk', false);
          })
          .finally(function () {
            if (submitBtn) { submitBtn.value = originalVal; submitBtn.disabled = false; }
          });
      });
    });
  }

  function showFormMsg(form, msg, success) {
    // Remove any existing msg
    var old = form.querySelector('.form-submit-msg');
    if (old) old.remove();

    var div = document.createElement('div');
    div.className = 'form-submit-msg';
    div.style.cssText = [
      'margin-top: 12px',
      'padding: 12px 18px',
      'border-radius: 6px',
      'font-size: 15px',
      'font-weight: 600',
      'text-align: center',
      success
        ? 'background:#1a4731;color:#4ade80;border:1px solid #4ade80;'
        : 'background:#4a1a1a;color:#f87171;border:1px solid #f87171;',
    ].join(';');
    div.textContent = msg;
    form.appendChild(div);

    // Auto-hide after 6 seconds on success
    if (success) {
      setTimeout(function () { div.remove(); }, 6000);
    }
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();
