// Workaround for environments where '@prisma/client' doesn't expose named exports

import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../lib/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })


const markets = [
  {
    name: "Marché des Arceaux",
    address: "Boulevard des Arceaux",

    city: "Montpellier",
    cityCode: "34172",

    department: "Hérault",
    departmentCode: "34",

    region: "Occitanie",
    regionCode: "76",

    zip: "34070",

    latitude: 43.6119,
    longitude: 3.8552,

    startAt: new Date("2026-08-15T08:00:00"),
    endAt: new Date("2026-08-15T13:00:00"),

    recurrence: "WEEKLY" as const,

    history: 42,
    visitors: 1800,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 25,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9",

    excerpt: "Un marché convivial au cœur de Montpellier.",

    category: "FARMERS",

    tags: ["Bio", "Local", "Producteurs"],
  },

  {
    name: "Marché de la Mosson",
    address: "Place de Thessalie",

    city: "Montpellier",
    cityCode: "34172",

    department: "Hérault",
    departmentCode: "34",

    region: "Occitanie",
    regionCode: "76",

    zip: "34080",

    latitude: 43.6269,
    longitude: 3.8186,

    startAt: new Date("2026-08-16T08:00:00"),
    endAt: new Date("2026-08-16T13:00:00"),

    recurrence: "WEEKLY" as const,

    history: 18,
    visitors: 1200,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 20,

    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e",

    excerpt:
      "Un marché de quartier avec de nombreux producteurs.",

    category: "FARMERS",

    tags: ["Local", "Producteurs"],
  },

  {
    name: "Marché des Halles de Sète",
    address: "Rue Gambetta",

    city: "Sète",
    cityCode: "34301",

    department: "Hérault",
    departmentCode: "34",

    region: "Occitanie",
    regionCode: "76",

    zip: "34200",

    latitude: 43.4042,
    longitude: 3.6954,

    startAt: new Date("2026-08-16T10:00:00"),
    endAt: new Date("2026-08-16T14:00:00"),

    recurrence: "WEEKLY" as const,

    history: 95,
    visitors: 2500,

    marketType: "COVERED" as const,

    price: 0,
    standPrice: 35,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9",

    excerpt:
      "Les Halles de Sète et leurs producteurs locaux.",

    category: "FOOD",

    tags: ["Local", "Poisson", "Alimentaire"],
  },

  {
    name: "Marché des Halles de Nîmes",
    address: "Place du Marché",

    city: "Nîmes",
    cityCode: "30189",

    department: "Gard",
    departmentCode: "30",

    region: "Occitanie",
    regionCode: "76",

    zip: "30000",

    latitude: 43.8356,
    longitude: 4.3601,

    startAt: new Date("2026-08-17T08:00:00"),
    endAt: new Date("2026-08-17T13:00:00"),

    recurrence: "WEEKLY" as const,

    history: 67,
    visitors: 3200,

    marketType: "COVERED" as const,

    price: 0,
    standPrice: 40,

    image:
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e",

    excerpt: "Un marché couvert au cœur de Nîmes.",

    category: "FOOD",

    tags: ["Alimentaire", "Local"],
  },

  {
    name: "Marché d'Uzès",
    address: "Place aux Herbes",

    city: "Uzès",
    cityCode: "30334",

    department: "Gard",
    departmentCode: "30",

    region: "Occitanie",
    regionCode: "76",

    zip: "30700",

    latitude: 44.0121,
    longitude: 4.4197,

    startAt: new Date("2026-08-18T08:00:00"),
    endAt: new Date("2026-08-18T13:00:00"),

    recurrence: "WEEKLY" as const,

    history: 310,
    visitors: 5000,

    marketType: "EXTERIOR" as const,

    price: 0,
    standPrice: 50,

    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9",

    excerpt:
      "Le célèbre marché d'Uzès sur la Place aux Herbes.",

    category: "FARMERS",

    tags: ["Bio", "Producteurs", "Local"],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // ─────────────────────────────────────────────
  // Nettoyage
  // ─────────────────────────────────────────────

  await prisma.promotion.deleteMany();
  await prisma.marketOpeningHour.deleteMany();
  await prisma.market.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  console.log("🧹 Database cleaned");

  // ─────────────────────────────────────────────
  // User
  // ─────────────────────────────────────────────

  

  // ─────────────────────────────────────────────
  // Categories
  // ─────────────────────────────────────────────

  const categories = [
    "FARMERS",
    "FOOD",
    "ARTISAN",
    "FLEA_MARKET",
  ];

  const categoryMap = new Map<string, number>();

  for (const name of categories) {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    categoryMap.set(name, category.id);
  }

  // ─────────────────────────────────────────────
  // Markets
  // ─────────────────────────────────────────────

  const createdMarkets = [];

  for (const market of markets) {
    const categoryId = categoryMap.get(market.category);

    if (!categoryId) {
      throw new Error(
        `Category "${market.category}" not found`,
      );
    }

    const createdMarket = await prisma.market.create({
      data: {
        name: market.name,
        address: market.address,

        city: market.city,
        cityCode: market.cityCode,

        department: market.department,
        departmentCode: market.departmentCode,

        region: market.region,
        regionCode: market.regionCode,

        zip: market.zip,

        latitude: market.latitude,
        longitude: market.longitude,

        startAt: market.startAt,
        endAt: market.endAt,

        recurrence: market.recurrence,

        history: market.history,
        visitors: market.visitors,

        marketType: market.marketType,

        price: market.price,
        standPrice: market.standPrice,

        image: market.image,
        excerpt: market.excerpt,

      

        category: {
          connect: {
            id: categoryId,
          },
        },

        tags: {
          connectOrCreate: market.tags.map((tagName) => ({
            where: {
              name: tagName,
            },
            create: {
              name: tagName,
            },
          })),
        },
      },
    });

    createdMarkets.push(createdMarket);

    // ─────────────────────────────────────────────
    // Horaires
    // ─────────────────────────────────────────────

    await prisma.marketOpeningHour.create({
      data: {
        marketId: createdMarket.id,
        dayOfWeek: getDayOfWeek(market.startAt),
        openAt: formatTime(market.startAt),
        closeAt: formatTime(market.endAt),
      },
    });
  }

  // ─────────────────────────────────────────────
  // Promotion
  // ─────────────────────────────────────────────

  const promotedMarket = createdMarkets[4];

  if (!promotedMarket) {
    throw new Error("Promoted market not found");
  }

  await prisma.promotion.create({
    data: {
      userId: user.id,
      marketId: promotedMarket.id,

      startAt: new Date("2026-08-01T00:00:00"),
      endAt: new Date("2026-08-31T23:59:59"),

      targetType: "REGION",

      regionCode: "76",
    },
  });

  console.log(
    `🎉 Created ${createdMarkets.length} markets`,
  );

  console.log("📢 Created 1 regional promotion");

  console.log("✅ Seed completed");
}


// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getDayOfWeek(date: Date) {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ] as const;

  return days[date.getDay()];
}

function formatTime(date: Date) {
  return date.toISOString().substring(11, 16);
}


main()
  .catch((error) => {
    console.error("❌ Seed failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });