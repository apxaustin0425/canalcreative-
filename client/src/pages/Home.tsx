/**
 * Canal Creative — Single-page marketing site
 * Design: Industrial-chic, dark background (#1e1a17), orange accent (#E8540A / oklch 0.58 0.19 38)
 * Typography: Barlow Condensed (headings, display) + Barlow (body)
 * Layout: Sticky nav, full-bleed hero, scroll sections, mailto contact form
 */

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import {
  MapPin,
  Navigation,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
  ArrowRight,
  Check,
  Copy,
  Menu,
  X,
} from "lucide-react";

const HERO_IMAGE = "/manus-storage/canal_hero_mural_844c7c39.jpg";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Relief", href: "#relief" },
];

const BANQUET_PHOTOS = [
  "/manus-storage/banquet_01_2930033a.jpg",
  "/manus-storage/banquet_02_4fc488a3.jpg",
  "/manus-storage/banquet_03_4d54ca9e.jpg",
  "/manus-storage/banquet_04_31188268.jpg",
  "/manus-storage/banquet_05_1caae0d2.jpg",
  "/manus-storage/banquet_06_7f57b9a9.jpg",
  "/manus-storage/banquet_07_b85dd51a.jpg",
  "/manus-storage/banquet_08_646e4c1c.jpg",
  "/manus-storage/banquet_09_bc8040ce.jpg",
  "/manus-storage/banquet_10_addbac18.jpg",
  "/manus-storage/banquet_11_c1a8d8c0.jpg",
  "/manus-storage/banquet_12_691d8079.jpg",
  "/manus-storage/banquet_13_410c43bd.jpg",
  "/manus-storage/banquet_14_2e9a1ab3.jpg",
  "/manus-storage/banquet_15_29ec1155.jpg",
];

const STATS = [
  { value: "40+", label: "Units & Studios" },
  { value: "24/7", label: "Secure Access" },
  { value: "Flexible", label: "Lease Terms" },
  { value: "Reading", label: "PA · East Side" },
];

const SPACES = [
  {
    id: "studios",
    label: "Studios",
    tag: "CREATIVE",
    tagColor: "bg-orange-600",
    title: "Studios",
    bestFor: "Artists, photographers, tattooers, designers",
    size: "150 – 500 sq ft",
    description:
      "Bright, flexible creative studios with character. Make them your own — set up a chair, a backdrop, a workbench, or a desk.",
    features: [
      "Natural light",
      "Private entry options",
      "Shared restrooms",
      "Month-to-month available",
    ],
    image: "/manus-storage/IMG_0985_e3367369.jpg",
  },
  {
    id: "offices",
    label: "Offices",
    tag: "PROFESSIONAL",
    tagColor: "bg-zinc-600",
    title: "Offices",
    bestFor: "Consultants, therapists, small agencies, remote teams",
    size: "100 – 400 sq ft",
    description:
      "Private, professional office suites in a creative environment. Focus-ready spaces that don't feel like a corporate park.",
    features: [
      "High-speed internet",
      "Climate controlled",
      "Mail & package handling",
      "Month-to-month available",
    ],
    image: "/manus-storage/IMG_1141_710febbf.jpg",
  },
  {
    id: "workshops",
    label: "Workshops",
    tag: "MAKER",
    tagColor: "bg-yellow-700",
    title: "Workshops",
    bestFor: "Fabricators, woodworkers, mechanics, builders",
    size: "300 – 1,200 sq ft",
    description:
      "Ground-floor workshop bays with high ceilings, roll-up access, and durable concrete floors built for real work.",
    features: [
      "Drive-up access",
      "High ceilings",
      "Heavy-duty power",
      "Loading dock nearby",
    ],
    image: "/manus-storage/IMG_0898_4219c22f.jpg",
  },
  {
    id: "event",
    label: "Event Space",
    tag: "SHARED",
    tagColor: "bg-blue-700",
    title: "Event Space",
    bestFor: "Pop-ups, workshops, community events, shoots",
    size: "Available by the day",
    description:
      "A flexible open-floor venue inside an industrial building. Perfect for markets, classes, photo shoots, and community gatherings.",
    features: [
      "Flexible layout",
      "AV-ready",
      "Day & weekend rental",
      "Tenant priority booking",
    ],
    image: "/manus-storage/banquet_05_1caae0d2.jpg",
  },
];

const AMENITIES = [
  { icon: "🔐", label: "24/7 Keycard Access" },
  { icon: "📦", label: "Mail & Package Handling" },
  { icon: "🌐", label: "High-Speed Internet" },
  { icon: "🅿️", label: "On-Site Parking" },
  { icon: "🚿", label: "Shared Restrooms" },
  { icon: "🔧", label: "On-Site Management" },
  { icon: "📷", label: "Security Cameras" },
  { icon: "🏗️", label: "Loading Dock Access" },
  { icon: "💡", label: "Utilities Included" },
  { icon: "🤝", label: "Tenant Community" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Inquire",
    desc: "Fill out the contact form or send us an email. Tell us about your business and what kind of space you need.",
  },
  {
    num: "02",
    title: "Vetting & Tour",
    desc: "We review every inquiry and schedule a walkthrough of available spaces that fit your needs.",
  },
  {
    num: "03",
    title: "Application",
    desc: "Once you've found your space, you'll receive a straightforward application. No hidden fees or long approval queues.",
  },
  {
    num: "04",
    title: "Lease & Move In",
    desc: "Sign your lease, get your keycard, and start building. Welcome to Canal Creative.",
  },
];

const FAQS = [
  {
    q: "What types of businesses are a good fit?",
    a: "Canal Creative is home to artists, photographers, tattoo artists, therapists, consultants, fabricators, and small agencies. If you create, build, or serve clients — you probably belong here.",
  },
  {
    q: "Are leases month-to-month or long-term?",
    a: "We offer flexible terms. Month-to-month leases are available for most units. Longer-term leases may come with additional benefits — ask us during your tour.",
  },
  {
    q: "Is there parking available?",
    a: "Yes. On-site parking is available for tenants and their clients.",
  },
  {
    q: "What's included in the rent?",
    a: "Most units include utilities, high-speed internet, 24/7 keycard access, and shared restroom facilities. Specific inclusions vary by unit — confirm during your tour.",
  },
  {
    q: "How do I find the building? The address can be confusing.",
    a: "The building is at 531 Canal Street, Reading, PA 19602. It sits along the canal on the east side of Reading. Use Google Maps and look for the large industrial building — the map pin below will take you right to it.",
  },
  {
    q: "Is there an application fee?",
    a: "There is no online application portal at this time. Reach out to us directly and we will guide you through the process.",
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 text-zinc-500 hover:text-white transition-colors"
      title="Copy"
    >
      {copied ? <Check size={14} className="text-orange-500" /> : <Copy size={14} />}
    </button>
  );
}

export default function Home() {
  const [activeSpace, setActiveSpace] = useState("studios");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + BANQUET_PHOTOS.length) % BANQUET_PHOTOS.length : null), []);
  const nextPhoto = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % BANQUET_PHOTOS.length : null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    spaceInterest: "",
    moveIn: "",
    message: "",
    honeypot: "",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentSpace = SPACES.find((s) => s.id === activeSpace) || SPACES[0];

  function handleFormChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return; // spam trap
    const subject = encodeURIComponent(
      `Canal Creative Inquiry — ${form.name}${form.spaceInterest ? ` (${form.spaceInterest})` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\nBusiness Type: ${form.businessType || "—"}\nSpace of Interest: ${form.spaceInterest || "—"}\nMove-in Timeframe: ${form.moveIn || "—"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:andres@canalcreative.net?subject=${subject}&body=${body}`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── STICKY NAV ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.13_0.005_60/0.97)] backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-orange-600 flex items-center justify-center font-display font-black text-white text-sm rounded-sm">
              C
            </div>
            <div className="text-left">
              <div className="font-display font-black text-white text-sm leading-none tracking-wide uppercase">
                Canal Creative
              </div>
              <div className="text-[10px] text-zinc-400 leading-none tracking-widest uppercase">
                Reading, PA
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href.slice(1))}
                className="text-sm text-zinc-300 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex btn-orange px-4 py-2 text-sm rounded-sm"
            >
              Inquire About Space
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[oklch(0.15_0.005_60)] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => {
                  scrollTo(l.href.slice(1));
                  setMobileMenuOpen(false);
                }}
                className="text-left text-base text-zinc-200 font-medium py-1"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                scrollTo("contact");
                setMobileMenuOpen(false);
              }}
              className="btn-orange px-4 py-2.5 text-sm rounded-sm mt-2 text-center"
            >
              Inquire About Space
            </button>
          </div>
        )}
      </header>

      {/* ─── HERO (Scroll Expansion) ─── */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={HERO_IMAGE}
        bgImageSrc={HERO_IMAGE}
        title="Canal Creative"
        date="Reading, PA · 531 Canal St"
        scrollToExpand="Scroll to explore"
        textBlend
      >
        {/* Content revealed after full expansion */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Pill */}
          <div className="pill-tag mb-6 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            Creative Studios · Offices · Workshops
          </div>
          <h1
            className="font-display font-black uppercase text-white leading-none mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            Create, Collaborate
            <br />&amp; Grow In Your New Studio
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Canal Creative is a working community of artists, makers, and small
            businesses inside a historic industrial building in Reading, PA. Find
            your space — and the people building alongside you.
          </p>
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-orange flex items-center gap-2 px-6 py-3 text-base rounded-sm"
            >
              Inquire About Space <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("process")}
              className="flex items-center gap-2 px-6 py-3 text-base rounded-sm border border-white/30 text-white hover:bg-white/10 transition-colors font-display font-bold uppercase tracking-wide"
            >
              Schedule a Tour
            </button>
          </div>
          <a
            href="https://maps.google.com/?q=531+Canal+Street+Reading+PA+19602"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors border border-white/20 rounded-sm px-4 py-2 mx-auto"
          >
            <MapPin size={14} className="text-orange-500" />
            531 Canal Street, Reading, PA 19602
            <span className="text-orange-400 flex items-center gap-1 ml-1">
              <Navigation size={12} /> Get directions
            </span>
          </a>
          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10 rounded-sm">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-5">
                <div className="font-display font-black text-white text-3xl leading-none">{s.value}</div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1 font-display font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollExpandMedia>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="pill-tag mb-5">About</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            A Building Full of
            <br />
            People Who Build Things
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-zinc-300 text-base leading-relaxed">
            <p>
              Canal Creative is a multi-unit creative and commercial facility
              located at 531 Canal Street in Reading, Pennsylvania. The building
              is a historic industrial structure — high ceilings, exposed brick,
              concrete floors — repurposed as a home for independent businesses,
              artists, and makers.
            </p>
            <p>
              From tattoo studios and photography spaces to workshops and
              professional offices, Canal Creative brings together a diverse
community of people who take their work seriously. Every new tenant is carefully vetted to keep the community intentional and collaborative.
            </p>
          </div>
        </div>
      </section>


      {/* ─── AMENITIES ─── */}
      <section id="amenities" className="py-20 bg-background">
        <div className="container">
          <div className="pill-tag mb-5">Amenities</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Everything You Need
            <br />
            to Get to Work
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {AMENITIES.map((a) => (
              <div
                key={a.label}
                className="bg-card border border-white/10 rounded-lg p-4 flex flex-col items-center text-center gap-2 hover:border-orange-600/40 transition-colors"
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs text-zinc-300 font-display font-bold uppercase tracking-wide leading-tight">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-20 bg-[oklch(0.11_0.005_60)]">
        <div className="container">
          <div className="pill-tag mb-5">Process</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            How It Works
          </h2>
          <p className="text-zinc-400 mb-12 max-w-xl">
            No complicated portals. No waiting rooms. We handle every inquiry directly and make the process straightforward.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-white/10 z-0" />
                )}
                <div className="relative z-10">
                  <div className="font-display font-black text-orange-600 text-5xl leading-none mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-display font-black text-white text-xl uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-orange inline-flex items-center gap-2 px-6 py-3 text-base rounded-sm"
            >
              Start the Process <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="pill-tag mb-5">FAQ</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Common Questions
          </h2>
          <div className="flex flex-col divide-y divide-white/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="text-white font-display font-bold text-lg uppercase tracking-wide">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-orange-500 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-zinc-300 text-sm leading-relaxed mt-3 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 bg-[oklch(0.11_0.005_60)]">
        <div className="container">
          <div className="pill-tag mb-5">Contact</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's Talk About
            <br />
            Your Space
          </h2>
          <p className="text-zinc-400 mb-10 max-w-xl">
            Tell us a little about you and your business. We read every inquiry and will follow up to set up a walkthrough.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card border border-white/10 rounded-lg p-6 flex flex-col gap-4"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleFormChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="you@example.com"
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="(610) 000-0000"
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Business type
                  </label>
                  <select
                    name="businessType"
                    value={form.businessType}
                    onChange={handleFormChange}
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-600 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="Artist / Creative">Artist / Creative</option>
                    <option value="Photography / Video">Photography / Video</option>
                    <option value="Tattoo / Body Art">Tattoo / Body Art</option>
                    <option value="Maker / Fabricator">Maker / Fabricator</option>
                    <option value="Consultant / Professional">Consultant / Professional</option>
                    <option value="Health / Wellness">Health / Wellness</option>
                    <option value="Retail / Pop-up">Retail / Pop-up</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Space of interest
                  </label>
                  <select
                    name="spaceInterest"
                    value={form.spaceInterest}
                    onChange={handleFormChange}
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-600 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="Studio">Studio</option>
                    <option value="Office">Office</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Event Space">Event Space</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                    Move-in timeframe
                  </label>
                  <select
                    name="moveIn"
                    value={form.moveIn}
                    onChange={handleFormChange}
                    className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-600 transition-colors"
                  >
                    <option value="">Select one</option>
                    <option value="ASAP">ASAP</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="1–3 months">1–3 months</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-400 font-display font-bold uppercase tracking-widest">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Tell us about your business and what you're looking for..."
                  className="bg-input border border-white/10 rounded-sm px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="btn-orange inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-sm"
                >
                  <Navigation size={14} /> Send Inquiry
                </button>
                <span className="text-xs text-zinc-500">
                  Opens your email app. No account needed.
                </span>
              </div>
            </form>

            {/* Contact info + map */}
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-white/10 rounded-lg overflow-hidden">
                {/* Direct Email */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-bold mb-0.5">
                      Direct Email
                    </div>
                    <div className="text-white text-sm font-medium flex items-center">
                      andres@canalcreative.net
                      <CopyButton text="andres@canalcreative.net" />
                    </div>
                  </div>
                </div>

                {/* General inquiries */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-bold mb-0.5">
                      General Inquiries
                    </div>
                    <div className="text-white text-sm font-medium flex items-center">
                      info@canalcreative.net
                      <CopyButton text="info@canalcreative.net" />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-bold mb-0.5">
                      Call or Text
                    </div>
                    <a
                      href="tel:+14847941508"
                      className="text-white text-sm font-medium hover:text-orange-400 transition-colors"
                    >
                      (484) 794-1508
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-bold mb-0.5">
                      Visit
                    </div>
                    <div className="text-white text-sm font-medium">
                      531 Canal Street
                      <br />
                      Reading, PA 19602
                    </div>
                    <a
                      href="https://maps.google.com/?q=531+Canal+Street+Reading+PA+19602"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 text-xs flex items-center gap-1 mt-1 hover:text-orange-300 transition-colors"
                    >
                      <Navigation size={11} /> Get directions
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <Instagram size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href="https://instagram.com/canalcreative"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium hover:text-orange-400 transition-colors"
                    >
                      @canalcreative
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="rounded-lg overflow-hidden border border-white/10 h-52">
                <iframe
                  title="Canal Creative Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.2!2d-75.9216!3d40.3357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c43a4b7d4e3b5f%3A0x1234567890abcdef!2s531+Canal+St%2C+Reading%2C+PA+19602!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-20 bg-[oklch(0.11_0.005_60)]">
        <div className="container">
          <div className="pill-tag mb-5">Gallery</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Event Space
            <br />
            <span className="text-orange-500">Banquet Hall</span>
          </h2>
          <p className="text-zinc-400 mb-10 max-w-xl">
            A flexible, industrial-chic venue inside Canal Creative — available for
            events, pop-ups, markets, shoots, and private gatherings.
          </p>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {BANQUET_PHOTOS.map((src, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-md group relative"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Banquet Hall ${i + 1}`}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-display font-bold uppercase tracking-widest bg-black/60 px-3 py-1 rounded-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-orange inline-flex items-center gap-2 px-6 py-3 text-sm rounded-sm"
            >
              Inquire About Event Space <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── LIGHTBOX ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl font-light z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronDown size={24} className="rotate-90" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronDown size={24} className="-rotate-90" />
          </button>
          <img
            src={BANQUET_PHOTOS[lightboxIndex]}
            alt={`Banquet Hall ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-zinc-400 text-sm font-display">
            {lightboxIndex + 1} / {BANQUET_PHOTOS.length}
          </div>
        </div>
      )}

      {/* ─── VENEZUELA EARTHQUAKE RELIEF ─── */}
      <section id="relief" className="relative overflow-hidden bg-[oklch(0.09_0.005_60)] border-t-2 border-orange-600">
        {/* Animated urgency stripe */}
        <div className="bg-orange-600 py-2 overflow-hidden">
          <div className="flex gap-12 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="text-white font-display font-black uppercase text-sm tracking-widest flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-white rounded-full" />
                Venezuela Earthquake Relief · June 24, 2026 · 7.1 &amp; 7.5 Magnitude · Caracas
              </span>
            ))}
          </div>
        </div>

        <div className="container py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-600/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-400 font-display font-bold uppercase text-xs tracking-widest">Active Relief · June 2026</span>
              </div>

              <h2
                className="font-display font-black uppercase text-white leading-none mb-4"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              >
                Venezuela<br />
                <span className="text-orange-500">Needs Us</span><br />
                Right Now
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                On June 24th, back-to-back earthquakes — 7.1 then 7.5 magnitude — struck near Caracas, Venezuela. Buildings collapsed. Families lost everything. Canal Creative is proud to stand with the community and support immediate relief.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { stat: "$10M", label: "Committed in aid" },
                  { stat: "97%", label: "Goes directly to relief" },
                  { stat: "15+", label: "Years of earthquake response" },
                  { stat: "14", label: "Major disasters worldwide" },
                ].map(({ stat, label }) => (
                  <div key={stat} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="font-display font-black text-orange-500 text-2xl">{stat}</div>
                    <div className="text-zinc-400 text-xs uppercase tracking-wide mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <p className="text-zinc-500 text-xs">
                Donations are processed securely by Global Empowerment Mission (GEM) · EIN: 45-3782061 · 501(c)(3) tax-deductible
              </p>
            </div>

            {/* Right — donation card */}
            <div className="bg-[oklch(0.13_0.006_60)] border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🌍</span>
                </div>
                <div>
                  <div className="text-white font-display font-black text-sm uppercase tracking-wide">Global Empowerment Mission</div>
                  <div className="text-zinc-500 text-xs">gem.org · First-in disaster response</div>
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                GEM is deploying immediately — food, water, hygiene kits, and medical supplies to families across Caracas. Every dollar is tracked from arrival to final distribution.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { amount: "$25", impact: "Provides a hygiene kit for one family" },
                  { amount: "$50", impact: "Supplies clean water for a week" },
                  { amount: "$100", impact: "Delivers emergency food for a family" },
                  { amount: "$250", impact: "Funds a full relief kit + shelter materials" },
                ].map(({ amount, impact }) => (
                  <a
                    key={amount}
                    href={`https://give.gem.org/campaign/735778/donate?c_src=VZEarthquake&c_src2=CanalCreative&amount=${amount.replace('$','')}&designation=1905343&utm_source=Canal+Creative&utm_campaign=VZ+Earthquake&utm_medium=Website`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-600/50 rounded-lg px-4 py-3 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-orange-500 text-lg">{amount}</span>
                      <span className="text-zinc-400 text-xs">{impact}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-500 transition-colors" />
                  </a>
                ))}
              </div>

              <a
                href="https://give.gem.org/campaign/735778/donate?c_src=VZEarthquake&c_src2=CanalCreative&designation=1905343&utm_source=Canal+Creative&utm_campaign=VZ+Earthquake&utm_medium=Website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-orange-600 hover:bg-orange-500 text-white font-display font-black uppercase tracking-wider py-4 rounded-xl transition-all duration-200 text-sm active:scale-[0.98]"
              >
                Donate to Venezuela Relief
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center text-zinc-600 text-xs mt-4">
                Opens GEM's secure donation portal · No account needed
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[oklch(0.10_0.005_60)] border-t border-white/10 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-orange-600 flex items-center justify-center font-display font-black text-white text-xs rounded-sm">
              C
            </div>
            <div>
              <div className="font-display font-black text-white text-sm uppercase tracking-wide">
                Canal Creative
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Reading, PA
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href.slice(1))}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Canal Creative · 531 Canal St, Reading PA
          </div>
        </div>
      </footer>
    </div>
  );
}
