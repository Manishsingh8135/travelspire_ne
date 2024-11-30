// data/tours/festival-data.ts
import { FestivalTour } from "@/types/tours/tour";

export const hornbillFestival: FestivalTour = {
  id: "hornbill-festival-2024",
  slug: "hornbill-festival-2024",
  type: "Festival",
  festivalName: "Hornbill Festival",
  title: "Hornbill Festival 2024",
  subtitle: "The biggest festival of Nagaland",
  overview: "Experience the cultural extravaganza of Northeast India at the Hornbill Festival, combined with the breathtaking beauty of Dzukou Valley. This festival celebrates the rich heritage of Nagaland's 16 major tribes with traditional dances, music, local cuisine, and handicrafts.",
  location: "Kisama Heritage Village, Nagaland",
  featured: true,

  eventDates: {
    start: "2024-12-01",
    end: "2024-12-10",
    year: 2024
  },

  heroImage: "/images/places/hornbill/Hornbill_3.PNG",
  thumbnail: "/images/places/hornbill/Hornbill_3.PNG",
  gallery: [
    // "/images/places/hornbill/Hornbill_1.PNG",
    "/images/places/hornbill/Hornbill_2.WEBP",
    "/images/places/hornbill/Hornbill_3.PNG",
    "/images/places/hornbill/Hornbill_4.PNG"
  ],

  highlights: [
    "Hornbill Festival- The biggest festival of Nagaland",
    "Dzukou Valley- The Valley of flower of Northeast",
    "Explore & Experience the Naga lifestyle and culture",
    "Local Naga Cuisines"
  ],

  culturalHighlights: [
    "Traditional dance performances",
    "Naga wrestling championships",
    "Indigenous games demonstrations",
    "Local handicraft exhibitions"
  ],

  variants: [
    {
      id: "hornbill-basic",
      name: "Hornbill Camping",
      duration: {
        days: 2,
        nights: 1
      },
      price: 1799,
      description: "Basic camping experience at the festival",
      inclusions: [
        "Camping stay",
        "Breakfast & Dinner",
        "Basic amenities"
      ]
    },
    {
      id: "hornbill-dzukou-2d",
      name: "Hornbill x Dzukou Valley",
      duration: {
        days: 3,
        nights: 2
      },
      price: 7299,
      description: "Festival plus Dzukou Valley trek experience",
      inclusions: [
        "Camping stays",
        "Breakfast & Dinner",
        "Dzukou trek",
        "Ex-Dimapur transport",
        "Hornbill festival entry"
      ],
      additionalActivities: ["Dzukou Valley Trek", "Cultural Workshops"]
    },
    {
      id: "hornbill-premium",
      name: "Hornbill Premium Experience",
      duration: {
        days: 4,
        nights: 3
      },
      price: 9299,
      description: "Complete Hornbill and Dzukou Valley experience",
      inclusions: [
        "Camping stays",
        "All meals",
        "Dzukou trek",
        "Ex-Dimapur transport",
        "Extended festival access",
        "Cultural workshops"
      ]
    }
  ],

  baseInclusions: [
    "Stay on twin/triple sharing basis",
    "Breakfast",
    "Dinner",
    "Trip leader and Local guide",
    "Tents & Blankets",
    "Guide fees",
    "Permits"
  ],

  baseExclusions: [
    "Flight/Train tickets",
    "Personal Expenses",
    "Camera fees",
    "Lunch",
    "Any other food or beverage charges not mentioned",
    "Festival entry fees",
    "Costs due to natural calamities"
  ],

  thingsToCarry: [
    "Comfortable walking shoes",
    "Warm clothes",
    "Camera",
    "Valid ID proof",
    "Cash for personal expenses",
    "Basic medications"
  ],

  importantNote: "50% advance payment required for booking confirmation. Festival entry tickets to be purchased separately at the venue.",
  difficulty: "Easy"
};