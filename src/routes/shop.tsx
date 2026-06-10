import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import shop1 from "@/assets/shop-1.png.asset.json";
import shop2 from "@/assets/shop-2.png.asset.json";
import shop3 from "@/assets/shop-3.png.asset.json";
import shop4 from "@/assets/shop-4.png.asset.json";
import shop5 from "@/assets/shop-5.png.asset.json";
import shop6 from "@/assets/shop-6.png.asset.json";
import shop7 from "@/assets/shop-7.png.asset.json";
import shop8 from "@/assets/shop-8.png.asset.json";
import shop9 from "@/assets/shop-9.png.asset.json";
const collectionImages = [
  { url: shop1.url, name: "Look 01", price: "$50" },
  { url: shop2.url, name: "Look 02", price: "$50 (no 3D) - $55 (with 3D)" },
  { url: shop3.url, name: "\n", price: "$40" },
  { url: shop4.url, name: "'stripy Bobby'", price: "$45" },
  { url: shop5.url, name: "'dime'", price: "$45" },
  { url: shop6.url, name: "'bit stripey'", price: "$45" },
  { url: shop7.url, name: "'simple dimple'", price: "$30" },
  { url: shop8.url, name: "'shimmer and shine'", price: "$35" },
  { url: shop9.url, name: "'spotty bobby'", price: "$35" },
];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Pressynstudio.co" },
      { name: "description", content: "Shop our full collection of handcrafted luxury press-on nails." },
      { property: "og:title", content: "Shop All — Pressynstudio.co" },
      { property: "og:description", content: "Handcrafted luxury press-on nails. Browse all collections." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">The Collection</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Shop All</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Hand-finished press-on nails, ready for every moment.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {collectionImages.map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-square overflow-hidden rounded-lg bg-blush/30">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-display text-lg text-primary">{item.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}