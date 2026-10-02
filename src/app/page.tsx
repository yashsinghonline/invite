import { EntryOverlay } from "@/components/invitation/entry-overlay"; // Fix: Remove .tsx
import { Hero } from "@/components/invitation/hero";
import { Couple } from "@/src/components/invitation/couple";
import { Countdown } from "@/components/invitation/countdown";
import { Events } from "@/components/invitation/events";
import { Gallery } from "@/components/invitation/gallery";
import { Rsvp } from "@/components/invitation/rsvp";
import { Video } from "@/components/invitation/video";
import { Footer } from "@/components/invitation/footer";
import { MusicBell } from "@/components/invitation/music-bell";
import { ScrollReveal } from "@/components/invitation/scroll-reveal";
import { groom, bride, wedding } from "@/lib/invitation";

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
