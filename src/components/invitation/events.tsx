"use client";

import { useEffect, useRef, useState } from "react";
import { events, wedding } from "@/lib/invitation";
import { Ornament } from "./ornament";

/**
 * Dotted trail that starts at the Mehendi medallion (118,237), passes through
 * Haldi & Sangeet (282,487) and the Telugu Wedding (118,737) and ends at the
 * Kodava Ceremony (282,987). Co-ordinates are in the 400×1083 stage space.
 */
const TRAIL =
  "M 118 237 C 118 362, 282 362, 282 487 C 282 612, 118 612, 118 737 C 118 862, 282 862, 282 987";

const STAGE_H = 1083;
const TRAIL_START_Y = 237;
const TRAIL_END_Y = 987;

export function Events() {
  const stageRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(1800);
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState({ x: 118, y: 237 });

  useEffect(() => {
    const path = measureRef.current;
    const stage = stageRef.current;
    if (!path || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = path.getTotalLength();
    setLength(total);

    if (reduce) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = stage.getBoundingClientRect();
      const startY = rect.top + rect.height * (TRAIL_START_Y / STAGE_H);
      const endY = rect.top + rect.height * (TRAIL_END_Y / STAGE_H);
      const scanLine = window.innerHeight * 0.72;
      const p = Math.min(1, Math.max(0, (scanLine - startY) / (endY - startY)));
      setProgress(p);
      const pt = path.getPointAtLength(total * p);
      setTip({ x: pt.x, y: pt.y });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("km:open", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("km:open", onScroll);
    };
  }, []);

  const lastIndex = events.length - 1;
  const isLit = (i: number) => progress >= (i === 0 ? 0.002 : i / lastIndex - 0.015);

  return (
    <section className="km-events">
      <div className="km-events__kolam" aria-hidden="true" />
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
        <h2 className="km-events__heading km-font-script" data-reveal="up">
          The Wedding Journey
        </h2>
        <Ornament />
        <p className="km-events__sub km-font-serif" data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
          Walk with us, function to function, to the sacred hour.
        </p>
      </div>
      <div className="km-events__stage" ref={stageRef} style={{ aspectRatio: "400 / 1083" }}>
        <svg className="km-events__svg" viewBox="0 0 400 1083" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id="km-trail-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="1083">
              <path
                d={TRAIL}
                fill="none"
                stroke="#fff"
                strokeWidth="16"
                strokeLinecap="round"
                style={{ strokeDasharray: length, strokeDashoffset: length * (1 - progress) }}
              />
            </mask>
          </defs>
          <path ref={measureRef} d={TRAIL} fill="none" stroke="none" />
          <path className="km-events__trail-ghost" d={TRAIL} />
          <path className="km-events__trail" d={TRAIL} mask="url(#km-trail-mask)" />
          <g
            className="km-events__tip"
            transform={`translate(${tip.x} ${tip.y})`}
            style={{ opacity: progress > 0.003 && progress < 0.997 ? 1 : 0 }}
          >
            <circle r="9" className="km-events__tip-glow" />
            <circle r="4.2" className="km-events__tip-ring" />
            <path d="M0 -3 L3 0 L0 3 L-3 0 Z" className="km-events__tip-core" />
          </g>
        </svg>

        {events.map((event, i) => {
          const lit = isLit(i);
          return (
            <div
              key={event.id}
              className={`km-events__stop km-events__stop--${event.side} ${lit ? "is-in" : ""}`}
              style={{ top: event.top }}
            >
              <div
                className={`km-events__medallion ${lit ? "is-lit" : ""}`}
                style={{ left: event.side === "left" ? "29.5%" : "70.5%" }}
                aria-hidden="true"
              >
                <span className="km-events__medallion-ring" />
                <img className="km-events__medallion-art" src={event.medallion} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="km-events__card">
                <p className="km-events__step km-font-label">
                  {String(i + 1).padStart(2, "0")} <span aria-hidden="true">·</span> {i === lastIndex ? "The Sacred Hour" : `Step ${i + 1}`}
                </p>
                <div className="km-events__card-head">
                  <h3 className="km-events__name km-font-heading">{event.name}</h3>
                </div>
                <p className="km-events__when km-font-serif">
                  <span className="km-events__when-date">{event.date}</span>
                  <span className="km-events__when-sep" aria-hidden="true">
                    {" "}
                    ·{" "}
                  </span>
                  <span className="km-events__when-time">{event.time}</span>
                </p>
                <p className="km-events__venue km-font-serif">{event.venue}</p>
                <p className="km-events__note km-font-serif">{event.note}</p>
                <p className="km-events__dress km-font-serif">
                  <span className="km-events__dress-label km-font-label">Attire</span> {event.attire}
                </p>
                <a className="km-events__map km-font-label" href={wedding.mapUrl} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  View Map
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
