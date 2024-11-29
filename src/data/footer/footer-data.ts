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
          { text: "Arunachal Pradesh", href: "/destinations/arunachal-pradesh" },
          { text: "Assam", href: "/destinations/assam" },
          { text: "Meghalaya", href: "/destinations/meghalaya" },
          { text: "Nagaland", href: "/destinations/nagaland" }
        ]
      },
      {
        title: "Experiences",
        links: [
          { text: "Adventure Tours", href: "/tours/adventure" },
          { text: "Cultural Tours", href: "/tours/cultural" },
          { text: "Wildlife Tours", href: "/tours/wildlife" },
          { text: "Photography Tours", href: "/tours/photography" }
        ]
      },
      {
        title: "Travel Info",
        links: [
          { text: "Travel Guide", href: "/guide" },
          { text: "Best Time to Visit", href: "/best-time" },
          { text: "ILP/PAP Info", href: "/permits" },
          { text: "FAQs", href: "/faqs" }
        ]
      }
    ],
    socialLinks: [
      {
        name: "Instagram",
        href: "https://instagram.com/travelspire_northeast",
        icon: "Instagram"
      },
      {
        name: "Twitter",
        href: "https://twitter.com/travelspirene",
        icon: "Twitter"
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/company/travelspire-northeast",
        icon: "LinkedIn"
      }
    ],
    bottomSection: {
      copyright: "© 2024 Travelspire Northeast. All rights reserved.",
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
      email: "travelspirene82@gmail.com",
      phone: "+91 98641 41211",
      address: "Dibrugarh, Assam, India"
    }
  } as const;