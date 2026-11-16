"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { getLeadHubOrigin } from "../lib/leadhub-origin.mjs";
import { getRelatedProducts } from "../lib/related-products.mjs";

const leadHubOrigin = getLeadHubOrigin(process.env.NEXT_PUBLIC_LEADHUB_URL);

export default function LeadCapture() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<Array<{ id: string; name: string; url: string; reason: string }>>([]);
  const [recommendationStatus, setRecommendationStatus] = useState("");

  if (!leadHubOrigin) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const response = await fetch(`${leadHubOrigin}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: "yashrajsharma-portfolio",
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          source: window.location.hostname,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error("Signup failed");
      form.reset();
      setStatus(result.message || "Check your email to confirm your signup.");
    } catch {
      setStatus("Signup is unavailable right now. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  async function requestRecommendations(event: ChangeEvent<HTMLInputElement>) {
    const checkbox = event.currentTarget;
    setRecommendations([]);
    setRecommendationStatus(checkbox.checked ? "Loading suggestions…" : "");
    if (!checkbox.checked) return;
    try {
      const items = await getRelatedProducts(leadHubOrigin, "yashrajsharma-portfolio", true);
      if (checkbox.checked) {
        setRecommendations(items);
        setRecommendationStatus(items.length ? "" : "No related products are available right now.");
      }
    } catch {
      if (checkbox.checked) setRecommendationStatus("Suggestions are unavailable right now.");
    }
  }

  return (
    <section className="lead-capture" aria-labelledby="lead-capture-title">
      <div>
        <p className="eyebrow">Occasional notes</p>
        <h2 id="lead-capture-title">Useful product work, in your inbox.</h2>
        <p>Get occasional notes about shipped projects and practical product engineering. No spam; unsubscribe anytime.</p>
      </div>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="lead-capture-email">Email address</label>
        <input id="lead-capture-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
        <label className="lead-consent"><input name="consent" type="checkbox" required />I agree to receive occasional updates.</label>
        <div className="lead-honeypot" aria-hidden="true"><label htmlFor="lead-capture-website">Leave empty</label><input id="lead-capture-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" disabled={submitting}>{submitting ? "Joining…" : "Get updates"}</button>
        <p className="lead-status" role="status" aria-live="polite">{status}</p>
      </form>
      <div className="lead-recommendations" aria-live="polite">
        <label><input type="checkbox" onChange={requestRecommendations} />Show me relevant products too. No email content or browsing activity is shared.</label>
        {recommendationStatus && <p>{recommendationStatus}</p>}
        {recommendations.length > 0 && <><h3>Our other products</h3><ul>{recommendations.map((item) => <li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a><span> — {item.reason}</span></li>)}</ul></>}
      </div>
    </section>
  );
}
