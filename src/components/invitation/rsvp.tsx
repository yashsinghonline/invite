"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/invitation";
import { Ornament } from "./ornament";

type SubmitState = "idle" | "submitting" | "done" | "error";

export function Rsvp() {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [counts, setCounts] = useState({ guests: 1, family: 0, kids: 0 });
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const toggleEvent = (id: string) => {
    setSelectedEvents((cur) => (cur.includes(id) ? cur.filter((e) => e !== id) : [...cur, id]));
  };

  const canSubmit = attending !== null && name.trim().length > 1 && state !== "submitting";

  const STORAGE_KEY = "km-rsvp-vijay-rashmika";

  // Restore a previous response from this device (purely client-side).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { guestName?: string; attending?: boolean };
      if (typeof saved.guestName === "string" && typeof saved.attending === "boolean") {
        setName(saved.guestName);
        setAttending(saved.attending);
        setState("done");
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || attending === null) return;
    setState("submitting");
    setError("");
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          guestName: name.trim(),
          attending,
          events: selectedEvents,
          message: message.trim() || null,
          counts,
          respondedAt: new Date().toISOString(),
        }),
      );
    } catch {
      /* storage unavailable (private mode) — still show confirmation */
    }
    window.setTimeout(() => setState("done"), 650);
  };

  const resetResponse = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState("idle");
    setAttending(null);
    setSelectedEvents([]);
    setMessage("");
  };

  if (state === "done") {
    return (
      <section className="km-rsvp km-section" aria-label="RSVP">
        <div className="km-rsvp__silk" aria-hidden="true" />
        <div className="km-frame" aria-hidden="true">
          <div className="km-frame-rail km-frame-rail--top" />
          <div className="km-frame-rail km-frame-rail--bottom" />
          <div className="km-frame-rail km-frame-rail--left" />
          <div className="km-frame-rail km-frame-rail--right" />
          <div className="km-frame-corner km-frame-corner--tl" />
          <div className="km-frame-corner km-frame-corner--tr" />
          <div className="km-frame-corner km-frame-corner--bl" />
          <div className="km-frame-corner km-frame-corner--br" />
        </div>
        <div className="km-container">
          <div className="km-rsvp__done">
            <img className="km-rsvp__rule" src="/assets/kalyana-mandapam/gold-divider.webp" alt="" aria-hidden="true" />
            <h2 className="km-rsvp__done-title km-font-script">
              {attending ? "Thank You!" : "We'll Miss You"}
            </h2>
            <p className="km-rsvp__done-body km-font-serif">
              {attending
                ? `Your blessings mean the world to us, ${name.trim()}. We look forward to celebrating together!`
                : `We're grateful you took the time to respond, ${name.trim()}. You'll be in our hearts.`}
            </p>
            <button type="button" className="km-rsvp__change km-font-label" onClick={resetResponse}>
              Change response
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="km-rsvp km-section" aria-label="RSVP">
      <div className="km-rsvp__silk" aria-hidden="true" />
      <div className="km-frame" aria-hidden="true">
        <div className="km-frame-rail km-frame-rail--top" />
        <div className="km-frame-rail km-frame-rail--bottom" />
        <div className="km-frame-rail km-frame-rail--left" />
        <div className="km-frame-rail km-frame-rail--right" />
        <div className="km-frame-corner km-frame-corner--tl" />
        <div className="km-frame-corner km-frame-corner--tr" />
        <div className="km-frame-corner km-frame-corner--bl" />
        <div className="km-frame-corner km-frame-corner--br" />
      </div>
      <div className="km-container">
        <h2 className="km-rsvp__heading km-font-script" data-reveal="up">
          Bless Us With Your Presence
        </h2>
        <Ornament />
        <p className="km-rsvp__sub km-font-serif" data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
          Let us know if you can join us, so we may keep a place for you.
        </p>
        <form className="km-rsvp__slip" noValidate onSubmit={handleSubmit} data-reveal="bloom" style={{ ["--d" as string]: "260ms" }}>
          <p className="km-rsvp__by km-font-label">Kindly respond by 10th October 2026</p>
          <div className="km-rsvp__choices" role="group" aria-label="Will you join us?">
            <button
              type="button"
              className={`km-rsvp__choice ${attending === true ? "is-on" : ""}`}
              aria-pressed={attending === true}
              onClick={() => setAttending(true)}
            >
              <svg className="km-rsvp__marker" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1 L15 8 L8 15 L1 8 Z" fill="none" stroke="var(--km-gold)" strokeWidth="1.2" />
              </svg>
              <span>With joy, we will be there</span>
            </button>
            <button
              type="button"
              className={`km-rsvp__choice ${attending === false ? "is-on" : ""}`}
              aria-pressed={attending === false}
              onClick={() => setAttending(false)}
            >
              <svg className="km-rsvp__marker" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 1 L15 8 L8 15 L1 8 Z" fill="none" stroke="var(--km-gold)" strokeWidth="1.2" />
              </svg>
              <span>With regret, we cannot</span>
            </button>
          </div>

          {attending !== null && (
            <div className="km-rsvp__field">
              <div className="km-rsvp__row">
                <span className="km-rsvp__tag km-font-label">Name</span>
                <input
                  className="km-rsvp__input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {attending && (
                <>
                  <div className="km-rsvp__counts">
                    <div className="km-rsvp__row">
                      <span className="km-rsvp__tag km-font-label">Guests</span>
                      <input
                        className="km-rsvp__input"
                        type="number"
                        min={1}
                        max={10}
                        value={counts.guests}
                        onChange={(e) => setCounts((c) => ({ ...c, guests: Math.max(1, Number(e.target.value) || 1) }))}
                      />
                    </div>
                    <div className="km-rsvp__row">
                      <span className="km-rsvp__tag km-font-label">Kids</span>
                      <input
                        className="km-rsvp__input"
                        type="number"
                        min={0}
                        max={10}
                        value={counts.kids}
                        onChange={(e) => setCounts((c) => ({ ...c, kids: Math.max(0, Number(e.target.value) || 0) }))}
                      />
                    </div>
                  </div>

                  <div className="km-rsvp__events">
                    {events.map((event) => (
                      <button
                        type="button"
                        key={event.id}
                        className={`km-rsvp__event ${selectedEvents.includes(event.id) ? "is-on" : ""}`}
                        aria-pressed={selectedEvents.includes(event.id)}
                        onClick={() => toggleEvent(event.id)}
                      >
                        {event.name}
                      </button>
                    ))}
                  </div>

                  <div className="km-rsvp__row">
                    <span className="km-rsvp__tag km-font-label">Wishes</span>
                    <input
                      className="km-rsvp__input"
                      type="text"
                      placeholder="A note for the couple (optional)"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <button type="submit" className="km-rsvp__submit km-font-label" disabled={!canSubmit}>
            {state === "submitting" ? "Sending…" : "Send RSVP"}
          </button>
          {state === "error" && <p className="km-rsvp__error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
