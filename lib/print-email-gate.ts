const EMAIL_KEY = "thai-visa-checklist:print-email:v1";
const FIRST_NAME_KEY = "thai-visa-checklist:print-first-name:v1";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showPrintLeadModal(
  onApproved?: (details: { firstName: string; email: string }) => void
): Promise<{ firstName: string; email: string } | null> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve(null);
      return;
    }

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(15, 23, 42, 0.55)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "99999";
    overlay.style.padding = "16px";

    const modal = document.createElement("div");
    modal.style.width = "100%";
    modal.style.maxWidth = "460px";
    modal.style.background = "#ffffff";
    modal.style.borderRadius = "16px";
    modal.style.border = "1px solid #dbe2f0";
    modal.style.boxShadow = "0 20px 40px rgba(15, 23, 42, 0.22)";
    modal.style.padding = "20px";

    const title = document.createElement("h3");
    title.textContent = "Before you print";
    title.style.margin = "0 0 8px 0";
    title.style.fontSize = "20px";
    title.style.fontWeight = "700";
    title.style.color = "#0f172a";

    const description = document.createElement("p");
    description.textContent =
      "Glad you're finding our checklist useful. Please enter your details for occasional updates.";
    description.style.margin = "0 0 16px 0";
    description.style.fontSize = "14px";
    description.style.lineHeight = "1.5";
    description.style.color = "#334155";

    const form = document.createElement("form");
    form.style.display = "grid";
    form.style.gap = "10px";

    const firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.placeholder = "First name";
    firstNameInput.required = true;
    firstNameInput.style.width = "100%";
    firstNameInput.style.border = "1px solid #cbd5e1";
    firstNameInput.style.borderRadius = "10px";
    firstNameInput.style.padding = "10px 12px";
    firstNameInput.style.fontSize = "15px";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email address";
    emailInput.required = true;
    emailInput.style.width = "100%";
    emailInput.style.border = "1px solid #cbd5e1";
    emailInput.style.borderRadius = "10px";
    emailInput.style.padding = "10px 12px";
    emailInput.style.fontSize = "15px";

    const error = document.createElement("p");
    error.style.margin = "2px 0 0 0";
    error.style.minHeight = "18px";
    error.style.fontSize = "13px";
    error.style.color = "#dc2626";
    error.style.display = "none";

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "10px";
    actions.style.marginTop = "6px";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.style.flex = "1";
    cancelButton.style.height = "42px";
    cancelButton.style.borderRadius = "10px";
    cancelButton.style.border = "1px solid #cbd5e1";
    cancelButton.style.background = "#f8fafc";
    cancelButton.style.color = "#334155";
    cancelButton.style.fontWeight = "600";
    cancelButton.style.cursor = "pointer";

    const continueButton = document.createElement("button");
    continueButton.type = "submit";
    continueButton.textContent = "Continue";
    continueButton.style.flex = "1";
    continueButton.style.height = "42px";
    continueButton.style.borderRadius = "10px";
    continueButton.style.border = "1px solid #1d4ed8";
    continueButton.style.background = "#2563eb";
    continueButton.style.color = "#ffffff";
    continueButton.style.fontWeight = "700";
    continueButton.style.cursor = "pointer";

    actions.append(cancelButton, continueButton);
    form.append(firstNameInput, emailInput, error, actions);
    modal.append(title, description, form);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const cleanup = () => {
      overlay.remove();
    };

    cancelButton.onclick = () => {
      cleanup();
      resolve(null);
    };

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        cleanup();
        resolve(null);
      }
    });

    form.onsubmit = (event) => {
      event.preventDefault();
      const firstName = firstNameInput.value.trim();
      const email = emailInput.value.trim().toLowerCase();

      if (!firstName) {
        error.textContent = "Please enter your first name.";
        error.style.display = "block";
        return;
      }

      if (!isValidEmail(email)) {
        error.textContent = "Please enter a valid email address.";
        error.style.display = "block";
        return;
      }

      cleanup();
      onApproved?.({ firstName, email });
      resolve({ firstName, email });
    };

    firstNameInput.focus();
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
