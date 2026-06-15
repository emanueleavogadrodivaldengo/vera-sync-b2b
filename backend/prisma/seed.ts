/// <reference types="node" />
// ─────────────────────────────────────────────────────────────
// Vera Sync — Database Seed Script
// Populates the Supabase PostgreSQL database with realistic
// leather catalog items for development and demo purposes.
// ─────────────────────────────────────────────────────────────

import { PrismaClient, LeatherOrigin, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Vera Sync database...\n");

  // ── Create Demo Supplier Users ───────────────────────────────
  const suppliers = await Promise.all([
    prisma.user.upsert({
      where: { email: "info@exoticskins.co" },
      update: {},
      create: {
        email: "info@exoticskins.co",
        passwordHash: "$2b$10$placeholder_hash_exotic_skins",
        role: UserRole.SUPPLIER,
        companyName: "Exotic Skins Co.",
        contactName: "Marco Ferragamo",
        phone: "+39 02 1234 5678",
        country: "Italy",
        preferredLang: "it",
      },
    }),
    prisma.user.upsert({
      where: { email: "contact@tuscantannery.it" },
      update: {},
      create: {
        email: "contact@tuscantannery.it",
        passwordHash: "$2b$10$placeholder_hash_tuscan",
        role: UserRole.SUPPLIER,
        companyName: "Tuscan Tannery",
        contactName: "Lucia Bianchi",
        phone: "+39 055 987 6543",
        country: "Italy",
        preferredLang: "it",
      },
    }),
    prisma.user.upsert({
      where: { email: "hello@ananasanam.com" },
      update: {},
      create: {
        email: "hello@ananasanam.com",
        passwordHash: "$2b$10$placeholder_hash_ananas",
        role: UserRole.SUPPLIER,
        companyName: "Ananas Anam",
        contactName: "Carmen Hijosa",
        phone: "+44 20 7890 1234",
        country: "United Kingdom",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "sales@capeostrich.co.za" },
      update: {},
      create: {
        email: "sales@capeostrich.co.za",
        passwordHash: "$2b$10$placeholder_hash_cape",
        role: UserRole.SUPPLIER,
        companyName: "Cape Ostrich Leather",
        contactName: "Pieter van der Berg",
        phone: "+27 21 555 0199",
        country: "South Africa",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "info@oceantex.eu" },
      update: {},
      create: {
        email: "info@oceantex.eu",
        passwordHash: "$2b$10$placeholder_hash_oceantex",
        role: UserRole.SUPPLIER,
        companyName: "OceanTex",
        contactName: "Anna Lindström",
        phone: "+46 8 123 4567",
        country: "Sweden",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "contact@nordicleather.dk" },
      update: {},
      create: {
        email: "contact@nordicleather.dk",
        passwordHash: "$2b$10$placeholder_hash_nordic",
        role: UserRole.SUPPLIER,
        companyName: "Nordic Leather",
        contactName: "Erik Sørensen",
        phone: "+45 33 123 456",
        country: "Denmark",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "hello@mycoworks.bio" },
      update: {},
      create: {
        email: "hello@mycoworks.bio",
        passwordHash: "$2b$10$placeholder_hash_myco",
        role: UserRole.SUPPLIER,
        companyName: "MycoWorks",
        contactName: "Philip Ross",
        phone: "+1 415 555 0142",
        country: "United States",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "export@seaskins.sg" },
      update: {},
      create: {
        email: "export@seaskins.sg",
        passwordHash: "$2b$10$placeholder_hash_sea",
        role: UserRole.SUPPLIER,
        companyName: "Southeast Asia Skins",
        contactName: "Tan Wei Ming",
        phone: "+65 6789 0123",
        country: "Singapore",
        preferredLang: "en",
      },
    }),
    prisma.user.upsert({
      where: { email: "lab@refabric.de" },
      update: {},
      create: {
        email: "lab@refabric.de",
        passwordHash: "$2b$10$placeholder_hash_refabric",
        role: UserRole.SUPPLIER,
        companyName: "Re:Fabric Labs",
        contactName: "Hanna Müller",
        phone: "+49 30 9876 5432",
        country: "Germany",
        preferredLang: "en",
      },
    }),
  ]);

  console.log(`✅ Created ${suppliers.length} supplier users\n`);

  // ── Leather Catalog Items ────────────────────────────────────
  const leatherData = [
    {
      name: "Nile Crocodile Belly",
      description:
        "Premium belly cut from sustainably farmed Nile crocodile. Ideal for luxury handbags and accessories. Each skin is hand-selected for scale symmetry and natural luster.",
      origin: LeatherOrigin.EXOTIC,
      animalSource: "Crocodile",
      tannery: "Conceria Gaiera Giovanni",
      thickness: 1.2,
      pricePerSqFt: 285,
      color: "Cognac",
      finish: "Glossy",
      certifications: ["CITES", "LWG"],
      imageUrls: [],
      supplierId: suppliers[0].id,
    },
    {
      name: "Vegetable-Tanned Cowhide",
      description:
        "Full-grain vegetable-tanned cowhide from certified tanneries in Tuscany. Ages beautifully with a natural patina. Chrome-free process using chestnut and mimosa bark extracts.",
      origin: LeatherOrigin.SUSTAINABLE,
      animalSource: "Cow",
      tannery: "Conceria Walpier",
      thickness: 1.4,
      pricePerSqFt: 12,
      color: "Natural",
      finish: "Matte",
      certifications: ["LWG Gold", "OEKO-TEX"],
      imageUrls: [],
      supplierId: suppliers[1].id,
    },
    {
      name: "Piñatex™ Pineapple Leaf",
      description:
        "Innovative vegan leather made from pineapple leaf fibers — a byproduct of the pineapple harvest. Lightweight, durable, and fully biodegradable. No additional land, water, or pesticides required.",
      origin: LeatherOrigin.VEGAN,
      animalSource: null,
      tannery: null,
      thickness: 1.0,
      pricePerSqFt: 18,
      color: "Natural",
      finish: "Matte",
      certifications: ["PETA Approved", "B Corp"],
      imageUrls: [],
      supplierId: suppliers[2].id,
    },
    {
      name: "Ostrich Full Quill",
      description:
        "Distinctive full-quill ostrich leather with characteristic raised follicle bumps. Sourced from ethical farms in the Western Cape. Exceptionally soft with high tensile strength.",
      origin: LeatherOrigin.EXOTIC,
      animalSource: "Ostrich",
      tannery: "Klein Karoo International",
      thickness: 0.8,
      pricePerSqFt: 145,
      color: "Black",
      finish: "Nubuck",
      certifications: ["SAOFA", "LWG"],
      imageUrls: [],
      supplierId: suppliers[3].id,
    },
    {
      name: "Recycled Ocean Leather",
      description:
        "Innovative material crafted from recycled ocean plastics bonded with natural rubber and cellulose fibers. Water-resistant, durable, and helps clean our oceans. Each sq ft removes 12 plastic bottles from marine environments.",
      origin: LeatherOrigin.RECYCLED,
      animalSource: null,
      tannery: null,
      thickness: 1.1,
      pricePerSqFt: 22,
      color: "Navy",
      finish: "Matte",
      certifications: ["GRS", "Blue Angel"],
      imageUrls: [],
      supplierId: suppliers[4].id,
    },
    {
      name: "Chrome-Free Nappa",
      description:
        "Ultra-soft chrome-free nappa leather. Metal-free tanning process for hypoallergenic properties. Perfect for luxury garments, gloves, and premium upholstery applications.",
      origin: LeatherOrigin.SUSTAINABLE,
      animalSource: "Lamb",
      tannery: "Elmo Sweden AB",
      thickness: 0.7,
      pricePerSqFt: 35,
      color: "Burgundy",
      finish: "Glossy",
      certifications: ["LWG Silver", "REACH"],
      imageUrls: [],
      supplierId: suppliers[5].id,
    },
    {
      name: "Mushroom Mycelium",
      description:
        "Lab-grown mycelium leather alternative developed from Reishi mushroom root structures. Customizable thickness and texture. Carbon-negative production process with zero animal inputs.",
      origin: LeatherOrigin.VEGAN,
      animalSource: null,
      tannery: null,
      thickness: 1.3,
      pricePerSqFt: 42,
      color: "Brown",
      finish: "Suede",
      certifications: ["USDA Bio-Preferred"],
      imageUrls: [],
      supplierId: suppliers[6].id,
    },
    {
      name: "Python Belly Grade A",
      description:
        "Premium grade-A python belly skin with symmetrical diamond-shaped scales. Ethically sourced from managed populations with full traceability. Preferred by luxury Maisons for small leather goods.",
      origin: LeatherOrigin.EXOTIC,
      animalSource: "Python",
      tannery: "Conceria Gaiera Giovanni",
      thickness: 0.6,
      pricePerSqFt: 195,
      color: "Natural",
      finish: "Glossy",
      certifications: ["CITES", "LVMH Standards"],
      imageUrls: [],
      supplierId: suppliers[7].id,
    },
    {
      name: "Upcycled Denim Leather",
      description:
        "Unique textured material made from post-consumer denim waste bonded with bio-based PU adhesives. Each batch has a distinct character. Ideal for sustainable fashion collections and eco-conscious brands.",
      origin: LeatherOrigin.RECYCLED,
      animalSource: null,
      tannery: null,
      thickness: 1.5,
      pricePerSqFt: 8,
      color: "Blue",
      finish: "Distressed",
      certifications: ["GRS", "EU Ecolabel"],
      imageUrls: [],
      supplierId: suppliers[8].id,
    },
  ];

  let leatherCount = 0;
  for (const data of leatherData) {
    await prisma.leather.create({ data });
    leatherCount++;
    console.log(`  🧶 ${data.name} (${data.origin})`);
  }

  console.log(`\n✅ Created ${leatherCount} leather catalog items`);
  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
