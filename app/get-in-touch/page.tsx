"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      }),
    });

    setLoading(false);
    setSent(true);
    form.reset();
  }

  return (
    <div className="min-h-screen bg-[#eef3fb] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Get in Touch
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Have an idea or need help? we’d love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-md border border-slate-200"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Name
            </label>
            <input
              name="name"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {sent && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-green-700 text-sm text-center">
              Message sent successfully — I’ll reply soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
