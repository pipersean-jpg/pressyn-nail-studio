import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/shopify";
import shop1 from "@/assets/shop-1.png.asset.json";
import shop2 from "@/assets/shop-2.png.asset.json";
import shop3 from "@/assets/shop-3.png.asset.json";
import shop4 from "@/assets/shop-4.png.asset.json";
import shop5 from "@/assets/shop-5.png.asset.json";
import shop6 from "@/assets/shop-6.png.asset.json";
import shop7 from "@/assets/shop-7.png.asset.json";
import shop8 from "@/assets/shop-8.png.asset.json";
import shop9 from "@/assets/shop-9.png.asset.json";
const collectionImages = [shop1, shop2, shop3, shop4, shop5, shop6, shop7, shop8, shop9].map((a) => a.url);

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
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "shop"],
    queryFn: () => fetchProducts(50),
  });

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6 mb-16">
          {collectionImages.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg bg-blush/30">
              <img src={src} alt={`Collection look ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-lg bg-blush/30 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-lg bg-blush/10">
            <p className="font-display text-2xl text-primary">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Tell us what you'd like to sell and we'll create your first product.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>
    </Layout>
  );
}