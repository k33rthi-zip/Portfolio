import mixerImg from "@/assets/event-mixer.jpg";
import volunteerImg from "@/assets/event-volunteer.jpg";
import summitImg from "@/assets/event-summit.jpg";
import gardenImg from "@/assets/event-garden.jpg";
import lakeImg from "@/assets/event-lake.jpg";
import stargazeImg from "@/assets/event-stargaze.jpg";
import workshopImg from "@/assets/event-workshop.jpg";

export interface TrailEvent {
  slug: string;
  title: string;
  company: string;
  blurb: string;
  date: string;
  location: string;
  image: string;
  gallery: string[];
  description: string[];
  details: { label: string; value: string }[];
  skills: string[];
}

export const trailEvents: TrailEvent[] = [
  {
    slug: "campfire-mixer",
    title: "Finance Chair",
    company: "Victoria University Students' Administrative Council (VUSAC)",
    blurb: "An evening of introductions around the fire.",
    date: "June 2026 - Present",
    location: "Toronto, ON",
    image: mixerImg,
    gallery: [mixerImg, stargazeImg, workshopImg],
    description: [
      "A low-key networking mixer for builders, designers and outdoor folks. No name tags, no elevator pitches — just a circle of logs, a warm fire and long conversations under the peaks.",
      "We opened with a five-minute round of 'what are you making right now', then let the night wander. Most people stayed until the embers went out.",
    ],
    details: [
      { label: "Date", value: "June 2026 - Present" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Bring", value: "A jacket and a story" },
    ],
    skills: ["Community building", "Facilitation", "Public speaking", "Networking"],
  },
  {
    slug: "river-volunteer-day",
    title: "YIP Initiative Student Intern",
    company: "Durham Regional Police Service",
    blurb: "Clearing trails and planting along the creek.",
    date: "July 2025 - Aug 2025",
    location: "Toronto, ON",
    image: volunteerImg,
    gallery: [volunteerImg, gardenImg, lakeImg],
    description: [
      "A full morning of trail maintenance and riverbank restoration. We cleared two kilometres of overgrown path, rebuilt three water bars and planted 120 native saplings along the creek.",
      "Lunch happened on the rocks mid-stream, which is the best possible place for lunch.",
    ],
    details: [
      { label: "Date", value: "July 2025 - Aug 2025" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Bring", value: "Gloves, boots, water" },
    ],
    skills: ["Team coordination", "Environmental stewardship", "Logistics", "Manual restoration work"],
  },
  {
    slug: "summit-sunrise-trek",
    title: "Production Lead",
    company: "JA Company Program",
    blurb: "A pre-dawn climb to plant the flag together.",
    date: "Nov 2022 - June 2024",
    location: "Ajax, ON",
    image: summitImg,
    gallery: [summitImg, lakeImg, stargazeImg],
    description: [
      "We left the trailhead at 3:40am with headlamps on and hit the ridge just as the valley turned gold. Balloons drifted below us on the way down.",
      "The flag at the top is still there. So is the notebook — sign it if you make the climb.",
    ],
    details: [
      { label: "Date", value: "Nov 2022 - June 2024" },
      { label: "Location", value: "Ajax, ON" },
      { label: "Bring", value: "Headlamp and layers" },
    ],
    skills: ["Route planning", "Group leadership", "Risk assessment", "Endurance training"],
  },
];

export const getEvent = (slug?: string) =>
  trailEvents.find((e) => e.slug === slug);
