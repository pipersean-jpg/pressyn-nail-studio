import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const variant = p.variants.edges.find((v) => v.node.availableForSale)?.node ?? p.variants.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-blush/30">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
        )}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant}
            className="w-full bg-background/95 text-foreground hover:bg-primary hover:text-primary-foreground shadow-md"
            size="sm"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (<><ShoppingBag className="h-4 w-4 mr-2" />Add to Bag</>)}
          </Button>
        </div>
      </div>
      <div className="mt-4 px-1">
        <h3 className="font-display text-lg leading-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}