import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  shape: z.enum(["Coffin", "Almond", "Seletto"]),
  length: z.enum(["Short", "Long"]),
  design: z.string().trim().min(1).max(2000),
}).refine((d) => d.shape !== "Seletto" || d.length === "Long", {
  message: "Seletto is available in Long only",
  path: ["length"],
});

export const Route = createFileRoute("/custom-orders")({
  head: () => ({
    meta: [
      { title: "Custom Orders — Pressynstudio.co" },
      { name: "description", content: "Design your own bespoke press-on nail set." },
    ],
    links: [{ rel: "canonical", href: "/custom-orders" }],
  }),
  component: CustomPage,
});

function CustomPage() {
  const [form, setForm] = useState({ name: "", email: "", shape: "", length: "", design: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Please fill in every field", { position: "top-center" });
      return;
    }
    toast.success("Custom request sent — we'll be in touch within 48 hours.", { position: "top-center" });
    setForm({ name: "", email: "", shape: "", length: "", design: "" });
  };

  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Bespoke</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Custom Orders</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us your vision. Every custom set is hand-painted to your spec.
          </p>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-4 py-16">
        <form onSubmit={submit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shape">Preferred shape</Label>
              <Select value={form.shape} onValueChange={(v) => setForm({ ...form, shape: v, length: v === "Seletto" ? "Long" : form.length })}>
                <SelectTrigger id="shape"><SelectValue placeholder="Select shape" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffin">Coffin</SelectItem>
                  <SelectItem value="Almond">Almond</SelectItem>
                  <SelectItem value="Seletto">Seletto (long only)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="length">Preferred length</Label>
              <Select value={form.length} onValueChange={(v) => setForm({ ...form, length: v })}>
                <SelectTrigger id="length"><SelectValue placeholder="Select length" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short" disabled={form.shape === "Seletto"}>Short</SelectItem>
                  <SelectItem value="Long">Long</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="design">Design notes</Label>
            <Textarea id="design" rows={6} placeholder="Colours, finish, art, inspiration links…" value={form.design} onChange={(e) => setForm({ ...form, design: e.target.value })} maxLength={2000} />
          </div>
          <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Submit Request</Button>
        </form>
      </section>
    </Layout>
  );
}