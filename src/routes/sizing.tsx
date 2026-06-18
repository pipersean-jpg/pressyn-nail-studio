import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import measuringGuideAsset from "@/assets/measuring-guide.jpg.asset.json";

export const Route = createFileRoute("/sizing")({
  head: () => ({
    meta: [
      { title: "Sizing Guide — Pressynstudio.co" },
      { name: "description", content: "Find your perfect press-on nail size." },
    ],
    links: [{ rel: "canonical", href: "/sizing" }],
  }),
  component: SizingPage,
});

function SizingPage() {
  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Fit Guide</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Sizing & Application</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h2 className="font-display text-3xl text-primary">How to measure</h2>
          <ol className="mt-4 space-y-3 text-foreground/90 list-decimal pl-5">
            <li>Grab a $1-$2 coin and place it next to your first four figures.</li>
            <li>next take a photo, then do the same with your thumb.</li>
            <li>lastly send your photos to pressynstoudio.co on instagram.</li>
          </ol>
          <Button size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Download className="h-4 w-4 mr-2" /> Download Measuring Guide
            </a>
          </Button>
        </div>
        <div>
          <h2 className="font-display text-3xl text-primary">Application steps</h2>
          <ol className="mt-4 space-y-3 text-foreground/90 list-decimal pl-5">
            <li>Wash and dry hands. Push back cuticles gently.</li>
            <li>Lightly buff the surface of each natural nail.</li>
            <li>Swipe with the prep pad and let air-dry for 30 seconds.</li>
            <li>Apply a thin layer of glue to your nail and the press-on.</li>
            <li>Press down for 30 seconds at the cuticle, then the sides.</li>
          </ol>
        </div>
        <div>
          <h2 className="font-display text-3xl text-primary">Nail care tips</h2>
          <ul className="mt-4 space-y-3 text-foreground/90 list-disc pl-5">
            <li>Apply cuticle oil daily — even while wearing press-ons.</li>
            <li>Wear gloves for long water exposure (cleaning, washing dishes).</li>
            <li>Remove gently with warm soapy water — never pry off.</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}