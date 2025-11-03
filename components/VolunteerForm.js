'use client';

import { useState } from 'react';
import Button from './Button';

export default function VolunteerForm({ email, subject }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      form.reset();
      setStatus('success');
      setMessage('Thank you! We will follow up within 2-3 business days.');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('We could not send your form. Please email us directly.');
    }
  }

  return (
    <form
      onSubmit={(event) => {
        const form = event.currentTarget;
        if (!form.reportValidity()) {
          event.preventDefault();
          return;
        }
        handleSubmit(event);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm text-ink/70">
          <span className="font-semibold text-ink">Full name</span>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
          />
        </label>
        <label className="space-y-1 text-sm text-ink/70">
          <span className="font-semibold text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
          />
        </label>
      </div>
      <label className="space-y-1 text-sm text-ink/70">
        <span className="font-semibold text-ink">Preferred volunteer role</span>
        <input
          type="text"
          name="interest"
          placeholder="Pantry assistant, driver, etc."
          required
          className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
        />
      </label>
      <label className="space-y-1 text-sm text-ink/70">
        <span className="font-semibold text-ink">Availability</span>
        <textarea
          name="availability"
          rows={4}
          required
          className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
        />
      </label>
      <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Submit interest'}
      </Button>
      <p className="text-sm text-ink/70">
        Prefer email?{' '}
        <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`} className="font-semibold text-primary">
          Contact us
        </a>
        .
      </p>
      {status !== 'idle' ? (
        <p
          role="status"
          className={`rounded-lg px-4 py-3 text-sm ${
            status === 'success'
              ? 'bg-accent/10 text-accent'
              : status === 'error'
              ? 'bg-primary/10 text-primary'
              : 'text-ink/60'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
