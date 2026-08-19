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
        title: "Destinations",
        links: [
          { text: "Anini", href: "/places/anini" },
          { text: "Dibang Valley", href: "/places/dibang-valley" },
          { text: "Dambuk", href: "/places/dambuk" },
          { text: "Roing", href: "/places/roing" }
        ]
      },
      {
        title: "Experiences",
        links: [
          { text: "All Tours", href: "/all-tours" },
          { text: "Anini Winter Fest 2026", href: "/anini-winter-fest-2026" },
          { text: "Ziro Festival 2026", href: "/ziro-music-festival-2026" },
          { text: "Gallery", href: "/gallery" }
        ]
      },
      {
        title: "Travel Info",
        links: [
          { text: "The Way to Anini", href: "/guides/dibrugarh-to-anini" },
          { text: "ILP/PAP Permits", href: "/permits" },
          { text: "About Us", href: "/about" },
          { text: "Contact", href: "/contact" }
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