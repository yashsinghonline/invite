"use client";

import { useEffect } from "react";

/**
 * Observes every element carrying a `data-reveal` attribute and adds `is-in`
 * once it scrolls into view. Observation begins only after the invitation has
 * been opened (so animations are not wasted behind the entry card).
 */
export function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (reduce) el.classList.add("is-in");
        else io?.observe(el);
      });
    };

    const start = () => {
      if (io) return;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      observe(document);
      mo = new MutationObserver((muts) => {
        muts.forEach((m) =>
          m.addedNodes.forEach((n) => {
            if (n instanceof HTMLElement) {
              if (n.hasAttribute("data-reveal")) io?.observe(n);
              observe(n);
            }
          }),
        );
      });
      mo.observe(document.body, { childList: true, subtree: true });
    };

    if (document.documentElement.classList.contains("km-opened")) start();
    window.addEventListener("km:open", start);
    return () => {
      window.removeEventListener("km:open", start);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return null;
}
