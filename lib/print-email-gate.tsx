"use client";

import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const EMAIL_KEY = "thai-visa-checklist:print-email:v1";
const FIRST_NAME_KEY = "thai-visa-checklist:print-first-name:v1";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function PrintLeadModal({
  onCancel,
  onContinue,
}: {
  onCancel: () => void;
  onContinue: (details: { firstName: string; email: string }) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedFirstName) {
      setError("Please enter your first name.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    onContinue({ firstName: trimmedFirstName, email: trimmedEmail });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="z-[100000] w-[calc(100%-2rem)] max-w-md rounded-2xl p-5 print:hidden sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">Before you print</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-slate-600">
            Please enter your details for occasional updates.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <Input
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            autoFocus
          />
          <Input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          <p className={`min-h-5 text-xs text-red-600 ${error ? "opacity-100" : "opacity-0"}`}>{error || "."}</p>
        </div>

        <DialogFooter className="mt-1 flex-row gap-2 sm:justify-start">
          <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={submit}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function showPrintLeadModal(
  onApproved?: (details: { firstName: string; email: string }) => void
): Promise<{ firstName: string; email: string } | null> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(null);
      return;
    }

    const mount = document.createElement("div");
    document.body.appendChild(mount);
    const root = createRoot(mount);

    const close = (details: { firstName: string; email: string } | null) => {
      // Defer unmount to avoid clashing with active React event/render cycles.
      setTimeout(() => {
        root.unmount();
        mount.remove();
      }, 0);
      if (details) onApproved?.(details);
      resolve(details);
    };

    root.render(
      <PrintLeadModal
        onCancel={() => close(null)}
        onContinue={(details) => close(details)}
      />
    );
  });
}

export async function allowPrintWithEmailGate(
  source: string,
  onApproved?: (details: { firstName: string; email: string }) => void
) {
  if (typeof window === "undefined") return false;

  let firstName = localStorage.getItem(FIRST_NAME_KEY);
  let email = localStorage.getItem(EMAIL_KEY);
  let approvedFromModal = false;

  if (!firstName || !email) {
    const details = await showPrintLeadModal((approved) => {
      approvedFromModal = true;
      onApproved?.(approved);
    });
    if (!details) return false;
    firstName = details.firstName;
    email = details.email;
    localStorage.setItem(FIRST_NAME_KEY, firstName);
    localStorage.setItem(EMAIL_KEY, email);
  }

  if (!approvedFromModal) {
    onApproved?.({ firstName, email });
  }

  const sentKey = `thai-visa-checklist:print-email-sent:${source}:${email}`;
  if (!localStorage.getItem(sentKey)) {
    fetch("/api/print-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, email, source }),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.setItem(sentKey, "1");
        }
      })
      .catch(() => {
        // Keep print flow working even if lead endpoint fails.
      });
  }

  return true;
}
