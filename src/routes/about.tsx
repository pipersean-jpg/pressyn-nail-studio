import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import elyceAsset from "@/assets/elyce.png.asset.json";
import aylaAsset from "@/assets/ayla.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Pressynstudio.co" },
      { name: "description", content: "Our story — handcrafted luxury press-on nails." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Our Story</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">About Pressyn</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral">
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          HI MY NAME IS ELYCE!! 👋 I am the founder and owner of PRESSYNSTUDIO.CO!&nbsp; Pressyn is a place where people can get press-on nails at their finesse✨ DM me on instagram to begin your journey with us and have the best experience, deals and more 😉 Enjoy beautiful, refined nails from the comfort of your home! I believe that nails should feel refined, simple, and elevated — made to fit and match into everyday outfits and life while still feeling special. every set is crafted to look salon-quality, minus the salon. 💅💕
        </p>
        <figure className="mt-8 max-w-md mx-auto">
          <img
            src={elyceAsset.url}
            alt="Elyce, founder of Pressynstudio.co"
            className="w-full rounded-2xl shadow-xl object-cover"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-xs tracking-[0.25em] uppercase text-gold">Elyce — Founder</figcaption>
        </figure>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          {"\n"}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
          welcome ayla to PRESSYNSTUDIO.CO as our model Can’t wait for ayla to have the best experience here with us!! She is getting sent a Pressyn package every month to model and create beautiful content 💅 DM or email me to have this same amazing experience as ayla 🤍🙌&nbsp;{"\n\n\n\n\n\n\n\n"}
        </p>
        <figure className="mt-8 max-w-md mx-auto">
          <img
            src={aylaAsset.url}
            alt="Ayla, Pressynstudio.co model"
            className="w-full rounded-2xl shadow-xl object-cover"
            loading="lazy"
          />
          <figcaption className="mt-3 text-center text-xs tracking-[0.25em] uppercase text-gold">Ayla — Model</figcaption>
        </figure>
      </section>
    </Layout>
  );
}