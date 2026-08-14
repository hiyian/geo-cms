/**
 * Sync production schema fields + services page content without wiping home/about.
 * Usage: DATABASE_URL=... npx tsx scripts/sync-services-db.ts
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import {
  blockToServiceDetail,
  defaultServicesPageBlocks,
  defaultServicesPageHero,
} from "../src/data/services-page";

const prisma = new PrismaClient();

async function main() {
  await prisma.pageContent.upsert({
    where: { slug: "services" },
    update: {
      title: "服务页",
      data: JSON.stringify(defaultServicesPageHero),
    },
    create: {
      slug: "services",
      title: "服务页",
      data: JSON.stringify(defaultServicesPageHero),
    },
  });

  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: defaultServicesPageBlocks.map((block, idx) => ({
      title: block.title,
      summary: block.summary,
      description: block.promise || "",
      features: JSON.stringify(block.contents),
      detail: JSON.stringify(blockToServiceDetail(block)),
      accent: ["yellow", "purple", "cyan", "blue"][idx] || "cyan",
      badge: block.badge || "",
      href: block.ctaHref || "/contact",
      sortOrder: idx + 1,
      published: true,
    })),
  });

  const count = await prisma.service.count();
  console.log("Synced services page hero +", count, "services");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
