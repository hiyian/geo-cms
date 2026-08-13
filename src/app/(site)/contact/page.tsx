import { ContactForm } from "@/components/site/ContactForm";
import { FadeIn } from "@/components/site/FadeIn";
import { getContactData, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [data, settings] = await Promise.all([getContactData(), getSiteSettings()]);

  return (
    <div className="bg-white pt-32 pb-24 transition-colors dark:bg-navy-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-6xl dark:text-white">
            {data.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">{data.subtitle}</p>
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-2">
          <FadeIn>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-navy-800/50">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">联系方式</h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <div>
                  <div className="text-sm text-slate-400">电话</div>
                  <div className="font-medium text-slate-900 dark:text-white">{settings.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">邮箱</div>
                  <div className="font-medium text-slate-900 dark:text-white">{settings.email}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">地址</div>
                  <div className="font-medium text-slate-900 dark:text-white">{settings.address}</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-white/10 dark:bg-navy-800/50">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                {data.formTitle}
              </h2>
              <ContactForm successMessage={data.successMessage} />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
