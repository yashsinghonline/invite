export function Footer() {
  return (
    <footer className="km-footer">
      <div className="km-footer__card">
        <img className="km-footer__art" src="/assets/kalyana-mandapam/footer-card.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="km-footer__greeting">
          <p className="km-footer__greet-lead km-font-serif" data-reveal="up">
            We await your gracious presence
          </p>
          <p className="km-footer__greet-main km-font-script" data-reveal="up" style={{ ["--d" as string]: "140ms" }}>
            and your blessings
          </p>
          <p className="km-footer__greet-mark km-font-serif" data-reveal="up" style={{ ["--d" as string]: "280ms" }}>
            శుభమస్తు
          </p>
          <p className="km-footer__hashtag km-font-label" data-reveal="up" style={{ ["--d" as string]: "420ms" }}>
            #VijayWedsRashmika
          </p>
        </div>
        <a
          className="km-footer__credit"
          href="https://myshaadhilink.in/?utm_source=invitation&utm_medium=footer&utm_campaign=kalyana-mandapam"
          target="_blank"
          rel="noopener"
        >
          <span className="km-footer__credit-lead" data-reveal="up">
            This invitation was crafted on <span className="km-footer__credit-brand">MyShaadhi Link</span>
          </span>
          <span className="km-footer__credit-cta" data-reveal="up" style={{ ["--d" as string]: "120ms" }}>Need one for your wedding? Click here</span>
        </a>
      </div>
    </footer>
  );
}
