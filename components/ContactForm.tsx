"use client";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus("Sending your enquiry…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          budget: data.get("budget") || "Not specified",
          details: data.get("details"),
          company: data.get("company")
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your enquiry. Please try again.");
      setStatus("Thanks! Your enquiry has been sent successfully. I'll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <p className="eyebrow">PROJECT ENQUIRY</p>
    <label>Your name<input name="name" required maxLength={100} placeholder="How should I address you?"/></label>
    <label>Work email<input name="email" type="email" required maxLength={254} placeholder="you@company.com"/></label>
    <label>Estimated budget<select name="budget" defaultValue=""><option value="">Select a range</option><option>Under ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000+</option><option>Not sure yet</option></select></label>
    <label>Project details<textarea name="details" rows={4} required maxLength={5000} placeholder="What would you like to build or improve?"/></label>
    <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-10000px",width:"1px",height:"1px"}}/>
    <button className="button primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send enquiry ↗"}</button>
    <small role="status" aria-live="polite">{status || "Your enquiry will be delivered directly to my inbox."}</small>
  </form>;
}
