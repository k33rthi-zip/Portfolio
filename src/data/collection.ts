import mixerImg from "@/assets/event-mixer.jpg";
import volunteerImg from "@/assets/event-volunteer.jpg";
import summitImg from "@/assets/event-summit.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import lakeImg from "@/assets/event-lake.jpg";
import gardenImg from "@/assets/event-garden.jpg";
import stargazeImg from "@/assets/event-stargaze.jpg";

export interface CollectionEvent {
  id: string;
  name: string;
  year: 2026 | 2025 | 2024;
  date: string;
  location: string;
  short: string;
  image: string;
  details: string[];
}

const images = [mixerImg, volunteerImg, summitImg, workshopImg, lakeImg, gardenImg, stargazeImg];
const img = (i: number) => images[i % images.length];

const make = (
  year: 2026 | 2025 | 2024,
  items: [name: string, date: string, location: string, short: string, detail: string][]
): CollectionEvent[] =>
  items.map(([name, date, location, short, detail], i) => ({
    id: `${year}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    year,
    date,
    location,
    short,
    image: img(i + year),
    details: [
      detail,
      "Doors opened an hour early for setup volunteers, and the room stayed full long past the scheduled close.",
    ],
  }));

export const collectionEvents: CollectionEvent[] = [
  ...make(2026, [
    ["Campfire Mixer", "March 14, 2026", "Ridgeline Basecamp", "An evening of introductions around the fire.", "A low-key networking mixer for builders, designers and outdoor folks — a circle of logs, a warm fire and long conversations."],
    ["River Volunteer Day", "May 2, 2026", "Cedar Creek", "Clearing trails and planting along the creek.", "Two kilometres of overgrown path cleared, three water bars rebuilt and 120 native saplings planted."],
    ["Summit Sunrise Trek", "July 19, 2026", "North Peak", "A pre-dawn climb to plant the flag together.", "We left the trailhead at 3:40am with headlamps on and hit the ridge as the valley turned gold."],
    ["Trailhead Workshop", "August 23, 2026", "Fox Hollow", "A hands-on session at the fork in the path.", "A small-group workshop on wayfinding: reading a route, marking a turn, leaving a trail better than you found it."],
    ["Lake Paddle Social", "September 6, 2026", "Mirror Lake", "Canoes, golden hour and easy conversation.", "Random canoe pairings and two hours of flat water — a surprisingly good way to meet people."],
    ["Community Garden Day", "October 11, 2026", "Foothills Plot", "Turning a bare slope into rows of green.", "Digging beds, hauling compost and planting a season's worth of seedlings above town."],
    ["Stargazing Campout", "November 15, 2026", "Night Ridge", "Tents, a fire and a very dark sky.", "Tents up before dusk, every light killed after dinner to let the sky come out properly."],
    ["Ridge Runner Meetup", "January 24, 2026", "Alder Flats", "Cold-morning miles with warm company.", "A steady eight kilometres of frozen singletrack followed by soup at the trailhead."],
    ["Map & Compass Night", "February 12, 2026", "Basecamp Loft", "Analogue navigation, no screens allowed.", "Paper maps, protractors and a route-planning race that got competitive fast."],
    ["Alpine Sketch Walk", "April 5, 2026", "Larch Bowl", "Slow walking, quick drawing.", "Ten stops, five minutes of sketching each, and a shared zine printed the following week."],
    ["Wildflower Survey", "June 8, 2026", "Meadow Traverse", "Counting blooms for the local dataset.", "Volunteers logged 41 species across three transects for the regional conservancy."],
    ["Trail Build Weekend", "August 1, 2026", "Fox Hollow", "Two days of dirt, rock and rebar.", "A new 600-metre bench-cut connector, dug entirely by hand."],
    ["Harvest Potluck", "October 25, 2026", "Foothills Plot", "Everything on the table came from the plot.", "Thirty dishes, one long table, and the last of the season's tomatoes."],
    ["Lantern Loop Hike", "December 12, 2026", "Cedar Creek", "A short night walk lit by hand.", "Paper lanterns along a two-kilometre loop and cocoa at the finish."],
  ]),
  ...make(2025, [
    ["First Light Trek", "March 8, 2025", "North Peak", "The season's first summit push.", "A cold, clear morning and the first flag of the year planted on the cairn."],
    ["Creekside Cleanup", "April 19, 2025", "Cedar Creek", "Hauling out what the winter left behind.", "Eleven bags of debris and one very stuck shopping cart."],
    ["Basecamp Mixer", "May 30, 2025", "Ridgeline Basecamp", "Introductions, no name tags.", "A relaxed evening of five-minute intros that ran long in the best way."],
    ["Paddle & Picnic", "July 12, 2025", "Mirror Lake", "Canoes out, blankets down.", "An easy shoreline paddle followed by a picnic on the north beach."],
    ["Signpost Workshop", "August 16, 2025", "Fox Hollow", "Building markers from reclaimed cedar.", "Three signposts built, routed and installed before sundown."],
    ["Seedling Swap", "September 20, 2025", "Foothills Plot", "Trading starts and stories.", "Everyone arrived with a tray and left with a different one."],
    ["Meteor Watch", "October 18, 2025", "Night Ridge", "Blankets, thermoses, falling stars.", "Peak shower night with a clear forecast and about sixty counted."],
    ["Frost Trail Social", "November 29, 2025", "Alder Flats", "A short walk and a long fire.", "Crunchy ground underfoot and a bonfire that lasted until midnight."],
  ]),
  ...make(2024, [
    ["Inaugural Campfire", "June 15, 2024", "Ridgeline Basecamp", "Where the whole thing started.", "Twelve people, one fire and a rough plan for a year of events."],
    ["Summer Trail Day", "August 3, 2024", "Cedar Creek", "First organised maintenance push.", "A borrowed set of tools and a very productive Saturday."],
    ["Autumn Ridge Hike", "September 28, 2024", "Larch Bowl", "Golden larches, full turnout.", "The larch season walk that convinced us to keep going."],
    ["Winter Planning Night", "December 7, 2024", "Basecamp Loft", "Mapping out the year ahead.", "Sticky notes, a wall calendar and far too much coffee."],
  ]),
];

export const yearsInOrder: (2026 | 2025 | 2024)[] = [2026, 2025, 2024];

export const getCollectionEvent = (id?: string) =>
  collectionEvents.find((e) => e.id === id);
