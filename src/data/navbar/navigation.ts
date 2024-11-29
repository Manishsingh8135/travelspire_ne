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
    Car
  } from "lucide-react";
  
  export const navigationData: NavigationData = {
    primary: [
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
      // {
      //   name: "Plan Your Trip",
      //   href: "/plan",
      //   icon: Calendar,
      //   submenu: [
      //     { 
      //       name: "Accommodations", 
      //       href: "/plan/stay",
      //       icon: Hotel,
      //       description: "Where to Stay"
      //     },
      //     { 
      //       name: "Transportation", 
      //       href: "/plan/transport",
      //       icon: Car,
      //       description: "How to Get Around"
      //     },
      //   ],
      // },
      { 
        name: "About Us", 
        href: "/about",
        icon: Info 
      },
      { 
        name: "Contact", 
        href: "/contact",
        icon: Phone 
      },
    ],
    secondary: [
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
      },
    ],
  };