import { ServicesPageView } from "@/components/services/ServicesPageView";
import { getPublishedServiceBlocks, getServicesPageHero } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [hero, blocks] = await Promise.all([
    getServicesPageHero(),
    getPublishedServiceBlocks(),
  ]);

  return <ServicesPageView hero={hero} blocks={blocks} />;
}
