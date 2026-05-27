// Wires the login / forgot-password forms. The async submit / button-state /
// status-element lifecycle lives in scripts/async-form.ts; this module just
// supplies the response-shape mapping (redirect, 401, 429, etc.).
import { initAsyncForm } from './async-form';

export function initAuthForm(selector = '.auth-form'): void {
  const form = document.querySelector<HTMLFormElement>(selector);
  if (!form) return;

  const {
    successOk,
    errorInvalidCredentials,
    errorRateLimited,
    errorGeneric,
  } = form.dataset;

  initAsyncForm({
    selector,
    statusSelector: '[data-auth-status]',
    statusBaseClass: 'auth-status',
    mapResponse(response, data) {
      const body = data as { redirect?: unknown; status?: unknown; error?: unknown };

      if (response.ok && typeof body.redirect === 'string') {
        return { text: '', kind: 'success', redirect: body.redirect };
      }
      if (response.ok && body.status === 'ok') {
        return { text: successOk ?? '', kind: 'success', resetForm: true };
      }
      if (response.status === 401 && body.error === 'invalid_credentials') {
        return { text: errorInvalidCredentials ?? '', kind: 'error' };
      }
      if (response.status === 429) {
        return { text: errorRateLimited ?? '', kind: 'error' };
      }
      return { text: errorGeneric ?? '', kind: 'error' };
    },
  });
}
