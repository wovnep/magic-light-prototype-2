import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Camera, Award, Users, Image as ImageIcon, Check, Quote,
  MapPin, Phone, Facebook, Instagram, MessageCircle, Cpu, Printer, Sparkles, ShieldCheck,
  User, Film, Heart, UsersRound, Play
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";

import heroImg from "@/assets/hero-graduation.jpg";
import aboutImg from "@/assets/about-studio.jpg";
import g1 from "@/assets/gallery-portrait-1.jpg";
import g2 from "@/assets/gallery-stage-1.jpg";
import g3 from "@/assets/gallery-family-1.jpg";
import g4 from "@/assets/gallery-group-1.jpg";
import g5 from "@/assets/gallery-portrait-2.jpg";
import g6 from "@/assets/gallery-stage-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MagicLight (Pvt) Ltd — Sri Lanka's Trusted Graduation Photography" },
      {
        name: "description",
        content:
          "Premium graduation & convocation photography in Sri Lanka. Trusted by universities and institutes. Portraits, stage, family & group photos with elegant printing.",
      },
      { property: "og:title", content: "MagicLight — Graduation Photography Sri Lanka" },
      { property: "og:description", content: "Capturing Sri Lanka's proudest moments with elegance and care." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Packages />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <FooterBar />
    </div>
  );
}

/* ─────────── FAQ ─────────── */
const faqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 3–4 weeks before your graduation date. Convocation season fills up quickly, so the earlier the better." },
  { q: "Do you travel outside Colombo?", a: "Yes. We cover graduation ceremonies islandwide across Sri Lanka. Travel fees may apply for locations outside the Western Province." },
  { q: "When will I receive my photos?", a: "Edited digital photos are delivered within 7–10 business days. Printed albums and frames take 2–3 weeks after final selections." },
  { q: "Can I customise a package?", a: "Absolutely. Mix and match from our à la carte menu, or contact us for a fully tailored quote for your event." },
  { q: "Do you offer family and group shoots on the same day?", a: "Yes. Family portraits, group shots and individual stage moments are all included in our standard graduation packages." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-surface">
      <div className="container-px mx-auto max-w-4xl">
        <Reveal>
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Everything you need to know before booking your graduation shoot with MagicLight.</p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="bg-white rounded-[10px] border border-border shadow-[0_2px_10px_-6px_rgba(0,0,0,0.08)] overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-surface/60 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg md:text-xl font-semibold text-ink">{f.q}</span>
                    <span className={`flex-shrink-0 h-8 w-8 rounded-full grid place-items-center transition-all ${isOpen ? "bg-primary text-white rotate-45" : "bg-surface text-ink"}`}>
                      <span className="text-xl leading-none font-light">+</span>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Graduation moment captured by MagicLight"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
      <div className="relative container-px mx-auto max-w-7xl pt-28 pb-16 text-white">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-5">
            <span className="h-px w-8 bg-primary" /> MagicLight (Pvt) Ltd
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-white">
            Capturing Sri Lanka's<br />
            <span className="italic">Proudest</span> <span className="text-primary">Moments</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl">
            Professional Graduation Photography — Trusted by Universities & Institutes across Sri Lanka.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#packages" className="btn-primary">View Packages</a>
            <a href="#gallery" className="btn-outline-light">See Our Work</a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase">
        Scroll
      </div>
    </section>
  );
}

/* ─────────── ABOUT ─────────── */
function Counter({ to, suffix = "+", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-primary">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-ink font-medium">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <img src={aboutImg} alt="MagicLight studio at work" width={1200} height={1400}
              loading="lazy"
              className="rounded-2xl shadow-[var(--shadow-elevated)] w-full h-auto object-cover aspect-[4/5]" />
            <div className="hidden md:block absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-6 py-5 rounded-xl shadow-[var(--shadow-orange)]">
              <div className="font-display text-3xl font-bold leading-none">15+</div>
              <div className="text-xs uppercase tracking-wider mt-1">Years of Craft</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex gap-5">
            <div className="orange-bar" />
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Who We Are</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2">About MagicLight</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                MagicLight Photography is one of Sri Lanka's leading graduation photography companies,
                trusted by universities and institutes for professional convocation photography. With years
                of experience, advanced camera technology, premium printing, and a dedicated production team,
                we capture every graduate's proudest moment with clarity, elegance, and care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From individual portraits and stage photographs to family memories and group photos, MagicLight
                provides a complete graduation photography experience with quality, reliability, and lasting value.
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <Counter to={15} label="Years of Experience" />
            <Counter to={40} label="Universities Served" />
            <Counter to={50000} label="Graduates Captured" />
            <Counter to={250000} label="Photos Delivered" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── SERVICES ─────────── */
const services = [
  { icon: User, title: "Individual Portraits", desc: "Full and bust studio-quality portraits in elegant frames." },
  { icon: Film, title: "Stage Photography", desc: "Capturing every defining convocation ceremony moment." },
  { icon: Heart, title: "Family Photos", desc: "Cherished family memories beside your graduate." },
  { icon: UsersRound, title: "Group Photos", desc: "School & batch group portraits with timeless composition." },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-28 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 orange-underline">
            Our Services
          </h2>
          <p className="mt-6 text-muted-foreground">
            A complete graduation photography experience — from your first portrait to the final printed memory.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="card-soft p-8 h-full group">
                <div className="h-14 w-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-border bg-surface px-6 py-5 flex flex-wrap items-center justify-center gap-3 text-center">
            <Play className="h-5 w-5 text-primary" />
            <span className="text-ink font-medium">
              Also included: <span className="text-primary font-semibold">Video on DVD & Soft Copy</span> delivery
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── PACKAGES ─────────── */
type Pkg = {
  name: string; price: string; items: string[]; featured?: boolean; badge?: string;
};
const packages: Pkg[] = [
  {
    name: "Package 03", price: "5,000",
    items: [
      "Individual 11\"×13\" (Full or Bust) × 1",
      "Stage 11\"×13\" × 1",
      "Video on DVD × 1",
    ],
  },
  {
    name: "Package 01", price: "10,000", featured: true, badge: "Best Value",
    items: [
      "Individual 11\"×13\" Full × 1",
      "Individual 11\"×13\" Bust × 1",
      "Family 11\"×13\" × 1",
      "Stage 11\"×13\" × 1",
      "Group 12\"×15\" (School) × 1",
      "Video on DVD × 1",
    ],
  },
  {
    name: "Package 02", price: "8,000",
    items: [
      "Individual 11\"×13\" (Full or Bust) × 1",
      "Family 11\"×13\" × 1",
      "Stage 11\"×13\" × 1",
      "Group 12\"×15\" (School) × 1",
      "Video on DVD × 1",
    ],
  },
];

const alaCarte = [
  ["Individual 11\"×13\" Photo", "Rs. 2,000/-"],
  ["Family 11\"×13\" Photo", "Rs. 2,000/-"],
  ["Stage 11\"×13\" Photo", "Rs. 2,500/-"],
  ["Group 12\"×15\" Photo", "Rs. 2,500/-"],
  ["Soft Copy (Per Image)", "Rs. 1,000/-"],
];

function Packages() {
  return (
    <section id="packages" className="py-24 md:py-32 bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 orange-underline">
            Photography Packages
          </h2>
          <p className="mt-6 text-muted-foreground">
            Choose the package that fits your celebration — every option includes premium printing & DVD delivery.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {packages.map((p, i) => {
            const featured = p.featured;
            return (
              <Reveal key={p.name} delay={i * 100} className={featured ? "md:-mt-6" : ""}>
                <div
                  className={`relative rounded-2xl p-8 md:p-9 h-full transition-all duration-300 ${
                    featured
                      ? "bg-ink text-white shadow-[var(--shadow-elevated)] ring-2 ring-primary"
                      : "bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)]"
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full shadow-[var(--shadow-orange)]">
                      {p.badge}
                    </div>
                  )}
                  <div className={`text-xs uppercase tracking-[0.2em] font-semibold ${featured ? "text-primary" : "text-primary"}`}>
                    {p.name}
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className={`font-display text-5xl font-bold ${featured ? "text-white" : "text-ink"}`}>
                      Rs. {p.price}
                    </span>
                    <span className={`text-sm ${featured ? "text-white/60" : "text-muted-foreground"}`}>/-</span>
                  </div>
                  <div className={`mt-2 text-xs ${featured ? "text-white/60" : "text-muted-foreground"}`}>
                    All inclusive package
                  </div>

                  <ul className="mt-7 space-y-3">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3 items-start text-sm">
                        <Check className={`h-5 w-5 shrink-0 mt-0.5 ${featured ? "text-primary" : "text-primary"}`} />
                        <span className={featured ? "text-white/90" : "text-ink/85"}>{it}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`mt-9 w-full ${featured ? "btn-primary" : "btn-outline-orange"}`}
                  >
                    Book This Package
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-20">
          <div className="text-center mb-6">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink">À La Carte Pricing</h3>
            <p className="text-sm text-muted-foreground mt-2">Add individual prints or soft copies anytime.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-border">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {alaCarte.map(([item, price], i) => (
                  <tr key={item} className={i % 2 ? "bg-surface" : "bg-white"}>
                    <td className="px-6 py-4 text-ink">{item}</td>
                    <td className="px-6 py-4 text-right font-semibold text-ink">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────── GALLERY ─────────── */
type GItem = { src: string; cat: string; alt: string; tall?: boolean };
const galleryItems: GItem[] = [
  { src: g1, cat: "Portraits", alt: "Graduate portrait", tall: true },
  { src: g2, cat: "Stage", alt: "Stage convocation moment" },
  { src: g3, cat: "Family", alt: "Family with graduate" },
  { src: g4, cat: "Groups", alt: "Batch group photo" },
  { src: g5, cat: "Portraits", alt: "Studio bust portrait", tall: true },
  { src: g6, cat: "Stage", alt: "Cap toss silhouette" },
];
const filters = ["All", "Portraits", "Stage", "Family", "Groups"];

function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GItem | null>(null);
  const items = active === "All" ? galleryItems : galleryItems.filter((g) => g.cat === active);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 orange-underline">
            Recent Work
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-orange)]"
                  : "bg-surface text-ink hover:bg-ink hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {items.map((it, i) => (
            <Reveal key={it.src} delay={i * 60}>
              <button
                onClick={() => setLightbox(it)}
                className="group relative block w-full overflow-hidden rounded-xl shadow-[var(--shadow-card)] break-inside-avoid"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 ${
                    it.tall ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-colors duration-300 flex items-end p-5">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs uppercase tracking-widest">{it.cat}</div>
                    <div className="font-display text-lg">{it.alt}</div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox.src} alt={lightbox.alt} className="max-h-[90vh] max-w-[95vw] rounded-lg shadow-2xl" />
          <button
            className="absolute top-6 right-6 text-white/90 hover:text-primary text-sm uppercase tracking-widest"
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}

/* ─────────── WHY US ─────────── */
const whyItems = [
  { icon: Cpu, title: "Advanced Camera Technology", desc: "Latest pro-grade gear for crisp, true-to-life images." },
  { icon: Printer, title: "Premium Print Quality", desc: "Archival inks and fine art papers built to last decades." },
  { icon: Sparkles, title: "Dedicated Production Team", desc: "Specialists handling every step from capture to delivery." },
  { icon: ShieldCheck, title: "Trusted by Top Universities", desc: "The preferred partner for Sri Lanka's leading institutes." },
];

function WhyUs() {
  return (
    <section className="py-24 md:py-32 bg-ink text-white">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Why MagicLight</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Quality you can <span className="text-primary italic">see and hold</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-10">
          {whyItems.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <div className="flex gap-5 p-6 md:p-7 rounded-2xl border border-white/10 hover:border-primary/60 hover:bg-white/[0.03] transition-colors">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <w.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{w.title}</h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
const testimonials = [
  { quote: "MagicLight made our convocation unforgettable. The prints arrived flawlessly framed.", name: "Dilani Perera", uni: "University of Colombo" },
  { quote: "Professional team, beautiful photographs. My family treasures every single shot.", name: "Kasun Fernando", uni: "University of Moratuwa" },
  { quote: "From stage to studio, every moment was captured perfectly. Highly recommended.", name: "Anushka Silva", uni: "SLIIT" },
  { quote: "The quality of printing is exceptional — these will last a lifetime.", name: "Roshan Jayasuriya", uni: "University of Kelaniya" },
  { quote: "Timely delivery, gorgeous images, and a team that genuinely cares.", name: "Sahani Wijesinghe", uni: "NIBM" },
];

function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="py-24 md:py-28 bg-background overflow-hidden">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Kind Words</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 orange-underline">
            What Graduates Say
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 relative">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <div
              key={i}
              className="w-[340px] md:w-[420px] shrink-0 bg-white rounded-2xl border border-border p-8 shadow-[var(--shadow-card)]"
            >
              <Quote className="h-10 w-10 text-primary" strokeWidth={1.5} />
              <p className="mt-4 text-ink/85 font-display italic text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-semibold text-ink">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.uni}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CONTACT ─────────── */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="grid md:grid-cols-2 min-h-[600px]">
      {/* Left dark */}
      <div className="bg-ink text-white p-10 md:p-16 lg:p-20">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">
            Get In <span className="text-primary italic">Touch</span>
          </h2>
          <p className="mt-5 text-white/70 max-w-md">
            Visit our studio or reach out — we're ready to capture your graduation story.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">Studio</div>
                <div className="mt-1">No 11, Balapokuna Road, Kirulapone, Colombo 06</div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">Phone</div>
                <div className="mt-1 space-x-3">
                  <a href="tel:0112364364" className="hover:text-primary">0112 364 364</a>
                  <span className="text-white/30">|</span>
                  <a href="tel:0774747096" className="hover:text-primary">0774 747 096</a>
                </div>
              </div>
            </li>
          </ul>

          <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
            <iframe
              title="MagicLight studio map"
              src="https://www.google.com/maps?q=Balapokuna+Road+Kirulapone+Colombo&output=embed"
              width="100%" height="220" style={{ border: 0 }} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: MessageCircle, href: "#" },
            ].map((s, i) => (
              <a key={i} href={s.href}
                className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Right white */}
      <div className="bg-background p-10 md:p-16 lg:p-20">
        <Reveal>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-ink">Send a Message</h3>
          <p className="mt-2 text-muted-foreground">We'll respond within one business day.</p>

          {sent ? (
            <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6 text-ink">
              <div className="font-display text-xl font-semibold">Thank you!</div>
              <p className="mt-2 text-muted-foreground">Your message has been received. We'll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="mt-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Name" name="name" required />
                <Input label="Email" name="email" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Phone" name="phone" />
                <Input label="University / Institute" name="uni" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Message</label>
                <textarea
                  required rows={5}
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">Send Message</button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}

/* ─────────── FOOTER ─────────── */
function FooterBar() {
  return (
    <footer className="bg-ink text-white/70 border-t border-white/10">
      <div className="container-px mx-auto max-w-7xl py-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          <span className="font-display text-lg text-white">
            Magic<span className="text-primary">Light</span>
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a href="#home" className="hover:text-primary">Home</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#packages" className="hover:text-primary">Packages</a>
          <a href="#gallery" className="hover:text-primary">Gallery</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
        <div className="text-xs text-white/50 text-center md:text-right">
          © 2025 MagicLight (Pvt) Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
