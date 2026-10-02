import { EntryOverlay } from "@/components/invitation/entry-overlay.tsx";
import { Hero } from "@/components/invitation/hero.tsx";
import { Couple } from "@/components/invitation/couple.tsx";
import { Countdown } from "@/components/invitation/countdown.tsx";
import { Events } from "@/components/invitation/events.tsx";
import { Gallery } from "@/components/invitation/gallery.tsx";
import { Rsvp } from "@/components/invitation/rsvp.tsx";
import { Video } from "@/components/invitation/video.tsx";
import { Footer } from "@/components/invitation/footer.tsx";
import { MusicBell } from "@/components/invitation/music-bell.tsx";
import { ScrollReveal } from "@/components/invitation/scroll-reveal.tsx";
import { groom, bride, wedding } from "@/lib/invitation.tsx";

export default function HomePage() {
  return (
    <div className="kalyana-mandapam">
      <EntryOverlay
        groomName={groom.shortName}
        brideName={bride.shortName}
        date={wedding.shortDate}
        venue={wedding.venue}
      />
      <main>
        <Hero />
        <Couple />
        <Countdown />
        <Events />
        <Gallery />
        <Rsvp />
        <Video />
        <Footer />
      </main>
      <MusicBell />
      <ScrollReveal />
    </div>
  );
}
