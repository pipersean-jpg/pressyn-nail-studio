import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useLocalCartStore } from "@/stores/localCartStore";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import shop1 from "@/assets/shop-1.png.asset.json";
import shop2 from "@/assets/shop-2.png.asset.json";
import shop3 from "@/assets/shop-3.png.asset.json";
import shop4 from "@/assets/shop-4.png.asset.json";
import shop5 from "@/assets/shop-5.png.asset.json";
import shop6 from "@/assets/shop-6.png.asset.json";
import shop7 from "@/assets/shop-7.png.asset.json";
import shop8 from "@/assets/shop-8.png.asset.json";
import shop9 from "@/assets/shop-9.png.asset.json";
type NailItem = {
  url: string;
  name: string;
  price: string;
  description: string;
  colors: { name: string; hex: string }[];
  details: string[];
};
const collectionImages: NailItem[] = [
  {
    url: shop1.url,
    name: "'party girl'",
    price: "$50",
    description: "Sparkle-forward set made for big nights out. Glitter accents on a soft, polished base.",
    colors: [
      { name: "one colour and design", hex: "#E8D6B3" },
    ],
    details: ["Almond shape", "short or long length"],
  },
  {
    url: shop2.url,
    name: "'clean girl'",
    price: "$40",
    description: "Sheer, glossy, effortless. The everyday set that goes with everything.",
    colors: [
      { name: "pink - white polkadots", hex: "#F4D6D6" },
      { name: "YOUR OWN COLOUR", hex: "#EFE3D8" },
      { name: "white - black polkadots", hex: "#F8F4F0" },
    ],
    details: ["Almond shape", "Short / long", "Glossy finish"],
  },
  {
    url: shop3.url,
    name: "'mystical magical'",
    price: "$45 (no 3D) - $50 (with 3D)",
    description: "Ethereal pearl shimmer with optional 3D charms for a dreamier finish.",
    colors: [
      { name: "pink", hex: "#F4A6B5" },
      { name: "light blue+dark blue", hex: "#87CEEB" },
    ],
    details: ["Almond shape", "short / long", "Optional 3D flowers"],
  },
  {
    url: shop4.url,
    name: "'stripy Bobby'",
    price: "$45",
    description: "Hand-painted stripes for a playful retro touch. Bold but wearable.",
    colors: [
      { name: "one colour", hex: "#1A1A1A" },
    ],
    details: ["almond shape", "Short / long", "Hand-painted"],
  },
  {
    url: shop5.url,
    name: "'dime'",
    price: "$45",
    description: "Subtle elegance with delicate gold detailing. A million-dollar look.",
    colors: [
      { name: "blue swirl", hex: "#4A90E2" },
      { name: "pink swirl", hex: "#F06292" },
    ],
    details: ["Almond shape", "short or long length", "bloom work"],
  },
  {
    url: shop6.url,
    name: "'bit stripey'",
    price: "$45",
    description: "A softer take on stripes — fine lines on a clean nude base.",
    colors: [
      { name: "Nude + White", hex: "#EBD7C7" },
      { name: "blue", hex: "#4A90E2" },
    ],
    details: ["Almond shape", "Short / long", "Fine line work"],
  },
  {
    url: shop7.url,
    name: "'simple dimple'",
    price: "$30",
    description: "The classic. One color, perfectly applied. Timeless and refined.",
    colors: [
      { name: "Nude", hex: "#E8C9B0" },
      { name: "Soft Pink", hex: "#F2CFD0" },
      { name: "French", hex: "#F8F4F0" },
    ],
    details: ["Any shape", "Any length", "Solid color"],
  },
  {
    url: shop8.url,
    name: "'shimmer and shine'",
    price: "$35",
    description: "Soft chrome shimmer that catches the light from every angle.",
    colors: [
      { name: "Pearl Chrome", hex: "#EDE3D2" },
      { name: "Rose Chrome", hex: "#E9C5C9" },
      { name: "Silver Chrome", hex: "#D4D4D8" },
    ],
    details: ["Almond shape", "short or long length", "Chrome finish"],
  },
  {
    url: shop9.url,
    name: "'spotty bobby'",
    price: "$35",
    description: "Playful polka dots, hand-painted for a fun everyday set.",
    colors: [
      { name: "Nude + Black dots", hex: "#C8A882" },
      { name: "White + Pink dots", hex: "#F8F4F0" },
    ],
    details: ["Square shape", "Short / long", "Hand-painted"],
  },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const navigate = useNavigate();
  const addItem = useLocalCartStore((s) => s.addItem);
  const active = openIndex !== null ? collectionImages[openIndex] : null;

  const handleOpen = (i: number) => {
    setOpenIndex(i);
    setSelectedColor(collectionImages[i].colors[0]?.name ?? null);
  };

  const handleAdd = () => {
    if (!active || openIndex === null) return;
    addItem({
      id: String(openIndex),
      name: active.name,
      price: active.price,
      image: active.url,
      color: selectedColor ?? undefined,
    });
    toast.success("Added to bag", { description: active.name, position: "top-center" });
    setOpenIndex(null);
    navigate({ to: "/cart" });
  };
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
            <button
              key={i}
              type="button"
              onClick={() => handleOpen(i)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
              aria-label={`View details for ${item.name}`}
            >
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
                <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity">Tap for details</p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden rounded-lg bg-blush/30">
                <img src={active.url} alt={active.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl text-primary text-left">{active.name}</DialogTitle>
                  <DialogDescription className="text-left text-base text-foreground/80 mt-1">{active.price}</DialogDescription>
                </DialogHeader>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{active.description}</p>
                <div className="mt-5">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">Colours</p>
                  <div className="flex flex-wrap gap-2">
                    {active.colors.map((c) => (
                      <button
                        type="button"
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 border rounded-full pl-1 pr-3 py-1 transition-colors ${selectedColor === c.name ? "border-gold bg-blush/30" : "border-border/60 hover:border-foreground/40"}`}
                      >
                        <span className="h-5 w-5 rounded-full border border-border/60" style={{ backgroundColor: c.hex }} />
                        <span className="text-xs">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-2">Details</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {active.details.filter(d => d.trim() !== "").map((d) => (
                      <li key={d}>✦ {d}</li>
                    ))}
                  </ul>
                </div>
                <Button onClick={handleAdd} className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                  <ShoppingBag className="h-4 w-4 mr-2" /> Add to bag
                </Button>
                <p className="mt-3 text-xs text-muted-foreground text-center">DM @pressynstudio.co on Instagram to finalise your order.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}