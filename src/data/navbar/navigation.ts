// src/data/navigation.ts
import { NavigationData } from "@/types/navbar/navigation";
import { 
    Compass, 
    Map, 
    Calendar, 
    Info, 
    Phone, 
    Search, 
    Bell, 
    UserCircle,
    Mountain,
    Tent,
    Camera,
    Bird,
    TreePine,
    Footprints,
    Hotel,
    Car,
    Music,
    Shield
  } from "lucide-react";
  
  export const navigationData: NavigationData = {
    primary: [
      { 
        name: "All Tours", 
        href: "/all-tours",
        icon: Map 
      },
      { 
        name: "Festivals", 
        href: "/all-tours?category=Festival",
        icon: Music 
      },
      /* Temporarily hidden - Destinations
      {
        name: "Destinations",
        href: "/destinations",
        icon: Compass,
        submenu: [
          { 
            name: "Arunachal Pradesh", 
            href: "/destinations/arunachal-pradesh",
            icon: Mountain,
            description: "Land of Dawn-Lit Mountains"
          },
          { 
            name: "Assam", 
            href: "/destinations/assam",
            icon: TreePine,
            description: "Gateway to Northeast"
          },
          { 
            name: "Meghalaya", 
            href: "/destinations/meghalaya",
            icon: Bird,
            description: "Abode of Clouds"
          },
        ],
      },
      */
      /* Temporarily hidden - Tours
      {
        name: "Tours",
        href: "/tours",
        icon: Map,
        submenu: [
          { 
            name: "Adventure Tours", 
            href: "/tours/adventure",
            icon: Tent,
            description: "Trekking, Camping & More"
          },
          { 
            name: "Cultural Tours", 
            href: "/tours/cultural",
            icon: Footprints,
            description: "Experience Local Life"
          },
          { 
            name: "Photography Tours", 
            href: "/tours/photography",
            icon: Camera,
            description: "Capture the Beauty"
          },
        ],
      },
      */
      /* Temporarily hidden - Plan Your Trip
      {
        name: "Plan Your Trip",
        href: "/plan",
        icon: Calendar,
        submenu: [
          { 
            name: "Accommodations", 
            href: "/plan/stay",
            icon: Hotel,
            description: "Where to Stay"
          },
          { 
            name: "Transportation", 
            href: "/plan/transport",
            icon: Car,
            description: "How to Get Around"
          },
        ],
      },
      */
      { 
        name: "Permits", 
        href: "/permits",
        icon: Shield,
        submenu: [
          {
            name: "Arunachal Pradesh ILP",
            href: "/permits/arunachal-pradesh-ilp",
            icon: Mountain,
            description: "₹100 • 24hr processing • Land of Rising Sun"
          },
          {
            name: "Nagaland ILP",
            href: "/permits/nagaland-ilp",
            icon: Music,
            description: "₹200 • Hornbill Festival • Land of Festivals"
          },
          {
            name: "Mizoram ILP",
            href: "/permits/mizoram-ilp",
            icon: TreePine,
            description: "₹120 • On Arrival at Airport • Land of Blue Mountains"
          },
          {
            name: "Manipur ILP",
            href: "/permits/manipur-ilp",
            icon: Bird,
            description: "₹100 • Sangai Festival • Jewel of India"
          },
          {
            name: "Sikkim Permit",
            href: "/permits/sikkim-permit",
            icon: Mountain,
            description: "PAP • Nathula & North Sikkim • Land of Kangchenjunga"
          },
        ]
      },
      { 
        name: "About Us", 
        href: "/about",
        icon: Info 
      },
      { 
        name: "Contact", 
        href: "/contact",
        icon: Phone 
      }
    ],
    secondary: [
      /* Temporarily hidden - Secondary navigation
      { 
        name: "Search", 
        href: "/search",
        icon: Search 
      },
      { 
        name: "Notifications", 
        href: "/notifications",
        icon: Bell 
      },
      { 
        name: "Account", 
        href: "/account",
        icon: UserCircle 
      }
      */
    ]
  };