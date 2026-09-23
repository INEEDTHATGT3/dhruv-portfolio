"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <button type="button" onClick={copy} className="btn btn-ghost">
      {state === "copied" ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Couldn't copy — select it instead" : "Copy email"}
      </span>
    </button>
  );
}
