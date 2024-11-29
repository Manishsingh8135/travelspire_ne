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
      id: '1',
      content: "Our journey to Dong Valley was nothing short of magical. Witnessing India's first sunrise was a surreal experience that will stay with me forever. The local homestay experience and our guide's knowledge of the area made this trip extraordinary.",
      author: {
        name: 'Priya Sharma',
        age: 28,
        location: 'Mumbai, Maharashtra',
        avatar: 'https://images.unsplash.com/photo-1732496742791-8e3e7ba5c385?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        verified: true,
        travelStyle: ['Adventure Seeker', 'Photography Enthusiast'],
        previousTrips: 3
      },
      travelDetails: {
        tourName: 'Dong Valley Expedition',
        destination: 'Arunachal Pradesh',
        tripType: 'Adventure Trek',
        duration: '4 Days',
        travelDate: '2024-02-15',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          guide: 5,
          accommodation: 4,
          transportation: 5,
          valueForMoney: 5,
          foodAndCuisine: 4
        }
      },
      highlights: [
        {
          title: 'Sunrise at Dong Valley',
          description: "The ethereal experience of witnessing India's first sunrise",
          rating: 5
        },
        {
          title: 'Local Homestay',
          description: 'Authentic experience with a warm local family',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517517966484-49836a7ccf26?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          caption: 'First light at Dong Valley',
          location: 'Dong Valley',
          tags: ['Sunrise', 'Mountains', 'Nature']
        },
        {
          type: 'video',
          url: '/testimonials/trek-highlights.mp4',
          thumbnail: '/testimonials/trek-thumbnail.jpg',
          caption: 'Trek highlights'
        }
      ],
      featured: true,
      recommendationScore: 9,
      tips: [
        'Pack proper trekking shoes',
        'Carry a good camera for sunrise shots',
        "Don't miss the local rice wine"
      ],
      activities: [
        'Sunrise viewing',
        'Village walks',
        'Local cuisine tasting',
        'Cultural interactions'
      ],
      datePosted: '2024-02-20',
      languages: ['English', 'Hindi'],
      response: {
        content: 'Thank you for sharing your beautiful experience, Priya! Your sunrise photos are breathtaking.',
        author: 'Travelspire Team',
        date: '2024-02-21'
      }
    },
    {
      id: '2',
      content: 'Tawang was a revelation! The majestic monastery, snow-capped peaks, and serene lakes created an unforgettable spiritual journey. Our guide\'s deep knowledge of Buddhist culture and local traditions enhanced every moment. The sunrise at Sela Pass was particularly breathtaking.',
      author: {
        name: 'Rahul Mehta',
        age: 34,
        location: 'Bangalore, Karnataka',
        avatar: '/testimonials/rahul-mehta.jpg',
        verified: true,
        travelStyle: ['Culture Explorer', 'Nature Lover'],
        previousTrips: 5
      },
      travelDetails: {
        tourName: 'Tawang Monastery Trail',
        destination: 'Arunachal Pradesh',
        tripType: 'Cultural Tour',
        duration: '5 Days',
        travelDate: '2024-01-10',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          guide: 5,
          accommodation: 5,
          transportation: 4,
          valueForMoney: 5,
          foodAndCuisine: 5
        }
      },
      highlights: [
        {
          title: 'Tawang Monastery',
          description: 'The largest monastery in India - a spiritual marvel',
          rating: 5
        },
        {
          title: 'Sela Pass Views',
          description: 'Stunning panoramas at 13,700 feet',
          rating: 5
        }
      ],
      media: [
        {
          type: 'video',
          url: '/testimonials/tawang-monastery-tour.mp4',
          thumbnail: '/testimonials/tawang-thumbnail.jpg',
          caption: 'A spiritual journey through Tawang',
          location: 'Tawang Monastery'
        },
        {
          type: 'image',
          url: '/testimonials/sela-pass-sunrise.jpg',
          caption: 'Magical sunrise at Sela Pass',
          location: 'Sela Pass',
          tags: ['Mountains', 'Sunrise', 'Snow']
        }
      ],
      featured: true,
      recommendationScore: 10,
      tips: [
        'Carry warm clothes even in summer',
        'Learn basic Buddhist etiquette',
        'Try the local thukpa and momos',
        'Take altitude sickness precautions'
      ],
      activities: [
        'Monastery visits',
        'Prayer wheel spinning',
        'Local market exploration',
        'Mountain photography'
      ],
      datePosted: '2024-01-25',
      languages: ['English', 'Hindi', 'Gujarati'],
      response: {
        content: 'Thank you for such a detailed review, Rahul! We\'re glad you enjoyed the spiritual aspect of the journey.',
        author: 'Travelspire Team',
        date: '2024-01-26'
      }
    },
    {
      id: '3',
      content: 'Living with the Angami tribe during the Hornbill Festival was like stepping into another world. The cultural performances, traditional games, and local delicacies made this the most immersive travel experience of my life. Nagaland\'s hospitality is unmatched!',
      author: {
        name: 'Sneha Krishnan',
        age: 29,
        location: 'Chennai, Tamil Nadu',
        avatar: '/testimonials/sneha-krishnan.jpg',
        verified: true,
        travelStyle: ['Culture Explorer', 'Photography Enthusiast'],
        previousTrips: 2
      },
      travelDetails: {
        tourName: 'Hornbill Festival Special',
        destination: 'Nagaland',
        tripType: 'Cultural Tour',
        duration: '7 Days',
        travelDate: '2023-12-05',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          guide: 5,
          accommodation: 4,
          transportation: 5,
          valueForMoney: 5,
          foodAndCuisine: 5
        }
      },
      highlights: [
        {
          title: 'Hornbill Festival',
          description: 'Festival of Festivals - a cultural extravaganza',
          rating: 5
        },
        {
          title: 'Village Homestay',
          description: 'Living with an Angami family',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: '/testimonials/hornbill-festival.jpg',
          caption: 'Traditional dance performance',
          location: 'Kisama Heritage Village',
          tags: ['Culture', 'Festival', 'Traditional']
        },
        {
          type: 'video',
          url: '/testimonials/nagaland-cuisine.mp4',
          thumbnail: '/testimonials/food-thumbnail.jpg',
          caption: 'Exploring Naga cuisine'
        }
      ],
      featured: true,
      recommendationScore: 9,
      tips: [
        'Book well in advance for the festival',
        'Try the local rice beer',
        'Respect tribal customs',
        'Bring a good camera'
      ],
      activities: [
        'Festival attendance',
        'Tribal village visits',
        'Traditional cooking class',
        'Cultural photography'
      ],
      datePosted: '2023-12-20',
      languages: ['English', 'Tamil'],
      response: {
        content: 'We\'re delighted that you got to experience the true essence of Naga culture, Sneha!',
        author: 'Travelspire Team',
        date: '2023-12-21'
      }
    },
    {
      id: '4',
      content: 'Exploring the living root bridges of Meghalaya was like walking through a fantasy world. The Double Decker Root Bridge trek was challenging but absolutely worth it. Swimming in the crystal-clear pools and experiencing the local Khasi lifestyle made this trip unforgettable.',
      author: {
        name: 'Aditya Kapoor',
        age: 31,
        location: 'Delhi, NCR',
        avatar: '/testimonials/aditya-kapoor.jpg',
        verified: true,
        travelStyle: ['Adventure Seeker', 'Nature Lover'],
        previousTrips: 4
      },
      travelDetails: {
        tourName: 'Meghalaya Root Bridge Adventure',
        destination: 'Meghalaya',
        tripType: 'Adventure Trek',
        duration: '6 Days',
        travelDate: '2024-03-01',
        season: 'Spring'
      },
      rating: {
        overall: 5,
        categories: {
          guide: 5,
          accommodation: 4,
          transportation: 4,
          valueForMoney: 5,
          foodAndCuisine: 5
        }
      },
      highlights: [
        {
          title: 'Double Decker Root Bridge',
          description: 'A natural wonder crafted by generations',
          rating: 5
        },
        {
          title: 'Rainbow Falls',
          description: 'Pristine waterfall with natural pools',
          rating: 5
        }
      ],
      media: [
        {
          type: 'video',
          url: '/testimonials/root-bridge-trek.mp4',
          thumbnail: '/testimonials/trek-thumbnail.jpg',
          caption: 'Journey to the Double Decker Root Bridge',
          location: 'Nongriat Village'
        },
        {
          type: 'image',
          url: '/testimonials/rainbow-falls.jpg',
          caption: 'Swimming in Rainbow Falls',
          location: 'Nongriat',
          tags: ['Waterfall', 'Nature', 'Adventure']
        }
      ],
      featured: false,
      recommendationScore: 9,
      tips: [
        'Train for the 3500-step trek',
        'Carry waterproof bags',
        'Start early in the morning',
        'Pack water shoes for river crossing'
      ],
      activities: [
        'Root bridge trekking',
        'Waterfall swimming',
        'Village exploration',
        'Local market visits'
      ],
      datePosted: '2024-03-15',
      languages: ['English', 'Hindi'],
      response: {
        content: 'Thank you for capturing the magic of Meghalaya so beautifully, Aditya!',
        author: 'Travelspire Team',
        date: '2024-03-16'
      }
    },
    {
      id: '5',
      content: 'Our wildlife safari in Kaziranga exceeded all expectations! Spotting one-horned rhinos, wild elephants, and even tigers was incredible. The early morning elephant safari offered a unique perspective of the park. The local Assamese hospitality and cuisine were cherries on top.',
      author: {
        name: 'Maya and Rohan Patel',
        location: 'Ahmedabad, Gujarat',
        avatar: '/testimonials/patel-family.jpg',
        verified: true,
        travelStyle: ['Nature Lover', 'Photography Enthusiast'],
        previousTrips: 1
      },
      travelDetails: {
        tourName: 'Kaziranga Wildlife Explorer',
        destination: 'Assam',
        tripType: 'Wildlife Safari',
        duration: '4 Days',
        travelDate: '2024-02-20',
        season: 'Winter'
      },
      rating: {
        overall: 5,
        categories: {
          guide: 5,
          accommodation: 5,
          transportation: 5,
          valueForMoney: 5,
          foodAndCuisine: 4
        }
      },
      highlights: [
        {
          title: 'Rhino Sighting',
          description: 'Close encounters with the majestic one-horned rhinos',
          rating: 5
        },
        {
          title: 'Elephant Safari',
          description: 'Unique perspective of the park at dawn',
          rating: 5
        }
      ],
      media: [
        {
          type: 'image',
          url: '/testimonials/kaziranga-rhino.jpg',
          caption: 'One-horned rhino in its natural habitat',
          location: 'Kaziranga National Park',
          tags: ['Wildlife', 'Nature', 'Safari']
        },
        {
          type: 'video',
          url: '/testimonials/elephant-safari.mp4',
          thumbnail: '/testimonials/safari-thumbnail.jpg',
          caption: 'Morning elephant safari experience'
        }
      ],
      featured: true,
      recommendationScore: 10,
      tips: [
        'Book safaris in advance',
        'Bring good binoculars',
        'Wear earth-toned clothes',
        "Don't miss the tea garden visit"
      ],
      activities: [
        'Jeep safari',
        'Elephant safari',
        'Bird watching',
        'Tea garden tour',
        'Local cuisine tasting'
      ],
      datePosted: '2024-03-01',
      languages: ['English', 'Gujarati'],
      response: {
        content: 'We\'re thrilled that you had such amazing wildlife encounters, Maya and Rohan!',
        author: 'Travelspire Team',
        date: '2024-03-02'
      }
    }
    // ... you can continue adding more testimonials based on your needs
  ],
  filters: {
    destinations: ['Arunachal Pradesh', 'Assam', 'Meghalaya'],
    tripTypes: ['Adventure Trek', 'Cultural Tour'],
    seasons: ['Winter', 'Spring']
  },
  viewOptions: {
    showRatings: true,
    showAuthorDetails: true,
    showTravelDetails: true,
    showMedia: true,
    showTips: true
  }
};
