import { EntryOverlay } from "@/src/components/invitation/entry-overlay";
import { Hero } from "@/src/components/invitation/hero";
import { Couple } from "@/src/components/invitation/couple";
import { Countdown } from "@/src/components/invitation/countdown";
import { Events } from "@/src/components/invitation/events";
import { Gallery } from "@/src/components/invitation/gallery";
import { Rsvp } from "@/src/components/invitation/rsvp";
import { Video } from "@/src/components/invitation/video";
import { Footer } from "@/src/components/invitation/footer";
import { MusicBell } from "@/src/components/invitation/music-bell";
import { ScrollReveal } from "@/src/components/invitation/scroll-reveal";
import { groom, bride, wedding } from "@/src/lib/invitation";

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
