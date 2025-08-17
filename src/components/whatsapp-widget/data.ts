// data.ts - Quick Actions data with Ziro Festival highlighted
import { QuickActionCategory } from './types';

export const quickActionCategories: QuickActionCategory[] = [
  {
    id: 'festivals',
    title: 'Festival Tours',
    icon: '🎵',
    actions: [
      {
        id: 'ziro-festival',
        label: '🔥 Ziro Music Festival 2025',
        icon: '🎵',
        category: 'tours',
        message: "I'm interested in Ziro Music Festival 2025! This looks amazing. Can you share:\n• Accommodation options (Dome/Alpine tents)\n• Festival packages & pricing\n• Travel arrangements\n• What's included in packages\n• Best booking options\n\nI'd love to experience this unique music festival in the UNESCO site! 🎶🏔️"
      },
      {
        id: 'hornbill-festival',
        label: 'Hornbill Festival',
        icon: '🎭',
        category: 'tours', 
        message: "I'd like to know about Hornbill Festival tour packages and cultural experiences."
      },
      {
        id: 'orange-festival',
        label: 'Orange Festival (OFAM)',
        icon: '🍊',
        category: 'tours',
        message: "Tell me about the Orange Festival tour packages in Dambuk!"
      }
    ]
  },
  {
    id: 'destinations',
    title: 'Popular Destinations',
    icon: '🏔️',
    actions: [
      {
        id: 'tawang',
        label: 'Tawang Monastery',
        icon: '🏔️',
        category: 'destinations',
        message: "I want to visit Tawang Monastery and explore the Himalayan region. What tour options do you have?"
      },
      {
        id: 'mechuka',
        label: 'Mechuka Valley',
        icon: '🏞️',
        category: 'destinations',
        message: "I'm interested in exploring Mechuka Valley. Can you help plan my trip?"
      },
      {
        id: 'anini',
        label: 'Anini Dibang Valley',
        icon: '🌿',
        category: 'destinations',
        message: "I'd like to trek to Anini and explore Dibang Valley. What are the tour options?"
      },
      {
        id: 'dong-valley',
        label: 'Dong Valley (First Sunrise)',
        icon: '🌅',
        category: 'destinations',
        message: "I want to witness India's first sunrise at Dong Valley! Can you arrange this trip?"
      }
    ]
  },
  {
    id: 'tour-types',
    title: 'Tour Types',
    icon: '🎒',
    actions: [
      {
        id: 'adventure',
        label: 'Adventure Tours',
        icon: '🏔️',
        category: 'tours',
        message: "I'm looking for adventure tours in Northeast India - trekking, camping, and outdoor activities."
      },
      {
        id: 'cultural',
        label: 'Cultural Tours', 
        icon: '🎭',
        category: 'tours',
        message: "I want to experience the rich culture and traditions of Northeast India with local communities."
      },
      {
        id: 'photography',
        label: 'Photography Tours',
        icon: '📸',
        category: 'tours',
        message: "I'm interested in photography tours to capture the beauty of Northeast India."
      }
    ]
  },
  {
    id: 'planning',
    title: 'Trip Planning',
    icon: '📅',
    actions: [
      {
        id: 'availability',
        label: 'Check Availability',
        icon: '📅',
        category: 'planning',
        message: "Can you check availability for my preferred travel dates and suggest the best time to visit?"
      },
      {
        id: 'pricing',
        label: 'Get Pricing',
        icon: '💰',
        category: 'planning',
        message: "I'd like to know the pricing for different tour packages and what's included."
      },
      {
        id: 'custom',
        label: 'Custom Itinerary',
        icon: '📋',
        category: 'planning',
        message: "I need a custom itinerary planned according to my interests and budget."
      },
      {
        id: 'permits',
        label: 'Permit Assistance',
        icon: '🎫',
        category: 'planning',
        message: "I need help with Inner Line Permits and other documentation for Northeast India."
      }
    ]
  },
  {
    id: 'help',
    title: 'Quick Help',
    icon: '❓',
    actions: [
      {
        id: 'general',
        label: 'General Inquiry',
        icon: '❓',
        category: 'help',
        message: "Hi! I have some questions about traveling to Northeast India. Can you help?"
      },
      {
        id: 'callback',
        label: 'Request Call Back',
        icon: '📞',
        category: 'help',
        message: "Please call me back to discuss my travel plans. Here's my number:"
      },
      {
        id: 'email',
        label: 'Email Details',
        icon: '📧',
        category: 'help',
        message: "Please email me detailed information about your tour packages."
      }
    ]
  }
];
