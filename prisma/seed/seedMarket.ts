import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const USER_ID = 1;

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────

const markets = [
  // ─────────────────────────────────────────
  // 1 — NÎMES
  // ─────────────────────────────────────────
  {
    name: "Marché des Créateurs de Nîmes",
    address: "Esplanade Charles-de-Gaulle",
    zip: "30000",
    city: "Nîmes",
    cityCode: "30189",
    department: "Gard",
    departmentCode: "30",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.8367,
    longitude: 4.3601,

    startAt: "2026-09-05T07:00:00",
    endAt: "2026-09-07T14:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 45,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un grand rendez-vous dédié aux créateurs, artisans et producteurs locaux au cœur de Nîmes.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Trois jours dédiés à la création locale",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pendant trois jours, l'Esplanade Charles-de-Gaulle accueille créateurs, artisans et producteurs venus partager leur savoir-faire avec les visiteurs.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Bijoux, décoration, accessoires, créations textiles et objets faits main sont à découvrir tout au long du week-end. Une belle occasion de rencontrer directement les créateurs et de découvrir des pièces originales.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Au programme",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Créations artisanales et pièces uniques",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Rencontres avec les artisans",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits locaux et savoir-faire régionaux",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "L'entrée est gratuite. Venez flâner, échanger et repartir avec une création qui vous ressemble ! ✨",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-createurs-nimes",

    history: 8,
    visitors: 1200,
    exhibitors: 65,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x3 m", "5x3 m"],

    electricity: "PAID" as const,
    barnum: "REQUIRED" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: false,

    categoryId: 3,

    tags: [
      "Créateurs",
      "Artisanat",
      "Local",
      "Fait main",
    ],

    openingHours: [
      {
        date: new Date("2026-09-05"),
        openAt: "07:00",
        closeAt: "18:00",
      },
      {
        date: new Date("2026-09-06"),
        openAt: "07:00",
        closeAt: "18:00",
      },
      {
        date: new Date("2026-09-07"),
        openAt: "07:00",
        closeAt: "14:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2 — MONTPELLIER
  // ─────────────────────────────────────────
  {
    name: "Marché Gourmand de Montpellier",
    address: "Place de la Comédie",
    zip: "34000",
    city: "Montpellier",
    cityCode: "34172",
    department: "Hérault",
    departmentCode: "34",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.6085,
    longitude: 3.8794,

    startAt: "2026-08-29T10:00:00",
    endAt: "2026-08-31T14:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 80,

    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Producteurs, artisans et spécialités locales se retrouvent pour une journée gourmande au cœur de Montpellier.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Un week-end gourmand au cœur de Montpellier",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "La place de la Comédie se transforme en véritable rendez-vous des saveurs avec des producteurs, artisans et passionnés de gastronomie venus présenter leurs spécialités.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Fromages, charcuteries, pains artisanaux, miels, confitures, vins régionaux et nombreuses spécialités locales sont à découvrir directement auprès des exposants.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "À découvrir",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits du terroir occitan",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Dégustations auprès des producteurs",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Spécialités artisanales",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Entrée gratuite pour tous les visiteurs. Pensez à prendre un panier pour vos découvertes ! 🧺🍎",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-gourmand-montpellier",

    history: 5,
    visitors: 2500,
    exhibitors: 90,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x4 m"],

    electricity: "INCLUDED" as const,
    barnum: "OPTIONAL" as const,

    parkingAvailability: "FAR" as const,
    parkingFree: false,

    categoryId: 4,

    tags: [
      "Gastronomie",
      "Producteurs",
      "Local",
      "Marché gourmand",
    ],

    openingHours: [
      {
        date: new Date("2026-08-29"),
        openAt: "10:00",
        closeAt: "20:00",
      },
      {
        date: new Date("2026-08-30"),
        openAt: "10:00",
        closeAt: "20:00",
      },
      {
        date: new Date("2026-08-31"),
        openAt: "10:00",
        closeAt: "14:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3 — ALBI
  // ─────────────────────────────────────────
  {
    name: "Grand Marché Artisanal d'Albi",
    address: "Place Sainte-Cécile",
    zip: "81000",
    city: "Albi",
    cityCode: "81004",
    department: "Tarn",
    departmentCode: "81",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.9289,
    longitude: 2.1465,

    startAt: "2026-09-05T09:00:00",
    endAt: "2026-09-05T18:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "BOTH" as const,

    price: 0,
    standPrice: 55,

    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un marché artisanal réunissant créateurs, artisans et producteurs dans le cadre exceptionnel du centre historique d'Albi.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "L'artisanat au pied de la cathédrale Sainte-Cécile",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le centre historique d'Albi accueille une sélection de créateurs et d'artisans venus présenter leurs réalisations dans un cadre exceptionnel.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les visiteurs pourront découvrir des objets décoratifs, bijoux, accessoires, créations textiles et produits artisanaux fabriqués avec passion.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Une journée placée sous le signe du fait main",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Créateurs locaux",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Objets artisanaux",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits régionaux",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-artisanal-albi",

    history: 12,
    visitors: 1800,
    exhibitors: 75,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x3 m"],

    electricity: "PAID" as const,
    barnum: "REQUIRED" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: true,

    categoryId: 1,

    tags: [
      "Artisanat",
      "Créateurs",
      "Fait main",
      "Local",
    ],

    openingHours: [
      {
        date: new Date("2026-09-05"),
        openAt: "09:00",
        closeAt: "18:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4 — TOULOUSE
  // ─────────────────────────────────────────
  {
    name: "Marché des Producteurs de Toulouse",
    address: "Place du Capitole",
    zip: "31000",
    city: "Toulouse",
    cityCode: "31555",
    department: "Haute-Garonne",
    departmentCode: "31",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.6047,
    longitude: 1.4442,

    startAt: "2026-09-12T08:00:00",
    endAt: "2026-09-12T14:00:00",

    recurrence: "WEEKLY" as const,
    recurrenceEndAt: "2026-12-31T23:59:59",

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 35,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un rendez-vous hebdomadaire consacré aux producteurs locaux et aux produits de saison.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Les producteurs locaux au rendez-vous chaque semaine",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Chaque semaine, la place du Capitole accueille des producteurs locaux venus proposer leurs produits directement aux habitants et visiteurs de Toulouse.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Fruits et légumes de saison, fromages, pains, viandes, miels et autres produits du terroir composent les étals du marché.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Un marché qui privilégie le circuit court",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Producteurs régionaux",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits de saison",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Vente directe",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le marché revient chaque semaine pour suivre le rythme des saisons. 🌱",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-producteurs-toulouse",

    history: 25,
    visitors: 3200,
    exhibitors: 110,

    registrationsOpen: false,

    standSizes: ["3x3 m"],

    electricity: "NONE" as const,
    barnum: "OPTIONAL" as const,

    parkingAvailability: "FAR" as const,
    parkingFree: false,

    categoryId: 1,

    tags: [
      "Producteurs",
      "Local",
      "Bio",
      "Alimentation",
    ],

    openingHours: [
      {
        date: new Date("2026-09-12"),
        openAt: "08:00",
        closeAt: "14:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5 — PERPIGNAN
  // ─────────────────────────────────────────
  {
    name: "Marché Vintage de Perpignan",
    address: "Parc des Expositions",
    zip: "66000",
    city: "Perpignan",
    cityCode: "66136",
    department: "Pyrénées-Orientales",
    departmentCode: "66",
    region: "Occitanie",
    regionCode: "76",

    latitude: 42.6887,
    longitude: 2.8948,

    startAt: "2026-09-19T10:00:00",
    endAt: "2026-09-19T19:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "COVERED" as const,

    price: 3,
    standPrice: 70,

    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Fripes, mobilier, objets anciens et décoration vintage dans un marché couvert dédié aux passionnés.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Une plongée dans l'univers vintage",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Le Parc des Expositions accueille une sélection de vendeurs et passionnés de vintage pour une journée consacrée aux objets qui ont une histoire.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Mode, mobilier, affiches, décoration, vinyles et objets insolites seront proposés tout au long de la journée.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "À chiner",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Vêtements et accessoires vintage",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Mobilier et décoration",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Objets de collection",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Entrée à 3 €. Préparez-vous à fouiller et à dénicher la perle rare ! 🕰️",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-vintage-perpignan",

    history: 6,
    visitors: 2100,
    exhibitors: 85,

    registrationsOpen: true,

    standSizes: ["2x2 m", "3x3 m", "4x3 m"],

    electricity: "INCLUDED" as const,
    barnum: "FORBIDDEN" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: true,

    categoryId: 1,

    tags: [
      "Vintage",
      "Brocante",
      "Seconde main",
      "Décoration",
    ],

    openingHours: [
      {
        date: new Date("2026-09-19"),
        openAt: "10:00",
        closeAt: "19:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 6 — CARCASSONNE
  // ─────────────────────────────────────────
  {
    name: "Marché de Noël de Carcassonne",
    address: "Place Carnot",
    zip: "11000",
    city: "Carcassonne",
    cityCode: "11069",
    department: "Aude",
    departmentCode: "11",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.213,
    longitude: 2.3491,

    startAt: "2026-12-12T10:00:00",
    endAt: "2026-12-12T20:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "BOTH" as const,

    price: 0,
    standPrice: 120,

    image:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un grand marché de Noël réunissant artisans, créateurs et producteurs dans une ambiance festive.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "La magie de Noël s'installe à Carcassonne",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "La place Carnot se pare de ses plus belles décorations pour accueillir un marché de Noël chaleureux réunissant artisans, créateurs et producteurs.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Décorations de Noël, cadeaux artisanaux, gourmandises et créations originales seront au rendez-vous pour préparer les fêtes en famille.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Des idées cadeaux pour toute la famille",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Créations artisanales",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Décorations de Noël",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits gourmands",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Une journée festive à partager en famille ou entre amis. 🎄✨",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-noel-carcassonne",

    history: 15,
    visitors: 5000,
    exhibitors: 100,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x3 m", "5x3 m"],

    electricity: "INCLUDED" as const,
    barnum: "OPTIONAL" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: false,

    categoryId: 1,

    tags: [
      "Noël",
      "Artisanat",
      "Créateurs",
      "Cadeaux",
    ],

    openingHours: [
      {
        date: new Date("2026-12-12"),
        openAt: "10:00",
        closeAt: "20:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 7 — RODEZ
  // ─────────────────────────────────────────
  {
    name: "Marché Bio de Rodez",
    address: "Place du Bourg",
    zip: "12000",
    city: "Rodez",
    cityCode: "12202",
    department: "Aveyron",
    departmentCode: "12",
    region: "Occitanie",
    regionCode: "76",

    latitude: 44.3494,
    longitude: 2.5752,

    startAt: "2026-09-26T08:30:00",
    endAt: "2026-09-26T13:00:00",

    recurrence: "MONTHLY" as const,
    recurrenceEndAt: "2027-06-30T23:59:59",

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 30,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un marché convivial consacré aux producteurs biologiques et aux circuits courts.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Le rendez-vous bio et local de Rodez",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Chaque mois, producteurs et artisans engagés se retrouvent place du Bourg pour proposer des produits issus de l'agriculture biologique et des circuits courts.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "L'occasion de faire ses courses autrement, de rencontrer les producteurs et de découvrir les produits de saison disponibles dans la région.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Des produits de saison",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Fruits et légumes biologiques",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits fermiers",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits artisanaux",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-bio-rodez",

    history: 18,
    visitors: 950,
    exhibitors: 40,

    registrationsOpen: true,

    standSizes: ["3x3 m"],

    electricity: "NONE" as const,
    barnum: "REQUIRED" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: true,

    categoryId: 1,

    tags: [
      "Bio",
      "Producteurs",
      "Local",
      "Circuits courts",
    ],

    openingHours: [
      {
        date: new Date("2026-09-26"),
        openAt: "08:30",
        closeAt: "13:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 8 — TARBES
  // ─────────────────────────────────────────
  {
    name: "Marché des Artisans de Tarbes",
    address: "Halle Marcadieu",
    zip: "65000",
    city: "Tarbes",
    cityCode: "65440",
    department: "Hautes-Pyrénées",
    departmentCode: "65",
    region: "Occitanie",
    regionCode: "76",

    latitude: 43.2328,
    longitude: 0.0781,

    startAt: "2026-10-03T09:00:00",
    endAt: "2026-10-03T18:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "COVERED" as const,

    price: 0,
    standPrice: 60,

    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Créateurs et artisans locaux présentent leurs productions dans la halle Marcadieu.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Les savoir-faire locaux à l'honneur",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "La halle Marcadieu accueille une sélection d'artisans et de créateurs locaux pour une journée entièrement consacrée au savoir-faire et à la création.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Les visiteurs pourront échanger directement avec les exposants et découvrir des créations originales fabriquées dans la région.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "À retrouver sur les stands",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Décoration artisanale",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Bijoux et accessoires",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Créations faites main",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-artisans-tarbes",

    history: 9,
    visitors: 1400,
    exhibitors: 55,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x3 m"],

    electricity: "PAID" as const,
    barnum: "FORBIDDEN" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: false,

    categoryId: 1,

    tags: [
      "Artisanat",
      "Créateurs",
      "Fait main",
      "Local",
    ],

    openingHours: [
      {
        date: new Date("2026-10-03"),
        openAt: "09:00",
        closeAt: "18:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 9 — CAHORS
  // ─────────────────────────────────────────
  {
    name: "Marché Gourmand de Cahors",
    address: "Place François Mitterrand",
    zip: "46000",
    city: "Cahors",
    cityCode: "46042",
    department: "Lot",
    departmentCode: "46",
    region: "Occitanie",
    regionCode: "76",

    latitude: 44.4475,
    longitude: 1.4409,

    startAt: "2026-10-10T10:00:00",
    endAt: "2026-10-10T18:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 40,

    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Une journée gourmande autour des producteurs, spécialités et savoir-faire du Lot.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Les saveurs du Lot réunies à Cahors",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "La place François Mitterrand accueille une journée gourmande consacrée aux producteurs et aux spécialités du Lot.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Une occasion de goûter aux produits locaux et d'échanger directement avec celles et ceux qui les produisent.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Les incontournables",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Produits du terroir",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Spécialités régionales",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Producteurs locaux",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Une journée placée sous le signe de la gourmandise et du partage. 🍷🧀",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-gourmand-cahors",

    history: 7,
    visitors: 1100,
    exhibitors: 45,

    registrationsOpen: true,

    standSizes: ["3x3 m", "4x3 m"],

    electricity: "PAID" as const,
    barnum: "OPTIONAL" as const,

    parkingAvailability: "NEARBY" as const,
    parkingFree: true,

    categoryId: 1,

    tags: [
      "Gastronomie",
      "Producteurs",
      "Local",
      "Terroir",
    ],

    openingHours: [
      {
        date: new Date("2026-10-10"),
        openAt: "10:00",
        closeAt: "18:00",
      },
    ],
  },

  // ─────────────────────────────────────────
  // 10 — FOIX
  // ─────────────────────────────────────────
  {
    name: "Marché des Créateurs de Foix",
    address: "Allées de Villote",
    zip: "09000",
    city: "Foix",
    cityCode: "09122",
    department: "Ariège",
    departmentCode: "09",
    region: "Occitanie",
    regionCode: "76",

    latitude: 42.9656,
    longitude: 1.6074,

    startAt: "2026-10-17T09:00:00",
    endAt: "2026-10-17T17:00:00",

    recurrence: "NONE" as const,
    recurrenceEndAt: null,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 35,

    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1600&auto=format&fit=crop",

    excerpt:
      "Un marché à taille humaine mettant à l'honneur les créateurs et artisans ariégeois.",

    description: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Les créateurs ariégeois prennent possession des Allées de Villote",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Pour cette nouvelle édition, les Allées de Villote accueillent des créateurs et artisans de l'Ariège venus présenter leurs univers et leurs réalisations.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Un marché convivial où prendre le temps de discuter avec les exposants et de découvrir des créations originales.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Une sélection locale",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Créations artisanales",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Objets faits main",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Artisans locaux",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Entrée gratuite. Venez découvrir les talents locaux ! 🏔️✨",
            },
          ],
        },
      ],
    },

    externalUrl: "https://example.com/marche-createurs-foix",

    history: 4,
    visitors: 700,
    exhibitors: 35,

    registrationsOpen: true,

    standSizes: ["3x3 m"],

    electricity: "NONE" as const,
    barnum: "REQUIRED" as const,

    parkingAvailability: "FAR" as const,
    parkingFree: true,

    categoryId: 1,

    tags: [
      "Créateurs",
      "Artisanat",
      "Fait main",
      "Local",
    ],

    openingHours: [
      {
        date: new Date("2026-10-17"),
        openAt: "09:00",
        closeAt: "17:00",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────

async function seedMarkets() {
  console.log("🌱 Seed des marchés...");

  // Vérification de l'utilisateur
  const user = await prisma.user.findUnique({
    where: {
      id: USER_ID,
    },
  });

  if (!user) {
    throw new Error(
      `❌ Impossible de créer les marchés : l'utilisateur #${USER_ID} n'existe pas.`
    );
  }

  console.log(
    `👤 Marchés rattachés à : ${user.firstName} ${user.lastName} (#${user.id})`
  );

  for (const market of markets) {

    // ─────────────────────────────────────────
    // Tags
    // ─────────────────────────────────────────

    const tags = [];

    for (const tagName of market.tags) {
      const slug = tagName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const tag = await prisma.tag.upsert({
        where: {
          slug,
        },
        update: {},
        create: {
          name: tagName,
          slug,
        },
      });

      tags.push(tag);
    }

    // ─────────────────────────────────────────
    // Market
    // ─────────────────────────────────────────

    const createdMarket = await prisma.market.create({
      data: {
        name: market.name,

        address: market.address,
        zip: market.zip,

        city: market.city,
        cityCode: market.cityCode,

        department: market.department,
        departmentCode: market.departmentCode,

        region: market.region,
        regionCode: market.regionCode,

        latitude: market.latitude,
        longitude: market.longitude,

        startAt: new Date(market.startAt),
        endAt: new Date(market.endAt),

        recurrence: market.recurrence,
        recurrenceEndAt: market.recurrenceEndAt
          ? new Date(market.recurrenceEndAt)
          : null,

        history: market.history,
        visitors: market.visitors,

        marketType: market.marketType,

        price: market.price,
        standPrice: market.standPrice,

        image: market.image,
        excerpt: market.excerpt,
        description: market.description,
        externalUrl: market.externalUrl,

        exhibitors: market.exhibitors,
        registrationsOpen: market.registrationsOpen,

        standSizes: market.standSizes,

        electricity: market.electricity,
        barnum: market.barnum,

        parkingAvailability: market.parkingAvailability,
        parkingFree: market.parkingFree,

        userId: USER_ID,
        categoryId: market.categoryId,

        tags: {
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },

        openingHours: {
          create: market.openingHours,
        },
      },
    });

    console.log(
      `✅ #${createdMarket.id} ${createdMarket.name} — ${createdMarket.city}`
    );
  }

  console.log("");
  console.log(`🎉 ${markets.length} marchés créés avec succès !`);
}

seedMarkets()
  .catch((error) => {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });