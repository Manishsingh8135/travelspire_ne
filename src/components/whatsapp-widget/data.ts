// data.ts - Quick Actions data for WhatsApp widget
import { QuickActionCategory } from './types';

export const quickActionCategories: QuickActionCategory[] = [
  {
    id: 'popular',
    title: '🌟 Most Popular',
    icon: '⭐',
    actions: [
      {
        id: 'plan-trip',
        label: '🗓️ Plan My Trip',
        icon: '📅',
        category: 'planning',
        message: "Hi TravelSpire NE! 👋\n\nI'd like to plan a trip to Northeast India. Can you help me with:\n• Best time to visit\n• Tour recommendations\n• Pricing & availability\n• Permit assistance\n\nLooking forward to an amazing adventure! 🏔️✨"
      },
      {
        id: 'check-availability',
        label: '📅 Check Availability',
        icon: '✓',
        category: 'planning',
        message: "Hi! I'd like to check tour availability for my preferred dates and get recommendations for the best time to visit."
      },
      {
        id: 'custom-itinerary',
        label: '✨ Custom Itinerary',
        icon: '📋',
        category: 'planning',
        message: "I need a custom itinerary planned for Northeast India based on my interests, budget, and travel dates. Can we discuss?"
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
    title: '🎒 Tour Categories',
    icon: '🎯',
    actions: [
      {
        id: 'adventure',
        label: 'Adventure Tours',
        icon: '🏔️',
        category: 'tours',
        message: "I'm looking for adventure tours - trekking, camping, and outdoor activities in Northeast India."
      },
      {
        id: 'cultural',
        label: 'Cultural Experiences', 
        icon: '🎭',
        category: 'tours',
        message: "I want to experience the rich culture and traditions of Northeast India with local communities."
      },
      {
        id: 'festivals',
        label: 'Festival Tours',
        icon: '🎵',
        category: 'tours',
        message: "I'm interested in experiencing cultural festivals in Northeast India. What festivals do you cover?"
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
    id: 'help',
    title: '❓ Need Help?',
    icon: '💬',
    actions: [
      {
        id: 'permits',
        label: 'Permit Assistance',
        icon: '🎫',
        category: 'planning',
        message: "I need help with Inner Line Permits (ILP) and Protected Area Permits (PAP) for Northeast India."
      },
      {
        id: 'pricing',
        label: 'Get Pricing',
        icon: '💰',
        category: 'planning',
        message: "I'd like to know the pricing for different tour packages and what's included."
      },
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
      }
    ]
  }
];
