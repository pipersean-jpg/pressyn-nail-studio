import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

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
        <p className="text-lg leading-relaxed text-foreground/90">
          Pressynstudio.co was born from a love of beautiful, effortless beauty. Every set is hand-painted in our studio with the kind of detail you'd expect from your favourite salon — minus the chair time.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          We believe in luxury that's reusable, kind to your natural nails, and ready when you are. From a quiet morning to your most important night, Pressyn is here for the moment.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          Each set ships in our signature soft-pink and gold packaging, with everything you need to apply, wear, and reuse.
        </p>
      </section>
    </Layout>
  );
}