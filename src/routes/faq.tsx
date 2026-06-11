import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "How long do Pressyn nails last?", a: "With proper application, our press-ons last between 2-4 weeks. Care for them gently and they can be reused multiple times." },
  { q: "Are they damaging to natural nails?", a: "Not at all — unless you take them off incorrectly our adhesive is salon-grade but gentle, and we include both glue and adhesive tabs so you can choose your wear style." },
  { q: "Can I shower and wash dishes with them on?", a: "Yes. Once fully set wait about an hour then your nails are water-resistant. We recommend gloves for long dishwashing sessions to maximise wear." },
  { q: "How do I find my size?", a: "take a photo of your four middle fingers with a one dollar coin then the same with your thumb. then DM me on instagram or email @pressynstudio.co to send me your photos. (more info is on my Instagram page" },
  { q: "Do you offer custom designs?", a: "Yes! Visit our Custom Orders page to submit your dream design." },
  { q: "What's your return policy?", a: "For hygiene reasons we don't accept returns on opened sets, but damaged or incorrect orders are replaced free of charge." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Pressynstudio.co" },
      { name: "description", content: "Answers to common questions about Pressyn press-on nails." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <Layout>
      <section className="bg-blush/20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Help</p>
          <h1 className="font-display text-5xl sm:text-6xl mt-3 text-primary">Frequently Asked</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-16">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  );
}