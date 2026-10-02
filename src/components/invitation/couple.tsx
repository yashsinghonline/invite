import { groom, bride, couplePhotos } from "@/lib/invitation";
import { Ornament } from "./ornament";

function Frame() {
  return (
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
  );
}

const Bird = ({ n }: { n: 1 | 2 | 3 }) => (
  <svg className={`km-couple__bird km-couple__bird--${n}`} viewBox="0 0 20 7" aria-hidden="true">
    <path d="M1 5.5 Q 5.5 1, 10 5 Q 14.5 1, 19 5.5" fill="none" stroke="#c9ad77" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export function Couple() {
  return (
    <section className="km-couple">
      <Frame />
      <img className="km-couple__scenery km-couple__scenery--top" src="/assets/kalyana-mandapam/temple-scenery.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img className="km-couple__scenery km-couple__scenery--bottom" src="/assets/kalyana-mandapam/temple-scenery.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <Bird n={1} />
      <Bird n={2} />
      <Bird n={3} />
      <div className="km-container km-couple__inner">
        <h2 className="km-couple__heading km-font-heading" data-reveal="up">
          The Couple
        </h2>
        <Ornament />
        <p className="km-couple__sub km-font-serif" data-reveal="up" style={{ ["--d" as string]: "160ms" }}>
          Two families, many blessings, one timeless celebration.
        </p>

        <div className="km-couple__unit">
          <p className="km-couple__role km-font-label" data-reveal="up">
            The Groom
          </p>
          <div className="km-couple__card" data-reveal="bloom">
            <div className="km-couple__halo" aria-hidden="true" />
            <div className="km-couple__photo-window">
              <img className="km-couple__photo" src={couplePhotos.groom} alt={groom.name} loading="lazy" decoding="async" />
            </div>
            <img className="km-couple__ornament" src="/assets/kalyana-mandapam/peacock-arch.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="km-couple__meta">
            <h3 className="km-couple__name km-font-script" data-reveal="up" style={{ ["--d" as string]: "120ms" }}>
              {groom.name}
            </h3>
            <p className="km-couple__parent-label km-font-label" data-reveal="up" style={{ ["--d" as string]: "220ms" }}>
              Son of
            </p>
            <p className="km-couple__parents km-font-serif" data-reveal="up" style={{ ["--d" as string]: "300ms" }}>
              {groom.parents}
            </p>
          </div>
        </div>

        <div className="km-couple__unit">
          <img className="km-couple__divider" src="/assets/kalyana-mandapam/gold-divider.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" data-reveal="scale" />
          <p className="km-couple__role km-font-label" data-reveal="up">
            The Bride
          </p>
          <div className="km-couple__card km-couple__card--mirror" data-reveal="bloom">
            <div className="km-couple__halo" aria-hidden="true" />
            <div className="km-couple__photo-window">
              <img className="km-couple__photo" src={couplePhotos.bride} alt={bride.name} loading="lazy" decoding="async" />
            </div>
            <img className="km-couple__ornament" src="/assets/kalyana-mandapam/peacock-arch.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="km-couple__meta">
            <h3 className="km-couple__name km-font-script" data-reveal="up" style={{ ["--d" as string]: "120ms" }}>
              {bride.name}
            </h3>
            <p className="km-couple__parent-label km-font-label" data-reveal="up" style={{ ["--d" as string]: "220ms" }}>
              Daughter of
            </p>
            <p className="km-couple__parents km-font-serif" data-reveal="up" style={{ ["--d" as string]: "300ms" }}>
              {bride.parents}
            </p>
          </div>
        </div>

        <p className="km-couple__blessing km-font-serif" data-reveal="up">
          <span aria-hidden="true">✦</span> With the blessings of our elders and the grace of Lord Ganesha{" "}
          <span aria-hidden="true">✦</span>
        </p>
      </div>
    </section>
  );
}
