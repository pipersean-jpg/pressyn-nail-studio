import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Pressynstudio.co" },
      { name: "description", content: "Shipping information and return policy." },
    ],
    links: [{ rel: "canonical", href: "/policies" }],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Policies</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Shipping & Returns</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h2 className="font-display text-3xl text-primary">Shipping</h2>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            Ready-to-wear sets ship within 1–3 business days. Custom orders ship within 7–10 business days. Free standard shipping on orders over $80. International shipping available — rates calculated at checkout.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-primary">Returns</h2>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            For hygiene reasons we do not accept returns on opened or used sets. If your order arrives damaged or incorrect, contact us within 7 days at <a className="text-primary underline" href="mailto:hello@pressynstudio.co">hello@pressynstudio.co</a> and we'll make it right.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-primary">Privacy</h2>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            We only collect information necessary to fulfil your order and never share your details with third parties for marketing.
          </p>
        </div>
      </section>
    </Layout>
  );
}