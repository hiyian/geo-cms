import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { getSiteSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-slate-600 transition-colors dark:bg-navy-900 dark:text-slate-400">
      <Navbar
        siteName={settings.siteName}
        ctaText={settings.navCtaText}
        ctaHref={settings.navCtaHref}
      />
      <main className="grow">{children}</main>
      <Footer
        siteName={settings.siteName}
        tagline={settings.tagline}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        copyright={settings.copyright}
        icp={settings.icp}
      />
    </div>
  );
}
