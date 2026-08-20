
import "dotenv/config";
import argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error(
    "ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans les variables d'environnement."
  );
}

async function seedAdmin() {
  console.log("🔐 Création de l'administrateur...");

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // ─────────────────────────────────────────────
  // L'utilisateur existe déjà
  // ─────────────────────────────────────────────

  if (existingUser) {
    console.log(`⚠️ Un utilisateur existe déjà avec l'email ${email}.`);

    if (!existingUser.roles.includes("ADMIN")) {
      const updatedUser = await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          roles: {
            push: "ADMIN",
          },
        },
      });

      console.log(
        `✅ Rôle ADMIN ajouté à l'utilisateur #${updatedUser.id}.`
      );
    } else {
      console.log("ℹ️ Cet utilisateur possède déjà le rôle ADMIN.");
    }

    return;
  }

  // ─────────────────────────────────────────────
  // Création de l'administrateur
  // ─────────────────────────────────────────────

  const passwordHash = await argon2.hash(password);

  const admin = await prisma.user.create({
    data: {
      email,
      passwordHash,
      roles: ["ADMIN"],
      firstName: "Admin",
      lastName: "Trouve ton marché",
    },
  });

  console.log("✅ Administrateur créé !");
  console.log({
    id: admin.id,
    email: admin.email,
    roles: admin.roles,
  });
}

seedAdmin()
  .catch((error) => {
    console.error("❌ Erreur lors du seed admin :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
