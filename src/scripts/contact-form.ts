// Wires the home-page contact form: async submit to the action URL, button
// state, and status message. Localized strings come from data-* attributes on
// the form (so this script stays language-agnostic).
export function initContactForm(selector = '#contact-form'): void {
  const form = document.querySelector<HTMLFormElement>(selector);
  if (!form) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLSpanElement>('[data-contact-status]');
  if (!submitBtn || !status) return;

  const { sending, sent, error, errorGeneric } = form.dataset;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = sending ?? '';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json();

      if (response.ok) {
        status.textContent = sent ?? '';
        status.className = 'text-sm text-green-600 dark:text-green-400';
        form.reset();
      } else {
        status.textContent = (error ?? '').replace('%s', data.message);
        status.className = 'text-sm text-red-500';
      }
    } catch {
      status.textContent = errorGeneric ?? '';
      status.className = 'text-sm text-red-500';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
