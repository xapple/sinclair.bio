// Wires the home-page contact form. The async submit / button-state / status
// lifecycle lives in scripts/async-form.ts; this module just supplies the
// response-shape mapping and the Tailwind status classes.
import { initAsyncForm } from './async-form';

const STATUS_CLASS: Record<'success' | 'error', string> = {
  success: 'text-sm text-green-600 dark:text-green-400',
  error: 'text-sm text-red-500',
};

export function initContactForm(selector = '#contact-form'): void {
  const form = document.querySelector<HTMLFormElement>(selector);
  if (!form) return;

  const { sent, error, errorGeneric } = form.dataset;

  initAsyncForm({
    selector,
    statusSelector: '[data-contact-status]',
    classFor: (kind) => STATUS_CLASS[kind],
    mapResponse(response, data) {
      if (response.ok) {
        return { text: sent ?? '', kind: 'success', resetForm: true };
      }
      const body = data as { message?: unknown };
      const msg = typeof body.message === 'string' ? body.message : '';
      return { text: (error ?? '').replace('%s', msg) || (errorGeneric ?? ''), kind: 'error' };
    },
  });
}
