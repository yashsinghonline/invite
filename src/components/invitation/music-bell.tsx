"use client";

import { useEffect, useRef, useState } from "react";

export function MusicBell() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; stop: () => void } | null>(null);

  const start = () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") void ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

    // Soft evolving pad: two detuned triangle oscillators + slow LFO on filter
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.6;
    filter.connect(gain);

    const freqs = [220, 277.18, 329.63, 440];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 === 0 ? "triangle" : "sine";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.25 / (i + 1);
      o.connect(g);
      g.connect(filter);
      o.start();
      return o;
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    nodesRef.current = {
      gain,
      stop: () => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.8);
        window.setTimeout(() => {
          oscs.forEach((o) => {
            try {
              o.stop();
            } catch {
              /* already stopped */
            }
          });
          try {
            lfo.stop();
          } catch {
            /* already stopped */
          }
        }, 1000);
      },
    };
  };

  const stop = () => {
    nodesRef.current?.stop();
    nodesRef.current = null;
  };

  useEffect(() => () => stop(), []);

  const toggle = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  return (
    <button
      type="button"
      className={`km-bell ${playing ? "km-bell--playing" : ""}`}
      aria-label={playing ? "Stop background music" : "Play background music"}
      aria-pressed={playing}
      onClick={toggle}
    >
      <span className="km-bell__disc">
        <img
          className="km-bell__icon"
          src={playing ? "/assets/kalyana-mandapam/km-audio-on.png" : "/assets/kalyana-mandapam/km-audio-off.png"}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
      </span>
    </button>
  );
}
