import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Truck, HeartHandshake, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/shopify";
import heroAsset from "@/assets/hero-nails-v3.jpg.asset.json";
const heroImg = heroAsset.url;
import best1 from "@/assets/best-1.png.asset.json";
import best2 from "@/assets/best-2.png.asset.json";
import best3 from "@/assets/best-3.png.asset.json";
import best4 from "@/assets/best-4.png.asset.json";
const bestSellerImages = [best1.url, best2.url, best3.url, best4.url];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pressynstudio.co — Luxury Press-On Nails" },
      { name: "description", content: "Handcrafted luxury press-on nails. Salon-quality wear in minutes." },
      { property: "og:title", content: "Pressynstudio.co — Luxury Press-On Nails" },
      { property: "og:description", content: "Handcrafted luxury press-on nails. Salon-quality wear in minutes." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "home"],
    queryFn: () => fetchProducts(8),
  });

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blush/40 via-background to-nude/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold">
              <Sparkles className="h-3 w-3" /> New collection
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-primary">
              Luxury at your<br /><em className="not-italic text-gold">fingertips.</em>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Handcrafted press-on nails designed to make every moment feel a little more elevated. Salon-quality, in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/30">
                <Link to="/custom-orders">Custom Designs</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gold/20 rounded-full blur-3xl" />
            <img
              src={heroImg}
              alt="Luxury press-on nails on a marble surface with rose petals"
              width={1600}
              height={1024}
              className="relative rounded-2xl shadow-2xl object-cover aspect-[5/4]"
            />
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-y border-border/60 bg-blush/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, label: "Salon Quality" },
            { icon: HeartHandshake, label: "Handcrafted" },
            { icon: Truck, label: "Fast Shipping" },
            { icon: Star, label: "Reusable" },
          ].map((v) => (
            <div key={v.label} className="flex flex-col items-center text-center">
              <v.icon className="h-6 w-6 text-gold mb-2" />
              <p className="text-xs tracking-[0.25em] uppercase text-foreground/80">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Best Sellers</p>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-primary">Loved by you</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline text-sm tracking-wide text-primary hover:underline">View all →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {bestSellerImages.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden rounded-lg bg-blush/30">
              <img src={src} alt={`Best seller ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL BAND */}
      <section className="bg-gradient-to-r from-primary/95 via-primary to-primary/95 text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4">The Pressyn promise</p>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            "Every set is hand-painted, hand-finished, and made to last for weeks."
          </h2>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">QUOTES</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-primary">Loved by our clients</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Chloe", quote: "Everyone's happier with pretty nails." },
            { name: "Mia", quote: "A girl should be two things: classy and fabulous — starting with her nails." },
            { name: "Sophie", quote: "Life is too short to have boring nails." },
            { name: "Ava", quote: "Nails take whatever you're wearing to the next level." },
            { name: "Zara", quote: "Pretty nails make me feel like I have my life together." },
            { name: "Lily", quote: "When your nails are on point, your whole day is on point." },
            { name: "Isla", quote: "Good nails don't lie." },
            { name: "Ella", quote: "You can't buy happiness, but you can buy press-ons and that's kind of the same thing." },
            { name: "Ruby", quote: "My nails are my best accessory." },
            { name: "Hannah", quote: "New nails, new mood, new me." },
          ].map((review, i) => (
            <div key={i} className="rounded-lg border border-border/60 p-6 bg-card text-center">
              <div className="flex justify-center gap-1 mb-4 text-gold">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm text-foreground/90 italic leading-relaxed">"{review.quote}"</p>
              <p className="mt-4 text-xs tracking-[0.2em] uppercase text-gold">{"\n"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-blush/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">@pressynstudio.co</p>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-primary">Follow the studio</h2>
          <p className="mt-3 text-muted-foreground">Tag us with #PressynStudio for a chance to be featured.</p>
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-gradient-to-br from-blush/60 to-nude/60 hover:scale-105 transition-transform" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function EmptyProducts() {
  return (
    <div className="text-center py-16 border border-dashed border-border rounded-lg bg-blush/10">
      <p className="font-display text-2xl text-primary">No products yet</p>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Add your first collection and it will appear here automatically.
      </p>
    </div>
  );
}
