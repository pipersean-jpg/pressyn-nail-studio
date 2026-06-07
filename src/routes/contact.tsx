import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Instagram, MapPin } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pressynstudio.co" },
      { name: "description", content: "Get in touch with the Pressyn studio." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error("Please check your details", { position: "top-center" });
      return;
    }
    toast.success("Message sent — we'll be in touch soon!", { position: "top-center" });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Say Hi</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Contact</h1>
          <p className="mt-4 text-muted-foreground">We usually reply within 24 hours.</p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} required />
          </div>
          <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
        </form>
        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gold mt-0.5" />
            <div><p className="font-medium">Email</p><p className="text-muted-foreground">hello@pressynstudio.co</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Instagram className="h-5 w-5 text-gold mt-0.5" />
            <div><p className="font-medium">Instagram</p><p className="text-muted-foreground">@pressynstudio.co</p></div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gold mt-0.5" />
            <div><p className="font-medium">Studio</p><p className="text-muted-foreground">Online — shipping worldwide</p></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}