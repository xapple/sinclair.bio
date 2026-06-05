// Shared async form-submit lifecycle: prevent default, swap submit button
// label to "sending…", POST the form via fetch, hand the response to the
// caller's `mapResponse` callback, then write the resulting text + class on
// the status element and restore the button.
//
// Each caller supplies its own `mapResponse` so it owns the response-shape
// branching (HTTP status codes, JSON fields, redirect handling, etc.) — this
// helper only owns the UI lifecycle that every form on the site shares.

export interface FormResult {
  // Status message to display. Leave empty to clear / hide.
  text: string;
  // Optional technical detail rendered on a second line in a smaller, muted
  // font (e.g. `Failed to fetch` under a friendly "something went wrong").
  detail?: string;
  // Visual variant for the status element. The helper passes this to the
  // caller's `classFor(kind)` to compute the status element's className.
  kind: 'success' | 'error';
  // If set, navigate here instead of writing status (used by login redirect).
  redirect?: string;
  // If set, clear the form after applying status (used on success).
  resetForm?: boolean;
}

export interface AsyncFormOptions {
  // CSS selector for the form. Defaults to the first <form> on the page.
  selector?: string;
  // Selector for the status element. Required.
  statusSelector: string;
  // Resolves the status element's className for a result kind, e.g.
  // `auth-status auth-status--error` (auth) or a Tailwind chain (contact).
  // Owned by the caller so each form keeps its own status styling.
  classFor: (kind: 'success' | 'error') => string;
  // Maps a fetch response to a UI result. Receives the parsed JSON body
  // (`{}` if the body wasn't JSON) and the raw Response.
  mapResponse: (response: Response, data: unknown) => FormResult;
}

export function initAsyncForm(options: AsyncFormOptions): void {
  const form = document.querySelector<HTMLFormElement>(options.selector ?? 'form');
  if (!form) return;

  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = document.querySelector<HTMLElement>(options.statusSelector);
  if (!submitBtn || !status) return;

  // Localized labels ride on the form's data-* attributes (language-agnostic).
  const sending = form.dataset.sending ?? '';
  const errorGeneric = form.dataset.errorGeneric ?? '';
  const { classFor } = options;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = sending;
    submitBtn.disabled = true;
    status.textContent = '';
    status.className = '';

    const applyResult = (result: FormResult) => {
      if (result.redirect) {
        window.location.replace(result.redirect);
        return;
      }
      status.replaceChildren(result.text);
      if (result.detail) {
        const detail = document.createElement('small');
        detail.textContent = result.detail;
        status.appendChild(detail);
      }
      status.className = classFor(result.kind);
      if (result.resetForm) form.reset();
    };

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json().catch(() => ({}));
      applyResult(options.mapResponse(response, data));
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      applyResult({ text: errorGeneric, detail, kind: 'error' });
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
