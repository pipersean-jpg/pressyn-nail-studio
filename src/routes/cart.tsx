import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useLocalCartStore } from "@/stores/localCartStore";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Pressynstudio.co" },
      { name: "description", content: "Review your selected press-on nail sets and check out." },
    ],
  }),
  component: CartPage,
});

function parsePrice(p: string) {
  const m = p.match(/\$(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useLocalCartStore();
  const total = items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0);

  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Your Selection</p>
          <h1 className="font-display text-4xl sm:text-5xl mt-3 text-primary">Your Bag</h1>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Your bag is empty.</p>
            <Link to="/shop">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse the collection</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.color ?? ""}`} className="flex gap-4 p-4 border border-border/60 rounded-lg">
                  <div className="w-24 h-24 bg-blush/30 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-primary">{item.name}</h3>
                    {item.color && <p className="text-xs text-muted-foreground mt-1">Colour: {item.color}</p>}
                    <p className="text-sm mt-1">{item.price}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.color)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">Clear bag</Button>
            </div>
            <aside className="border border-border/60 rounded-lg p-6 h-fit">
              <h2 className="font-display text-xl text-primary">Summary</h2>
              <div className="flex justify-between mt-4 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                To finalise your order, DM <span className="text-foreground">@pressynstudio.co</span> on Instagram with your bag.
              </p>
              <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="https://www.instagram.com/pressynstudio.co/" target="_blank" rel="noreferrer">Message to order</a>
              </Button>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}