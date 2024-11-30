// data/team/team-data.ts
import { TeamSection, TeamMember } from '@/types/team/team';

export const teamMembers: TeamMember[] = [
  {
    id: 'ss-001',
    name: 'Sandeep Sonowal',
    roles: ['Founder', 'Lead Explorer'],
    image: '/images/team/Sandeep_2.jpg', // Update with actual image path
    location: {
      city: 'Dibrugarh',
      state: 'Assam'
    },
    expertise: ['Adventure Treks', 'Cultural Tours', 'Local History'],
    bio: 'Native to Assam with over 8 years of experience leading expeditions across Northeast India. Passionate about showcasing the region\'s hidden gems and preserving local traditions.',
    languages: ['English', 'Hindi', 'Assamese'],
    yearsOfExperience: 8,
    featured: true,
    social: [
      {
        platform: 'instagram',
        handle: '@travelwith_82',
        url: 'https://instagram.com/travelwith_82'
      }
    ],
    achievements: [
      {
        title: 'First documented trek to Dong Valley',
        year: 2019,
        description: 'Led the first documented tourist group to witness India\'s first sunrise'
      }
    ]
  },
  // Add more team members
];

export const teamSectionData: TeamSection = {
  title: 'Meet Our Team',
  subtitle: 'Local Experts & Passionate Explorers',
  description: 'Our team comprises native Northeast Indians who bring deep local knowledge and genuine passion for sharing our region\'s beauty and culture.',
  members: teamMembers,
  layout: 'grid',
  filters: {
    regions: ['Assam', 'Arunachal Pradesh', 'Meghalaya'],
    expertise: ['Adventure Treks', 'Cultural Tours', 'Photography Tours'],
    roles: ['Founder', 'Lead Explorer', 'Senior Guide', 'Cultural Expert']
  }
};