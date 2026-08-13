import { HomePageView } from "@/components/home/HomePage";
import { getHomeData, getPublishedFaqs } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [data, faqs] = await Promise.all([getHomeData(), getPublishedFaqs()]);
  return <HomePageView data={data} faqs={faqs} />;
}
