export const groom = {
  name: "Vijay Deverakonda",
  shortName: "Vijay",
  parents: "Deverakonda Govardhan Rao & Deverakonda Madhavi",
};

export const bride = {
  name: "Rashmika Mandanna",
  shortName: "Rashmika",
  parents: "Madan Mandanna & Suman Mandanna",
};

export const wedding = {
  date: "Monday, October 26, 2026",
  shortDate: "26 October 2026",
  venue: "ITC Mementos, Udaipur, Rajasthan, India",
  venueShort: "ITC Mementos, Udaipur",
  mapUrl: "https://maps.app.goo.gl/XaQmk5ifYLZmsPuAA",
  youtubeId: "xJKwD24GJtw",
  countdownTarget: new Date("2026-10-26T10:00:00+05:30"),
};

export type WeddingEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  medallion: string;
  side: "left" | "right";
  top: string;
  note: string;
  attire: string;
};

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    name: "Mehendi",
    date: "24th February 2026",
    time: "5:00 PM onwards",
    venue: "ITC Mementos, Udaipur",
    medallion: "/assets/kalyana-mandapam/events/mehendi.png",
    side: "left",
    top: "21.88%",
    note: "Henna, folk songs & marigold swings",
    attire: "Pastels & florals",
  },
  {
    id: "haldi-sangeet",
    name: "Haldi & Sangeet",
    date: "25th February 2026",
    time: "10:48 AM",
    venue: "ITC Mementos, Udaipur",
    medallion: "/assets/kalyana-mandapam/events/haldi-bowl.png",
    side: "right",
    top: "44.97%",
    note: "Turmeric blessings by day, dance till late",
    attire: "Sunshine yellows & festive glam",
  },
  {
    id: "telugu-wedding",
    name: "Telugu Wedding",
    date: "26th February 2026",
    time: "10:00 AM onwards",
    venue: "ITC Mementos, Udaipur",
    medallion: "/assets/kalyana-mandapam/events/nadaswaram.png",
    side: "left",
    top: "68.05%",
    note: "Jeelakarra Bellam & Mangalya Dharanam",
    attire: "Traditional silks",
  },
  {
    id: "kodava-ceremony",
    name: "Kodava Ceremony",
    date: "26th February 2026 — Evening",
    time: "6:30 PM onwards",
    venue: "ITC Mementos, Udaipur",
    medallion: "/assets/kalyana-mandapam/events/nadaswaram.png",
    side: "right",
    top: "91.14%",
    note: "Ganga Puje & the traditional Kodava rites",
    attire: "Kodava traditional wear",
  },
];

export const galleryImages = [
  "/images/invitation/g1.jpeg",
  "/images/invitation/g2.jpeg",
  "/images/invitation/g3.jpeg",
  "/images/invitation/g4.jpeg",
  "/images/invitation/g5.jpg",
  "/images/invitation/g6.jpeg",
  "/images/invitation/g7.jpeg",
  "/images/invitation/g8.jpeg",
  "/images/invitation/g9.jpeg",
  "/images/invitation/g10.jpeg",
];

export const couplePhotos = {
  groom: "/images/invitation/groom.jpg",
  bride: "/images/invitation/bride.jpg",
};
