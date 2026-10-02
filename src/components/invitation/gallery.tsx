"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { galleryImages } from "@/lib/invitation";
import { Ornament } from "./ornament";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    el.querySelectorAll<HTMLElement>(".km-gallery__cell").forEach((cell) => io.observe(cell));
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const step = useCallback(
    (dir: number) => {
      setLightbox((cur) => (cur === null ? null : (cur + dir + galleryImages.length) % galleryImages.length));
    },
    [],
  );

  return (
    <section className="km-gallery">
      <div className="km-gallery__toranam" aria-hidden="true" />
      <div className="km-container">
        <h2 className="km-gallery__heading km-font-script" data-reveal="up">
          Before the Vows
        </h2>
        <Ornament />
        <p className="km-gallery__sub km-font-serif" data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
          Little moments from the years that brought us here.
        </p>
      </div>
      <div className="km-gallery__weave" aria-hidden="true" />
      <div className="km-gallery__motes" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span className="km-gallery__mote" key={i} />
        ))}
      </div>
      <img className="km-gallery__parasol" src="/assets/kalyana-mandapam/gallery-parasol.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <div className="km-gallery__stage">
        <div className="km-gallery__grid" ref={gridRef}>
          {galleryImages.map((src, i) => (
            <button
              key={src}
              type="button"
              data-col={i % 2}
              className={`km-gallery__cell ${i === 0 ? "km-gallery__cell--feature" : ""}`}
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
              aria-label={`Open photo ${i + 1} of ${galleryImages.length}`}
              onClick={() => setLightbox(i)}
            >
              <img className="km-gallery__img" src={src} alt="" loading="lazy" decoding="async" />
              <span className="km-gallery__frame" aria-hidden="true" />
              <span className="km-gallery__shine" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="km-video__modal"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          style={{ zIndex: 120 }}
        >
          <div className="km-video__modal-inner" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="km-video__modal-close"
              onClick={close}
              aria-label="Close photo viewer"
              style={{ top: "-44px", right: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={galleryImages[lightbox]}
              alt={`Gallery photo ${lightbox + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6, boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              style={{
                position: "absolute",
                left: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(201,147,47,.6)",
                background: "rgba(43,22,8,.7)",
                color: "#fbeeb8",
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              style={{
                position: "absolute",
                right: "-8px",
                top: "50%",
                transform: "translateY(-50%)",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(201,147,47,.6)",
                background: "rgba(43,22,8,.7)",
                color: "#fbeeb8",
                cursor: "pointer",
              }}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
