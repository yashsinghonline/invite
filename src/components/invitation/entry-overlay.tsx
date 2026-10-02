"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type EntryOverlayProps = {
  groomName: string;
  brideName: string;
  date: string;
  venue: string;
};

type Petal = {
  left: number;
  delay: number;
  dur: number;
  size: number;
  color: string;
  drift: number;
  rot: number;
  sway: number;
  round: boolean;
};

const PETAL_COLORS = [
  "linear-gradient(135deg,#f9b233,#e8792a)", // marigold
  "linear-gradient(135deg,#ffcf5c,#f39c1f)", // marigold light
  "linear-gradient(135deg,#f7b7c4,#e2718b)", // rose
  "linear-gradient(135deg,#fff8e7,#f3e2b6)", // jasmine
  "linear-gradient(135deg,#d94a5c,#a81d3a)", // deep rose
  "linear-gradient(135deg,#f4d58d,#c9932f)", // gold
];

function makePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.9,
    dur: 3.4 + Math.random() * 2.6,
    size: 9 + Math.random() * 12,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    drift: (Math.random() - 0.5) * 220,
    rot: Math.random() * 360,
    sway: 1.1 + Math.random() * 1.2,
    round: Math.random() < 0.3,
  }));
}

export function EntryOverlay({ groomName, brideName, date, venue }: EntryOverlayProps) {
  const [closing, setClosing] = useState(false);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const [shower, setShower] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const petals = useMemo(() => (shower ? makePetals(90) : []), [shower]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const saved = timers.current;
    return () => {
      document.body.style.overflow = "";
      saved.forEach(clearTimeout);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (closing || open) return;
    setClosing(true);
    setShower(true);
    timers.current.push(setTimeout(() => setOpen(true), 120));
    timers.current.push(
      setTimeout(() => {
        document.body.style.overflow = "";
        document.documentElement.classList.add("km-opened");
        window.dispatchEvent(new Event("km:open"));
      }, 420),
    );
    timers.current.push(setTimeout(() => setGone(true), 1300));
    timers.current.push(setTimeout(() => setShower(false), 7500));
  }, [closing, open]);

  useEffect(() => {
    if (gone) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") handleOpen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleOpen, gone]);

  return (
    <>
      {!gone && (
        <div
          className={`km-entry ${closing ? "km-entry--closing" : ""}`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Open invitation"
        >
          <div className="km-entry__veil" style={{ opacity: open ? 0 : 1, transition: "opacity 1s ease" }} />
          <div
            className="km-entry__card"
            style={
              open
                ? {
                    transform: "translate(-50%, 40vh)",
                    opacity: 0,
                    transition: "transform 1s cubic-bezier(.7,0,.84,0), opacity .8s ease",
                  }
                : undefined
            }
          >
            <img className="km-entry__art" src="/assets/kalyana-mandapam/entry-card.jpg" alt="" fetchPriority="high" decoding="async" />
            <img className="km-entry__mandala" src="/assets/south-indian/mandala-gold.webp" alt="" decoding="async" />
            <div
              className="km-entry__bloom"
              style={
                open
                  ? {
                      transform: "translate(-50%,-50%) scale(1.6)",
                      opacity: 0,
                      transition: "transform 1.1s cubic-bezier(.22,1,.36,1), opacity .9s ease",
                    }
                  : {
                      transform: "translate(-50%,-50%) scale(.6)",
                      opacity: 0.9,
                      transition: "transform 1s cubic-bezier(.22,1,.36,1), opacity .7s ease",
                    }
              }
            />
            <div className="km-entry__content">
              <div className="km-entry__group">
                <p className="km-entry__label">The Wedding Of</p>
                <h1 className="km-entry__names km-font-script">
                  {groomName}
                  <span className="km-entry__amp km-font-serif" aria-hidden="true">
                    &amp;
                  </span>
                  {brideName}
                </h1>
              </div>
              <div className="km-entry__group km-entry__meta">
                <p className="km-entry__date km-font-label">{date}</p>
                <p className="km-entry__city km-font-label">{venue}</p>
              </div>
              <div className="km-entry__group">
                <button
                  type="button"
                  className="km-entry__cta km-font-label"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                >
                  <span className="km-entry__cta-inner">Open Invitation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shower && (
        <div className="km-shower" aria-hidden="true">
          {petals.map((p, i) => (
            <span
              key={i}
              className="km-shower__petal"
              style={
                {
                  left: `${p.left}vw`,
                  width: `${p.size}px`,
                  height: `${p.round ? p.size : p.size * 1.55}px`,
                  borderRadius: p.round ? "50%" : "100% 0 100% 0",
                  "--c": p.color,
                  "--delay": `${p.delay}s`,
                  "--dur": `${p.dur}s`,
                  "--drift": `${p.drift}px`,
                  "--rot": `${p.rot}deg`,
                  "--sway": `${p.sway}s`,
                } as React.CSSProperties
              }
            >
              <i />
            </span>
          ))}
        </div>
      )}
    </>
  );
}
