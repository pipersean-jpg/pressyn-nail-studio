import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-b from-background to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl text-primary">Pressyn<span className="text-gold">studio</span></div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Handcrafted luxury press-on nails designed for the modern woman. Salon-quality wear, in minutes.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-full bg-blush/60 flex items-center justify-center hover:bg-gold/40 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="mailto:hello@pressynstudio.co" className="h-9 w-9 rounded-full bg-blush/60 flex items-center justify-center hover:bg-gold/40 transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Collections</Link></li>
            <li><Link to="/custom-orders" className="hover:text-primary">Custom Orders</Link></li>
            <li><Link to="/sizing" className="hover:text-primary">Sizing Guide</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/policies" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} Pressynstudio.co — All rights reserved.</p>
          <p>Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  );
}