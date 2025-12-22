// Permits Data Index
// Export all state-specific permit data

export { arunachalPermitData } from './arunachal-data';
export { nagalandPermitData } from './nagaland-data';
export { mizoramPermitData } from './mizoram-data';
export { manipurPermitData } from './manipur-data';
export { sikkimPermitData } from './sikkim-data';

// State permit page slugs for sitemap and navigation
export const statePermitPages = [
  {
    state: "Arunachal Pradesh",
    slug: "arunachal-pradesh-ilp",
    permitType: "ILP",
    priority: 0.9,
  },
  {
    state: "Nagaland",
    slug: "nagaland-ilp",
    permitType: "ILP",
    priority: 0.85,
  },
  {
    state: "Mizoram",
    slug: "mizoram-ilp",
    permitType: "ILP",
    priority: 0.85,
  },
  {
    state: "Manipur",
    slug: "manipur-ilp",
    permitType: "ILP",
    priority: 0.85,
  },
  {
    state: "Sikkim",
    slug: "sikkim-permit",
    permitType: "PAP",
    priority: 0.85,
  },
];
