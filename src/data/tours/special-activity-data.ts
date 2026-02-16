// data/tours/special-activity-data.ts
import { SpecialActivityTour } from "@/types/tours/tour";

export const dambukOrangeFestival: SpecialActivityTour = {
  id: "dambuk-ofam-2024",
  slug: "dambuk-ofam-2024",
  type: "FruitFestival",
  activityType: "Multi-Activity Festival",
  title: "OFAM Tour Package",
  subtitle: "Let's Travel Together",
  overview: "Sweet, fragrant, juicy oranges fill the landscape of Dambuk, Also called the orange bowl of the state. Dambuk is well on its way to international fame for producing some of the best oranges in the country. Experience the perfect blend of nature, culture, and adventure in this unique festival.",
  location: "Dambuk, Arunachal Pradesh",
  featured: true,

  eventDates: {
    start: "2024-12-13",
    end: "2024-12-15",
    year: 2024
  },

  heroImage: "/images/places/anini/Anini_1.JPG",
  thumbnail: "/images/places/anini/Anini_2.JPG",
  gallery: [
    "/images/places/anini/Anini_4.JPG",
    "/images/places/anini/Anini_5.JPG",
    "/images/places/anini/Anini_6.JPG",
   
  ],

  highlights: [
    "Dambuk OFAM & Sikang Boggo",
    "Mayodia Pass & Anini",
    "Golden Pagoda",
    "Parsuram Kund",
    "Dong Valley"
  ],

  activityHighlights: [
    "Orange farm visits",
    "Adventure activities",
    "Cultural performances",
    "Local cuisine exploration",
    "Photography opportunities"
  ],

  variants: [
    {
      id: "ofam-basic",
      name: "OFAM Basic Package",
      duration: {
        days: 3,
        nights: 2
      },
      price: 1500,
      description: "Essential festival experience",
      inclusions: [
        "Homestay & Camping",
        "Healthy Breakfast",
        "Transportation cost",
        "Tour Guide",
        "Inner line permits"
      ]
    }
  ],

  baseInclusions: [
    "Homestay & Camping accommodations",
    "Healthy Breakfast",
    "Transportation cost",
    "Tour Guide",
    "Inner line permits"
  ],

  baseExclusions: [
    "Flight/Train tickets",
    "Personal Expenses",
    "Additional activities",
    "Lunch and Dinner",
    "Camera fees",
    "Items not mentioned in inclusions"
  ],

  thingsToCarry: [
    "Comfortable clothing",
    "Camera",
    "Valid ID proof",
    "Cash for personal expenses",
    "Basic medications",
    "Warm clothes"
  ],

  importantNote: "Advance booking required. Package subject to weather conditions and local festival schedule.",
  difficulty: "Easy"
};

export const dambukBikeTour: SpecialActivityTour = {
  id: "dambuk-bike-tour-2024",
  slug: "dambuk-bike-tour-2024",
  type: "BikeTrip",
  activityType: "Motorcycle Tour",
  title: "Bike Tour - Dambuk",
  subtitle: "Experience Dambuk on Two Wheels",
  overview: "Experience the thrill of riding through scenic routes of Dambuk, combining adventure with the beauty of orange orchards and mountain landscapes.",
  location: "Dambuk, Arunachal Pradesh",
  featured: false,

  eventDates: {
    start: "2024-11-23",
    end: "2024-11-24",
    year: 2024
  },

  heroImage: "/images/places/anini/Anini_7.JPG",
  thumbnail: "/images/places/anini/Anini_8.JPG",
  gallery: [
    "/images/places/anini/Anini_1.JPG",
    "/images/places/anini/Anini_1.JPG",
    "/images/places/dambuk/bike3.jpg"
  ],

  highlights: [
    "Scenic mountain rides",
    "Orange farm visits",
    "Adventure trails",
    "Local culture experience"
  ],

  activityHighlights: [
    "Off-road biking",
    "Orange farm exploration",
    "Photography stops",
    "Local interaction"
  ],

  variants: [
    {
      id: "bike-basic",
      name: "Bike Tour Basic",
      duration: {
        days: 2,
        nights: 1
      },
      price: 1500,
      description: "Basic bike tour package",
      inclusions: [
        "Ride captain",
        "Healthy breakfast",
        "Dinner",
        "Cottages & Camping"
      ]
    }
  ],

  baseInclusions: [
    "Ride captain",
    "Healthy breakfast",
    "Dinner",
    "Cottages & Camping"
  ],

  baseExclusions: [
    "Bike rental",
    "Fuel costs",
    "Personal expenses",
    "Additional meals"
  ],

  specialEquipment: [
    "Riding gear",
    "Helmet",
    "Protective equipment",
    "Rain gear"
  ],

  thingsToCarry: [
    "Riding gear",
    "Valid driving license",
    "ID proof",
    "Basic tools",
    "First aid kit"
  ],

  importantNote: "Own bike or rental arrangement required. Tour subject to weather conditions.",
  difficulty: "Moderate"
};