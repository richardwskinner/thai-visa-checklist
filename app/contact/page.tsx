"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-[#eef3fb]">

      {/* Center Content */}
      <div className="flex justify-center px-6 py-12">
        <div className="w-full max-w-lg">

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Contact
            </h1>
            <p className="mt-3 text-slate-600">
              Have an idea or need help? We'd love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl bg-white p-8 shadow-lg border border-slate-200"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
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
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {sent && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 text-sm text-center">
                Message sent successfully — I'll reply soon.
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
