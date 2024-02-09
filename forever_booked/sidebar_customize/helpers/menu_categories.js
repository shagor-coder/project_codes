export const menu_categories = [
  {
    element: "Academy",
    name: "Academy",
    icon: `<i class="fa-solid fa-graduation-cap"></i>`,
    order: "0",
  },
  {
    element: "Help Center",
    name: "Help Center",
    icon: `<i class="fa-regular fa-lightbulb"></i>`,
    order: "1",
  },
  {
    element: "Skool Community",
    name: "Community",
    icon: `<i class="fa-solid fa-school-flag"></i>`,
    order: "2",
  },
  {
    element: "Custom",
    name: "Your Resources",
    order: "3",
    icon: `<i class="fa-solid fa-pencil"></i>`,
    submenus: [
      {
        element: "Collab Doc",
        name: "Collab Doc",
        icon: `<i class="fa-solid fa-handshake-simple"></i>`,
      },
      {
        element: "Treatment Plan",
        name: "Treatment Plan",
        icon: `<i class="fa-solid fa-syringe"></i>`,
      },
      {
        element: "Mobile App",
        name: "Mobile App",
        icon: `<i class="fa-solid fa-mobile-screen-button"></i>`,
      },
    ],
  },

  {
    element: "Divider",
    name: "Divider 1",
    order: "4",
  },

  {
    element: "Conversations",
    name: "Conversations",
    icon: `<i class="fa-regular fa-comment"></i>`,
    order: "5",
  },
  {
    element: "Opportunities",
    name: "Track Leads",
    icon: `<i class="fa-solid fa-user-group"></i>`,
    order: "6",
  },
  {
    element: "Custom",
    name: "Reporting",
    order: "7",
    icon: `<i class="fa-solid fa-chart-area"></i>`,
    submenus: [
      {
        element: "Dashboard",
        name: "Track Results",
        icon: `<i class="fa-solid fa-filter-circle-dollar"></i>`,
      },
      {
        element: "Reporting",
        name: "Track Ads",
        icon: `<i class="fa-solid fa-chart-pie"></i>`,
      },
    ],
  },

  {
    element: "Custom",
    name: "Launch Campaigns",
    order: "9",
    icon: `<i class="fa-solid fa-rocket"></i>`,
    submenus: [
      {
        element: "Facebook Ads",
        name: "Launch Meta Ads",
        icon: `<i class="fa-brands fa-facebook"></i>`,
      },
      {
        element: "Launch SMS Campaign",
        name: "Launch SMS Campaign",
        icon: `<i class="fa-solid fa-comments"></i>`,
      },
      {
        element: "Marketing",
        name: "Email + Socials",
        icon: `<i class="fa-solid fa-envelopes-bulk"></i>`,
      },
      {
        element: "Booster Shot",
        name: "Booster Shot",
        icon: `<i class="fa-solid fa-gauge-high"></i>`,
      },
    ],
  },

  {
    element: "Divider",
    name: "Divider 2",
    order: "8",
  },

  {
    element: "Contacts",
    name: "Contacts",
    order: "10",
    icon: `<i class="fa-solid fa-pager"></i>`,
  },
  {
    element: "Reputation",
    name: "Manage Reviews",
    order: "11",
    icon: `<i class="fa-solid fa-star"></i>`,
  },
  {
    element: "Payments",
    name: "Payments",
    order: "12",
    icon: `<i class="fa-solid fa-wallet"></i>`,
  },

  {
    element: "Divider",
    name: "Divider 3",
    order: "13",
  },

  // {
  //   element: "Custom",
  //   name: "Ai Management",
  //   order: "14",
  //   icon: `<i class="fa-solid fa-robot"></i>`,
  //   submenus: [

  //   ],
  // },

  {
    element: "AI Offer Prompts ",
    name: "AI Prompts",
    icon: `<i class="fa-solid fa-robot"></i>`,
  },
  {
    element: "AI Knowledge",
    name: "AI Knowledge",
    icon: `<i class="fa-solid fa-brain"></i>`,
  },

  {
    element: "Automation",
    name: "Automation",
    order: "18",
    icon: `<i class="fa-solid fa-gear"></i>`,
  },

  {
    element: "Divider",
    name: "Divider 4",
    order: "15",
  },

  {
    element: "Calendars",
    name: "Calendars",
    order: "16",
    icon: `<i class="fa-solid fa-calendar"></i>`,
  },
  {
    element: "Sites",
    name: "Sites",
    order: "17",
    icon: `<i class="fa-solid fa-sitemap"></i>`,
  },
];

export const exclude_accounts = window.exclude_accounts || [];
