import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import elyceAsset from "@/assets/elyce.png.asset.json";


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
          Hi, My Name Is Elyce! 👋{"\n\n"}
          I am the founder and owner of PRESSYNSTUDIO.CO!{"\n\n"}
          Pressyn is a place where you can get custom press-on nails designed to suit your style at your finesse ✨. DM me on Instagram to begin your journey with us and enjoy the best experience, exclusive deals, and so much more.{"\n\n"}
          Enjoy beautiful, refined nails from the comfort of your own home! I believe that nails should feel elegant, simple, and elevated — designed to fit seamlessly into everyday outfits and lifestyles while still feeling special. Every set is carefully crafted to achieve a salon-quality look, without the salon💕
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
      </section>
    </Layout>
  );
}