import { groom, bride, wedding } from "@/lib/invitation";

const HERO_PETALS = [
  { left: "6%", delay: "0s", dur: "11s", drift: "60px", size: 11 },
  { left: "18%", delay: "-3s", dur: "13s", drift: "-40px", size: 9 },
  { left: "31%", delay: "-7s", dur: "12s", drift: "50px", size: 12 },
  { left: "47%", delay: "-1.5s", dur: "14s", drift: "-70px", size: 8 },
  { left: "62%", delay: "-5s", dur: "11.5s", drift: "45px", size: 10 },
  { left: "74%", delay: "-9s", dur: "12.5s", drift: "-35px", size: 12 },
  { left: "86%", delay: "-2.5s", dur: "13.5s", drift: "55px", size: 9 },
  { left: "94%", delay: "-6s", dur: "12s", drift: "-60px", size: 10 },
];

export function Hero() {
  return (
    <section className="km-hero">
      <div style={{ position: "absolute", inset: 0 }}>
        <video
          className="km-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/kalyana-mandapam/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/kalyana-mandapam/hero-procession-bg-v2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="km-hero__scrim" />
      <div className="km-hero__petals" aria-hidden="true">
        {HERO_PETALS.map((p, i) => (
          <span
            key={i}
            className="km-hero__petal"
            style={
              {
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size * 1.5}px`,
                "--delay": p.delay,
                "--dur": p.dur,
                "--drift": p.drift,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="km-hero__content">
        <p className="km-hero__invocation km-font-serif km-hero__fade" style={{ ["--d" as string]: "0.05s" }}>
          || Shree Ganeshay Namah ||
        </p>
        <h1 className="km-hero__name km-hero__groom km-font-script">
          {groom.shortName.split("").map((ch, i) => (
            <span className="km-hero__char" key={`g-${i}`} style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="km-hero__amp km-font-script km-hero__fade" style={{ ["--d" as string]: "0.7s" }}>
          &amp;
        </p>
        <h1 className="km-hero__name km-hero__bride km-font-script">
          {bride.shortName.split("").map((ch, i) => (
            <span className="km-hero__char" key={`b-${i}`} style={{ animationDelay: `${0.8 + i * 0.07}s` }}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="km-hero__date km-font-heading km-hero__fade" style={{ ["--d" as string]: "1.5s" }}>
          {wedding.date}
        </p>
        <p className="km-hero__venue km-hero__fade" style={{ ["--d" as string]: "1.7s" }}>
          <span className="km-hero__venue-at km-font-serif">at</span>{" "}
          <span className="km-font-label">{wedding.venue}</span>
        </p>
        <p className="km-hero__tag km-font-label km-hero__fade" style={{ ["--d" as string]: "2s" }}>
          <span className="km-hero__tag-line" aria-hidden="true" />
          Save the date
          <span className="km-hero__tag-line" aria-hidden="true" />
        </p>
      </div>
      <div className="km-hero__cue km-hero__fade" style={{ ["--d" as string]: "2.4s" }} aria-hidden="true">
        <span className="km-hero__cue-mouse">
          <span className="km-hero__cue-wheel" />
        </span>
        <span className="km-hero__cue-text km-font-label">Scroll</span>
      </div>
    </section>
  );
}
