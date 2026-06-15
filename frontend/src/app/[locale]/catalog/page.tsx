// ─────────────────────────────────────────────────────────────
// Vera Sync — Catalog Page (Server Component)
// Fetches leather data from Supabase via Prisma, then passes
// it to the CatalogClient for interactive filtering.
// ─────────────────────────────────────────────────────────────

import { prisma } from "@/lib/prisma";
import CatalogClient from "@/components/catalog/CatalogClient";
import type { CatalogLeather } from "@/components/catalog/CatalogClient";

interface CatalogPageProps {
  params: Promise<{ locale: string }>;
}

async function getLeathers(): Promise<CatalogLeather[]> {
  const leathers = await prisma.leather.findMany({
    where: { available: true },
    include: {
      supplier: {
        select: { companyName: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Transform Prisma result to plain serializable objects
  return leathers.map((leather) => ({
    id: leather.id,
    name: leather.name,
    description: leather.description,
    origin: leather.origin,
    animalSource: leather.animalSource,
    thickness: leather.thickness,
    pricePerSqFt: leather.pricePerSqFt,
    color: leather.color,
    finish: leather.finish,
    certifications: leather.certifications,
    imageUrls: leather.imageUrls,
    supplierName: leather.supplier.companyName,
  }));
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params;
  const leathers = await getLeathers();

  return <CatalogClient leathers={leathers} locale={locale} />;
}
