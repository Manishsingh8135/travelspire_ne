// Ziro Festival of Music 2026 (24–27 Sep) — recap content.
//
// Line-up: the twelve acts we listed while the edition was on sale. Three
// further names that had been appended "for SEO" (The Local Train, Dualist
// Inquiry, Menwhopause) were never confirmed for 2026 and are not shown.

export const ziro2026 = {
  dates: { start: "2026-09-24", end: "2026-09-27", label: "24–27 September 2026" },
  location: "Ziro Valley, Lower Subansiri, Arunachal Pradesh",
  since: "2012",
  artistCount: "33+",
  officialSite: "https://www.zirofestival.com",
  intro:
    "The Ziro Festival of Music began in 2012 on the Apatani plateau in Lower Subansiri district. For four days, indie, folk, world and electronic acts play a bamboo-built stage in a valley of rice terraces and pine ridges — with the Apatani villages as hosts.",
} as const;

export const ziro2026Lineup = [
  { name: "Shilpa Rao", origin: "Mumbai", scene: "Bollywood & mainstream", genre: "Playback, Bollywood" },
  { name: "Anna Erhard", origin: "Switzerland", scene: "International", genre: "Folk, Indie" },
  { name: "Soumik Datta", origin: "UK", scene: "International", genre: "World music, Sarod" },
  { name: "Susheela Raman", origin: "UK", scene: "International", genre: "World music" },
  { name: "Buried Treasures", origin: "France / Delhi", scene: "International", genre: "Electronic, Indie" },
  { name: "Guitar Prasanna", origin: "USA", scene: "International", genre: "Jazz fusion, Guitar" },
  { name: "Swarathma", origin: "Bengaluru", scene: "Indian indie", genre: "Folk rock" },
  { name: "Parvaaz", origin: "Bengaluru", scene: "Indian indie", genre: "Progressive rock" },
  { name: "Chorun Mugli", origin: "Arunachal Pradesh", scene: "From the Northeast", genre: "Traditional, Folk" },
  { name: "Da Minot", origin: "Meghalaya", scene: "From the Northeast", genre: "Blues, Rock" },
  { name: "Pink Eye", origin: "Nagaland", scene: "From the Northeast", genre: "Punk, Alternative" },
  { name: "Remi Remi", origin: "Arunachal Pradesh", scene: "From the Northeast", genre: "Folk, Traditional" },
] as const;

export const ziro2026Scenes = ["International", "Indian indie", "From the Northeast", "Bollywood & mainstream"] as const;

export const ziroAbout = [
  "Held in late September most years since 2012, in the paddy fields of the Apatani plateau",
  "Stages and campsites built from local bamboo by Apatani craftspeople",
  "Run as a low-waste festival, with a push to keep single-use plastic out of the valley",
  "Set in a cultural landscape on India's tentative list for UNESCO World Heritage",
  "Indie, folk, world and electronic music across four days and nights",
  "Food stalls with Apatani cooking, local rice beer and Northeast dishes",
] as const;

export const ziroRecapFaqs = [
  {
    question: "When is the Ziro Festival of Music 2027?",
    answer:
      "The 2027 dates have not been announced yet. The festival has been held in late September in recent years; the official dates come from the festival's own channels.",
  },
  {
    question: "Do I need a permit to visit Ziro?",
    answer:
      "Yes. Indian citizens from outside Arunachal Pradesh need an Inner Line Permit; foreign nationals need a Protected Area Permit. We arrange permits for every trip we run, and our Arunachal ILP guide explains how to apply yourself.",
  },
  {
    question: "How do I get to Ziro?",
    answer:
      "The nearest airport is Donyi Polo Airport at Hollongi, near Itanagar — about 4 hours by road to Ziro. From Guwahati it is a long day's drive. Naharlagun has the nearest railway station.",
  },
  {
    question: "Is Ziro worth visiting outside the festival?",
    answer:
      "Yes. The rice terraces are green from June to September and golden around harvest in October; spring brings the Myoko festival in March. The pine forests, Apatani villages and Talley Valley are there all year.",
  },
  {
    question: "Are there ATMs and mobile network in Ziro?",
    answer:
      "Ziro town has a few ATMs, but carry enough cash. Mobile coverage is patchy across the valley — download maps and tickets before you leave the plains.",
  },
] as const;
