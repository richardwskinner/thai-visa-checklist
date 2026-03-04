"use client";

import Image from "next/image";
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
      <div className="flex justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Contact
            </h1>
            <p className="mt-3 text-slate-600">
              Have a suggestion or need help? Get in touch!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
          >
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <div className="order-2 space-y-6 md:order-1">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
              </div>

              <div className="order-1 flex justify-center md:order-2 md:justify-end md:pt-2">
                <Image
                  src="/images/mail-box.png"
                  alt="Traditional red Thai post box"
                  width={170}
                  height={285}
                  className="h-auto w-[160px] md:h-[360px] md:w-auto"
                  priority
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 font-semibold text-white shadow-md transition hover:from-sky-600 hover:to-blue-700 hover:shadow-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {sent && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
                  Message sent successfully - We&apos;ll reply soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
