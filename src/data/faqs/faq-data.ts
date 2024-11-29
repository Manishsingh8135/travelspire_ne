// data/faqs/faq-data.ts
import { FAQSection } from "@/types/faqs/faq";

export const faqData: FAQSection = {
  title: "Common Travel Questions",
  description: "Find answers to frequently asked questions about traveling in Northeast India. If you can't find what you're looking for, feel free to contact our team.",
  faqs: [
    {
      id: "1",
      question: "Do I need special permits to visit Northeast India?",
      answer: "Yes, most states in Northeast India require permits. Arunachal Pradesh requires an Inner Line Permit (ILP), while Nagaland and Mizoram have their own permit systems. We assist in arranging all necessary permits for our tours.",
      category: "permits"
    },
    {
      id: "2", 
      question: "What's the best time to visit Northeast India?",
      answer: "The best time to visit is from October to April when the weather is pleasant and dry. However, specific destinations may have different optimal seasons. For instance, Tawang is beautiful in winter (November-February), while Kaziranga is best visited between November and April.",
      category: "planning"
    },
    {
      id: "3",
      question: "How do your payment and cancellation policies work?",
      answer: "We require a 50% advance payment to confirm your booking. The remaining balance is due 30 days before the tour start date. Cancellations made 30+ days before departure receive a 90% refund, 15-29 days receive 50%, and less than 15 days receive no refund.",
      category: "booking"
    },
    {
      id: "4",
      question: "Are your tours suitable for solo travelers?",
      answer: "Absolutely! Many of our tours are perfect for solo travelers. We offer both group tours where you can meet fellow travelers and customized private tours. We ensure safety, comfortable accommodations, and expert local guides for all our solo travelers.",
      category: "travelers"
    },
    {
      id: "5",
      question: "What level of fitness is required for your tours?",
      answer: "Our tours vary in difficulty. Cultural tours require basic fitness for walking and sightseeing. Adventure tours like trekking in Arunachal Pradesh require moderate to high fitness levels. Each tour listing includes a detailed fitness requirement section.",
      category: "requirements"
    },
    {
      id: "6",
      question: "What's included in the tour price?",
      answer: "Our tour prices typically include accommodation, transportation within the region, guided activities, permits, and some meals (specified in each itinerary). International/domestic flights, visa fees, personal expenses, and some meals are usually not included.",
      category: "pricing"
    },
    {
      id: "7",
      question: "How do you ensure responsible tourism?",
      answer: "We work closely with local communities, employ local guides, use homestays where possible, and follow eco-friendly practices. We limit group sizes to minimize environmental impact and ensure our tours contribute positively to local economies.",
      category: "sustainability"
    },
    {
      id: "8",
      question: "What about food and dietary requirements?",
      answer: "We can accommodate various dietary requirements with advance notice. Northeast Indian cuisine is diverse, with many vegetarian options. We ensure safe, clean food preparation and can arrange special meals for those with specific dietary restrictions.",
      category: "food"
    },
    {
      id: "9",
      question: "How safe is traveling in Northeast India?",
      answer: "Northeast India is generally safe for tourists. Our guides are well-versed with local customs and areas. We maintain constant communication with local authorities and only operate in regions cleared for tourism. We also provide 24/7 emergency support during tours.",
      category: "safety"
    }
  ]
};

export const bookingFAQs: FAQSection = {
  title: "Booking & Payments",
  description: "Essential information about booking your Northeast India adventure.",
  faqs: [
    {
      id: "b1",
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, major credit cards, and UPI payments. International payments can be made via wire transfer or international credit cards.",
      category: "payments"
    },
    {
      id: "b2",
      question: "Can I customize a tour package?",
      answer: "Yes! We specialize in creating customized itineraries. Contact us with your preferences, timeframe, and interests, and we'll design a perfect tour for you.",
      category: "customization"
    }
  ]
};

export const permitsFAQs: FAQSection = {
  title: "Travel Permits & Documentation",
  description: "Important information about required permits and documents for Northeast India.",
  faqs: [
    {
      id: "p1",
      question: "How long does it take to get an ILP?",
      answer: "Inner Line Permits (ILP) typically take 3-4 working days to process. We handle the application process for all our guests and recommend applying at least 2 weeks before your travel date.",
      category: "permits"
    }
  ]
};