import { describe, expect, it } from "vitest";
import { parseWhatsAppItinerary } from "./parse-whatsapp";
import { fromPrice } from "./pricing";

/**
 * Fixtures are the founder's REAL WhatsApp itineraries, verbatim — including
 * the duplicate "Day 5", mixed bullets, and invisible unicode. The parser's
 * definition of done is zero data loss against these (08-blueprint/05 §6).
 */

const ANINI = `
*Anini 5N/6D*

*Day 1*: Dibrugarh/Tinsukia to Anini
*Trip Time*: Morning 05:00-06:30
Sightseeing : Mayodia pass
• over night stay at Anini

*Day 2*: Fresh morning from the Valley’s of Dibang
*Trip Time*: Starting at morning 08:00 / 09:00 am
Sightseeing :-
• Dree afra
• ⁠Chigu camp
• ⁠Mawuando
• ⁠Dri river
• ⁠Deccan falls
• ⁠Ahi falls
• ⁠Bruni falls
• ⁠overnight stay at Chigu camp

*Day 3* POMO GRASSLAND TREK
Starting the the trek on morning
03:00am
Trekking end at almost evening 03:00pm

*Day 4*: Explore Gipulin
• Matu valley
• ⁠Matu waterfall
• ⁠Glass bridge
• ⁠Beautiful valley spots
• ⁠overnight stay at Anini

*Day 5*: Goodmorning from Anini
*Trip Time*: starting at morning
09:00 am
Sightseeing-
• Emuli grassland
• ⁠Karu view point
• ⁠Karu grassland
• Evening time local market walk
• Enjoy the last night at Anini Homestay with Bonfire evening.

*Day 5*: Back to Dibrugarh
•Dr Bhupen Hazarika Setu (India’s longest bridge)
*Trip Time*: 06:00 am / 07:00 am - 05:00 / 06:00 pm
Drop off to Dibrugarh
Via hunli-mayodia road.

*Group Trip*
₹18,999/- per pax (Group of 6)
₹21,699/- per pax (Group of 5)
₹26,699/- per pax (Group of 4)

*Private Trip couple/twin*
*Package price* :
51,999/- per pax

*Inclusion :-*
* Accommodation
* Guide
* Private Transportation
* Pomo grassland trek
* ⁠Pomo transport
* ⁠Guide charges
* Meals (Breakfast & Dinner)
* Inner line permits
* Forest pass

*~ Join us for an unforgettable experience amidst the breathtaking valleys & waterfalls*

Thank you
*Travelspire_Northeast*
`;

const MECHUKA_DONG_ANINI = `
MENCHUKHA + DONG + ANINI (12N/13D)

Day 1 :- Dib - Aalo

Dibrugarh to Aalo (250 km, 6 hours approx) - Start early from Dibrugarh via Bogibeel bridge (india’s longest railroad bridge) - Drive to Along, the district headquarters of WestSiang
- Overnight stay in Aalo

Day 2 :- Aalo - Mechukha

 Drive to Mechuka, crossing the Yorlun bridge and entering the Mechukha Valley -
Check- in to a hotel or homestay
- Explore the town and local market
- Overnight stay in Mechukha

Day 3 :- Mechukha

* Mechukha Ancient monastery (400yrs old)
* 108 Stupa
* Dorjeeling 0km
* Gautse Hanging Bridge
* Buddha park
* New gompa & view point of Mechukha town
* Biggest Spin bell (Prayer wheel / Mani wheel)
- Overnight stay at Mechukha

Day 4 :- Explore Lamang pass
* Lamang pass
* Helicopter crash point
* India’s last cafe
* Jang bahadur waterfall
* Gurudwara
* Hanuman camp
* Lucky stone
* Overnight stay at Menchukha

Day 5 :- Mechukha - Aalo
* Evening at Aalo chat house
* Explore the local market
* Overnight stay at Aalo

Day 6 :- Aalo - Namsai
* Golden pagoda (KONGMU KHAM)
* Rest day at Namsai - Chowkham

Day 7 :- Namsai - Walong
* Lunch break at Hayuliang
* Night stay at Walong

Day 8 :- Explore KAHO
* Goodmorning from Walong
* Trek to DONG VALLEY ~ Experience India’s 1st sunrise (02:00am)
* War memorial ~ Lunch at Walong
* Explore KAHO
* Dong suspension footbridge
* Overnight stay at Dong

Day 9 :- Walong - Roing
* Lunch at Hayuliang
* Night stay at Roing

Day 10 :- Roing - Anini
* Sightseeing : Mayodia pass
* Hunli off road point
* Overnight stay at Anini

Day 11 :- Anini Sightseeing:-
* Dree afra
* Chigu camp
* Mawuando
* Dri river
* Matu waterfall
* Acheso
* Matu (if possible)
* overnight stay at Anini

Day 12 :- Goodmorning from Anini
*Trip Time*: starting at morning
09:00 am
Sightseeing-
* Emuli grassland
* Beautiful valley spots
* Karu grassland
* Karu view point
* Evening time local market walk
* Enjoy the last night at Anini Homestay with Bonfire evening

Day 13 :- Anini - Dibrugarh via Mayudia road
* Mayudia pass
* Dr Bhupen hazarika setu ( India's longest river bridge at 9.15 km, spanning the Lohit River in Assam.
* Drop off Dibrugarh

*Group package*
₹37,499/- per pax (Group of 6)
₹43,299/- per pax (Group of 5)
₹54,399/- per pax (Group of 4)

*PRIVATE PACKAGE PRICE (TWIN / COUPLE)*
₹69,999/- per pax

*INCLUSION*
* Transportation
* Accommodation
* Meals (Breakfast & Dinner)
* ILP
* Lamang pass permit
* Guide charges
* ⁠Pomo trek
* ⁠Pomo permits
* Forest pass
* First aid

*Exclusion*
* Lunch
* Heater
* Railway / Airway tickets
* Any personal expenses during the trip

*Facilities*
* Room (Hotel / Homestay )
* Geyser

*Thankyou*
`;

describe("parseWhatsAppItinerary — Anini 5N/6D (real)", () => {
  const t = parseWhatsAppItinerary(ANINI);

  it("reads title + duration notation", () => {
    expect(t.title).toBe("Anini 5N/6D");
    expect(t.nights).toBe(5);
  });

  it("renumbers the duplicate Day 5 → six days total", () => {
    expect(t.days).toHaveLength(6);
    expect(t.days.map((d) => d.dayNo)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(t.days[5]!.title).toMatch(/Back to Dibrugarh/);
  });

  it("day 1: route, trip time, sightseeing, overnight", () => {
    const d1 = t.days[0]!;
    expect(d1.route).toEqual({ from: "Dibrugarh/Tinsukia", to: "Anini" });
    expect(d1.tripTime).toMatch(/05:00-06:30/);
    expect(d1.sightseeing.map((s) => s.name)).toContain("Mayodia pass");
    expect(d1.overnight?.name).toBe("Anini");
  });

  it("day 2: all seven sightseeing bullets survive (never flattened)", () => {
    const d2 = t.days[1]!;
    expect(d2.sightseeing.map((s) => s.name)).toEqual([
      "Dree afra",
      "Chigu camp",
      "Mawuando",
      "Dri river",
      "Deccan falls",
      "Ahi falls",
      "Bruni falls",
    ]);
    expect(d2.overnight).toMatchObject({ name: "Chigu camp", type: "camp" });
  });

  it("day 3: the Pomo trek is tagged", () => {
    expect(t.days[2]!.title).toMatch(/POMO GRASSLAND TREK/i);
    expect(t.days[2]!.tags).toContain("trek");
  });

  it("day 5: homestay overnight with the bonfire line kept verbatim", () => {
    const d5 = t.days[4]!;
    expect(d5.overnight?.type).toBe("homestay");
    expect(d5.overnight?.raw).toMatch(/Bonfire/);
    expect(d5.tags).toContain("market");
  });

  it("pricing: 3 group tiers + private — from-price computed, never typed", () => {
    expect(t.pricing?.modes).toHaveLength(2);
    const group = t.pricing!.modes[0]!;
    expect(group).toMatchObject({
      mode: "group",
      tiers: [
        { groupSize: 6, pricePax: 18999 },
        { groupSize: 5, pricePax: 21699 },
        { groupSize: 4, pricePax: 26699 },
      ],
    });
    expect(t.pricing!.modes[1]).toMatchObject({ mode: "private", pricePax: 51999 });
    expect(fromPrice(t.pricing)).toBe(18999);
  });

  it("all nine inclusions land, incl. permits", () => {
    expect(t.inclusions).toHaveLength(9);
    expect(t.inclusions).toContain("Inner line permits");
    expect(t.inclusions).toContain("Forest pass");
  });
});

describe("parseWhatsAppItinerary — Menchukha + Dong + Anini 12N/13D (real)", () => {
  const t = parseWhatsAppItinerary(MECHUKA_DONG_ANINI);

  it("thirteen days, duration from the plain-text title line", () => {
    expect(t.days).toHaveLength(13);
    expect(t.nights).toBe(12);
  });

  it("day 1: distance + drive time parsed from the parens", () => {
    const d1 = t.days[0]!;
    // Header says "Dib - Aalo"; the prose line upgrades it to the full name.
    expect(d1.route).toEqual({ from: "Dibrugarh", to: "Aalo" });
    expect(d1.distanceKm).toBe(250);
    expect(d1.driveTime).toMatch(/6 hours approx/);
    expect(d1.overnight?.name).toBe("Aalo");
    expect(d1.tags).toContain("long-drive");
  });

  it("day 3: all seven Mechukha sights survive", () => {
    expect(t.days[2]!.sightseeing.length).toBeGreaterThanOrEqual(7);
    expect(t.days[2]!.sightseeing.map((s) => s.name)).toContain("Buddha park");
  });

  it("day 6 is a rest day; day 8 is the Dong sunrise + border day", () => {
    expect(t.days[5]!.tags).toContain("rest");
    const d8 = t.days[7]!;
    expect(d8.tags).toEqual(expect.arrayContaining(["trek", "sunrise"]));
    expect(d8.overnight?.name).toBe("Dong");
  });

  it("every night is accounted for (the overnight discipline)", () => {
    // Days 1–12 sleep somewhere; day 13 is the drop-off.
    const nights = t.days.slice(0, 12).map((d) => d.overnight?.name);
    expect(nights).toEqual([
      "Aalo", "Mechukha", "Mechukha", "Menchukha", "Aalo", undefined /* rest day at Namsai — unlabelled in source */,
      "Walong", "Dong", "Roing", "Anini", "Anini", "Anini",
    ]);
  });

  it("pricing matrix + the three lists (incl. facilities)", () => {
    expect(fromPrice(t.pricing)).toBe(37499);
    expect(t.pricing!.modes[1]).toMatchObject({ mode: "private", pricePax: 69999 });
    expect(t.inclusions).toHaveLength(10);
    expect(t.inclusions).toContain("Lamang pass permit");
    expect(t.exclusions).toHaveLength(4);
    expect(t.facilities).toEqual(["Room (Hotel / Homestay )", "Geyser"]);
  });

  it("nothing important vanished — unparsed is tiny and reviewable", () => {
    // A handful of preamble/decoration lines at most; never day content.
    expect(t.unparsed.length).toBeLessThan(6);
  });
});
