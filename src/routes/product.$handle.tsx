import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Loader2, ShoppingBag, ChevronLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} — Pressynstudio.co` },
      { name: "description", content: "Handcrafted luxury press-on nails." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const variants = product?.node.variants.edges ?? [];
  const variant = useMemo(() => {
    if (selectedVariantId) return variants.find((v) => v.node.id === selectedVariantId)?.node;
    return variants.find((v) => v.node.availableForSale)?.node ?? variants[0]?.node;
  }, [variants, selectedVariantId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    throw notFound();
  }

  const p = product.node;
  const images = p.images.edges;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to bag", { description: p.title, position: "top-center" });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to shop
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-blush/30">
              {images[activeImage] ? (
                <img src={images[activeImage].node.url} alt={images[activeImage].node.altText ?? p.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${i === activeImage ? "border-gold" : "border-transparent"}`}
                  >
                    <img src={img.node.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-primary leading-tight">{p.title}</h1>
            <p className="mt-4 text-2xl text-foreground/90">
              {variant?.price.currencyCode} {parseFloat(variant?.price.amount ?? p.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
            {p.description && (
              <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">{p.description}</p>
            )}

            {variants.length > 1 && (
              <div className="mt-8">
                <p className="text-xs tracking-[0.25em] uppercase text-foreground/70 mb-3">Choose option</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const id = v.node.id;
                    const active = (variant?.id ?? variants[0]?.node.id) === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedVariantId(id)}
                        disabled={!v.node.availableForSale}
                        className={`px-4 py-2 text-sm rounded-md border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"} ${!v.node.availableForSale ? "opacity-40 line-through" : ""}`}
                      >
                        {v.node.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              onClick={handleAdd}
              disabled={isAdding || !variant?.availableForSale}
              size="lg"
              className="mt-10 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : (<><ShoppingBag className="h-4 w-4 mr-2" />{variant?.availableForSale ? "Add to Bag" : "Sold Out"}</>)}
            </Button>

            <div className="mt-8 text-xs tracking-wide text-muted-foreground border-t border-border/60 pt-6 space-y-2">
              <p>✦ Hand-finished, made to last 2–3 weeks</p>
              <p>✦ Application kit included with every set</p>
              <p>✦ Free shipping on orders over $80</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}