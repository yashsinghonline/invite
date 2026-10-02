import { wedding } from "@/lib/invitation";

export function Video() {
  return (
    <section className="km-video km-section" aria-label="Wedding video">
      <p className="km-video__label km-font-label" data-reveal="up">
        A Special Glimpse
      </p>
      <div className="km-video__wall" data-reveal="bloom">
        <img className="km-video__wall-img" src="/assets/kalyana-mandapam/video-wall.jpg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="km-video__opening">
          <iframe
            className="km-video__media"
            src={`https://www.youtube.com/embed/${wedding.youtubeId}?rel=0&modestbranding=1`}
            title="A Special Glimpse"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
