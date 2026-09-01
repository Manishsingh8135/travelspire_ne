export const footerData = {
    mainSection: {
      title: "Discover Northeast India",
      highlightedTitle: "with Travelspire NE",
      description: "Join us in exploring the untouched beauty, rich cultures, and extraordinary experiences of Northeast India's seven sister states.",
      ctaButton: {
        text: "Plan Your Journey",
        href: "/contact"
      }
    },
    quickLinks: [
      {
        title: "Explore",
        links: [
          { text: "All Tours", href: "/all-tours" },
          { text: "Festivals", href: "/all-tours?category=Festival" },
          { text: "Destinations", href: "/places/dibang-valley" },
          { text: "Gallery", href: "/gallery" }
        ]
      },
      {
        title: "Plan",
        links: [
          { text: "Permit Guides", href: "/permits" },
          { text: "The Way to Anini", href: "/guides/dibrugarh-to-anini" },
          { text: "Anini Winter Fest 2026", href: "/anini-winter-fest-2026" },
          { text: "Ziro Festival 2026", href: "/ziro-music-festival-2026" },
          { text: "Booking Policy", href: "/booking-policy" }
        ]
      },
      {
        title: "Company",
        links: [
          { text: "About", href: "/about" },
          { text: "Contact", href: "/contact" },
          { text: "Instagram", href: "https://instagram.com/travelspire_ne" },
          { text: "WhatsApp", href: "https://wa.me/919864141211" }
        ]
      }
    ],
    socialLinks: [
      {
        name: "Instagram",
        href: "https://instagram.com/travelspire_ne",
        icon: "Instagram"
      },
      {
        name: "Whatsapp",
        href: "https://wa.me/919864141211",
        icon: "Whatsapp"
      },


      
      // {
      //   name: "Twitter",
      //   href: "https://twitter.com/travelspirene",
      //   icon: "Twitter"
      // },
      // {
      //   name: "LinkedIn",
      //   href: "https://linkedin.com/company/travelspire-northeast",
      //   icon: "LinkedIn"
      // }
    ],
    bottomSection: {
      copyright: " 2026 Travelspire Northeast. All rights reserved.",
      legalLinks: [
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms of Service", href: "/terms-and-conditions" },
        { text: "Booking Policy", href: "/booking-policy" }
      ]
    },
    newsletter: {
      title: "Join Our Adventure",
      description: "Subscribe for exclusive Northeast travel updates, hidden gems, and special offers.",
      placeholder: "Enter your email",
      buttonText: "Subscribe"
    },
    contactInfo: {
      email: "info@travelspirene.com",
      phone: "+91-9864141211",
      address: "Dibrugarh, Assam, India"
    }
  } as const;
