// data/testimonials/testimonial-data.ts
import { TestimonialSection } from "@/types/testimonials/testimonial";

export const testimonialData: TestimonialSection = {
  id: 'featured-testimonials',
  title: 'Travel Stories That Inspire',
  subtitle: 'Authentic experiences from our adventurers',
  description: 'Discover the magic of Northeast India through the eyes of our travelers. Real stories, real experiences, unforgettable memories.',
  layout: 'carousel',
  style: 'immersive',
  theme: 'dark',
  testimonials: [
    {
      id: 'tawang-2024',
      content: "Words can't capture the profound peace I found at Tawang Monastery. Watching the morning prayers, with hundreds of butter lamps flickering and young monks going about their daily rituals - it felt like time stood still. The drive through Sela Pass with its dramatic views was an adventure in itself. What truly touched me was the evening I spent with a local family, sharing butter tea and listening to stories of their ancestors. Their warmth made -10°C feel cozy!",
      author: {
        name: 'Arjun Nair',
        age: 34,
        location: 'Bangalore, Karnataka',
        avatar: '',
        verified: true,
        travelStyle: ['Culture Explorer', 'Photography Enthusiast'],
        previousTrips: 3
      },
      travelDetails: {
        tourName: 'Tawang Monastery & Culture Tour',
        destination: 'Arunachal Pradesh',
        tripType: 'Cultural Tour',
        duration: '7 days',
        travelDate: 'January 2024',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          accommodation: 4,
          guide: 5,
          transportation: 4,
          valueForMoney: 5,
          foodAndCuisine: 5
        }
      },
      highlights: [
        {
          title: 'Monastery Experience',
          description: 'Participating in morning prayers at Tawang Monastery',
          rating: 5
        },
        {
          title: 'Local Connection',
          description: 'Home-cooked dinner with a Monpa family',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: '/images/places/tawang/Tawang_6.PNG',
          caption: 'Sunrise at Tawang Monastery',
          location: 'Tawang, Arunachal Pradesh'
        }
      ],
      featured: true,
      datePosted: '2024-02-15',
      tips: [
        'Pack extra warm layers for early morning monastery visits',
        'Try the local thukpa and momos at the market'
      ]
    },
    {
      id: 'dong-2024',
      content: "Being at Dong Valley to witness India's first sunrise was a bucket list experience! Our guide woke us at 3 AM, and the anticipation built as we hiked up in darkness. The moment when golden rays pierced through the clouds, lighting up the Brahmaputra valley below - pure magic! But what surprised me most was the incredible biodiversity. Our naturalist guide spotted the rare red panda, and the variety of orchids was mind-blowing. The local Meyor community's stories about living in India's easternmost village added such rich context to the experience.",
      author: {
        name: 'Meera Desai',
        age: 29,
        location: 'Pune, Maharashtra',
        avatar: '',
        verified: true,
        travelStyle: ['Nature Lover', 'Adventure Seeker'],
        previousTrips: 1
      },
      travelDetails: {
        tourName: 'Dong Valley Sunrise Trek',
        destination: 'Arunachal Pradesh',
        tripType: 'Adventure Trek',
        duration: '5 days',
        travelDate: 'December 2023',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          accommodation: 4,
          guide: 5,
          transportation: 4,
          valueForMoney: 5,
          foodAndCuisine: 4
        }
      },
      highlights: [
        {
          title: 'First Light',
          description: "Witnessing India's first sunrise from Dong Valley",
          rating: 5
        },
        {
          title: 'Wildlife Encounter',
          description: 'Spotting the elusive red panda in its natural habitat',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: '/images/places/dong/Dong_3.jpg',
          caption: 'First light at Dong Valley',
          location: 'Dong, Arunachal Pradesh'
        }
      ],
      featured: true,
      datePosted: '2024-01-10',
      tips: [
        'Start the sunrise trek early to get the best spot',
        'Bring a good camera with low-light capabilities'
      ]
    },
    {
      id: 'anini-2024',
      content: "Anini was the off-beat adventure I'd been searching for! The 4x4 journey through misty mountains and dense forests was thrilling. We spent days exploring hidden waterfalls and meeting the Idu Mishmi people. The highlight? A day spent learning traditional bamboo craft from village elders. Their sustainable way of life and deep connection to the land was eye-opening. Even saw snow leopard pug marks during our trek! The basic accommodations didn't matter when we had million-star views every night.",
      author: {
        name: 'Kabir Mathur',
        age: 31,
        location: 'Delhi, NCR',
        avatar: '',
        verified: true,
        travelStyle: ['Adventure Seeker', 'Culture Explorer'],
        previousTrips: 2
      },
      travelDetails: {
        tourName: 'Anini Cultural & Wildlife Expedition',
        destination: 'Arunachal Pradesh',
        tripType: 'Adventure Trek',
        duration: '8 days',
        travelDate: 'October 2023',
        season: 'Autumn'
      },
      rating: {
        overall: 5,
        categories: {
          accommodation: 3,
          guide: 5,
          transportation: 4,
          valueForMoney: 5,
          foodAndCuisine: 4
        }
      },
      highlights: [
        {
          title: 'Cultural Immersion',
          description: 'Learning bamboo craft from Idu Mishmi artisans',
          rating: 5
        },
        {
          title: 'Wildlife Tracking',
          description: 'Finding snow leopard tracks on our highland trek',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: '/images/places/anini/Anini_4.JPG',
          caption: 'Sunset over Anini Valley',
          location: 'Anini, Arunachal Pradesh'
        }
      ],
      featured: true,
      datePosted: '2023-11-20',
      tips: [
        'Respect local customs when visiting Idu Mishmi homes',
        'Pack light but bring good hiking boots'
      ]
    }
  ],
  filters: {
    destinations: ['Arunachal Pradesh'],
    tripTypes: ['Adventure Trek', 'Cultural Tour'],
    seasons: ['Winter', 'Autumn']
  },
  viewOptions: {
    showRatings: true,
    showAuthorDetails: true,
    showTravelDetails: true,
    showMedia: true,
    showTips: true
  }
};
