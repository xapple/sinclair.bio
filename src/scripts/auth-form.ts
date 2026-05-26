// Wires the login / forgot-password forms: async submit to the action URL,
// button state, localized status message, and (on a successful login) a
// redirect to the URL the backend returns. Localized strings come from
// data-* attributes on the form so this script stays language-agnostic.
export function initAuthForm(selector = '.auth-form'): void {
  const form = document.querySelector<HTMLFormElement>(selector);
  if (!form) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLSpanElement>('[data-auth-status]');
  if (!submitBtn || !status) return;

  const {
    sending,
    successOk,
    errorInvalidCredentials,
    errorGeneric,
  } = form.dataset;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    if (sending) submitBtn.textContent = sending;
    submitBtn.disabled = true;
    status.textContent = '';
    status.className = 'auth-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && typeof data.redirect === 'string') {
        window.location.replace(data.redirect);
        return;
      }
      if (response.ok && data.status === 'ok') {
        status.textContent = successOk ?? '';
        status.classList.add('auth-status--success');
        form.reset();
      } else if (response.status === 401 && data.error === 'invalid_credentials') {
        status.textContent = errorInvalidCredentials ?? '';
        status.classList.add('auth-status--error');
      } else {
        status.textContent = errorGeneric ?? '';
        status.classList.add('auth-status--error');
      }
    } catch {
      status.textContent = errorGeneric ?? '';
      status.classList.add('auth-status--error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
