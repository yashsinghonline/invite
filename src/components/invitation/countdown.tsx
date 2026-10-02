"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/invitation";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = wedding.countdownTarget.getTime();
  const diff = now === null ? null : Math.max(0, target - now);

  const days = diff === null ? "00" : pad(Math.floor(diff / 86400000));
  const hours = diff === null ? "00" : pad(Math.floor((diff % 86400000) / 3600000));
  const minutes = diff === null ? "00" : pad(Math.floor((diff % 3600000) / 60000));
  const seconds = diff === null ? "00" : pad(Math.floor((diff % 60000) / 1000));

  const arrived = diff !== null && diff <= 0;

  // Positions from the original wall layout
  const units = [
    { key: "days", value: days, left: "16.17%", width: "11.5%" },
    { key: "hours", value: hours, left: "34.68%", width: "11.5%" },
    { key: "minutes", value: minutes, left: "53.19%", width: "11.5%" },
    { key: "seconds", value: seconds, left: "71.19%", width: "11.5%" },
  ];

  return (
    <section className="km-countdown">
      <div className="km-countdown__stage" data-reveal="scale">
        <img className="km-countdown__panel" src="/assets/kalyana-mandapam/countdown-wall.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        {arrived ? (
          <p className="km-countdown__arrived km-font-heading">The Wedding Day Has Arrived!</p>
        ) : (
          units.map((u) => (
            <div
              key={u.key}
              className="km-countdown__unit"
              style={{ left: u.left, width: u.width, top: "52%", height: "24%" }}
            >
              <span className={`km-countdown__value km-countdown__value--${u.key}`}>{u.value}</span>
            </div>
          ))
        )}
      </div>
      <p className="km-countdown__caption km-font-serif" data-reveal="up">
        <span className="km-countdown__caption-mark" aria-hidden="true">✦</span>
        Counting every moment to the Muhurtham
        <span className="km-countdown__caption-mark" aria-hidden="true">✦</span>
      </p>
    </section>
  );
}
