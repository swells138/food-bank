'use client';

import { useState } from 'react';
import Button from './Button';

export default function ContactForm({ email, subject }) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks for reaching out! We will respond within two business days.');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('We could not send your message. Please email or call us.');
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
        <span className="font-semibold text-ink">Email address</span>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
        />
      </label>
      <label className="space-y-1 text-sm text-ink/70">
        <span className="font-semibold text-ink">Subject</span>
        <input
          type="text"
          name="subject"
          defaultValue={subject}
          className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
        />
      </label>
      <label className="space-y-1 text-sm text-ink/70">
        <span className="font-semibold text-ink">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-ink/15 bg-surface px-4 py-3 text-sm shadow-sm"
        />
      </label>
      <Button type="submit" className="w-full sm:w-auto" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
      <p className="text-sm text-ink/70">
        Prefer email?{' '}
        <a href={`mailto:${email}`} className="font-semibold text-primary">
          {email}
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
