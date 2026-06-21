/**
 * Canal Creative — Single-page marketing site
 * Design: Industrial-chic, dark background (#1e1a17), orange accent (#E8540A / oklch 0.58 0.19 38)
 * Typography: Barlow Condensed (headings, display) + Barlow (body)
 * Layout: Sticky nav, full-bleed hero, scroll sections, mailto contact form
 */

import { useState, useEffect, useRef } from "react";
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

const HERO_IMAGE = "/manus-storage/canal_creative_hero_2e7c7369.jpg";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Spaces", href: "#spaces" },
  { label: "Amenities", href: "#amenities" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
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
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
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
    desc: "Fill out the contact form or email Andres directly. Tell us about your business and what kind of space you need.",
  },
  {
    num: "02",
    title: "Vetting & Tour",
    desc: "Andres personally reviews every inquiry and schedules a walkthrough of available spaces that fit your needs.",
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
    a: "We offer flexible terms. Month-to-month leases are available for most units. Longer-term leases may come with additional benefits — ask Andres during your tour.",
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
    a: "There is no online application portal at this time. Reach out to Andres directly and he will guide you through the process.",
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
  const formRef = useRef<HTMLFormElement>(null);

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

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-0">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Canal Creative interior — historic industrial building with brick walls and studio spaces"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[oklch(0.13_0.005_60)]" />
        </div>

        {/* Hero content */}
        <div className="relative container pb-16 pt-32">
          {/* Pill */}
          <div className="pill-tag mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            Creative Studios · Offices · Workshops
          </div>

          <h1
            className="font-display font-black uppercase text-white leading-none mb-5"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
          >
            Create, Collaborate
            <br />
            &amp; Grow In Your
            <br />
            New Studio
          </h1>

          <p className="text-zinc-200 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
            Canal Creative is a working community of artists, makers, and small
            businesses inside a historic industrial building in Reading, PA. Find
            your space — and the people building alongside you.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
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
            className="inline-flex items-center gap-3 text-sm text-zinc-300 hover:text-white transition-colors border border-white/20 rounded-sm px-4 py-2"
          >
            <MapPin size={14} className="text-orange-500" />
            531 Canal Street, Reading, PA 19602
            <span className="text-orange-400 flex items-center gap-1 ml-1">
              <Navigation size={12} /> Get directions
            </span>
          </a>
        </div>

        {/* Stats bar */}
        <div className="relative bg-[oklch(0.10_0.005_60)] border-t border-white/10">
          <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-5">
                <div className="font-display font-black text-white text-3xl leading-none">
                  {s.value}
                </div>
                <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1 font-display font-bold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              community of people who take their work seriously. The building is
              managed by Andres, who personally vets every new tenant to keep the
              community intentional and collaborative.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SPACES ─── */}
      <section id="spaces" className="py-20 bg-[oklch(0.11_0.005_60)]">
        <div className="container">
          <div className="pill-tag mb-5">Spaces</div>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Find Your Space
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl">
            From compact studios to ground-floor workshops, find a space that
            fits how you work. Availability changes often — reach out to see
            what's open right now.
          </p>

          {/* Tab pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {SPACES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSpace(s.id)}
                className={`px-4 py-2 rounded-full text-sm font-display font-bold uppercase tracking-wide transition-all ${
                  activeSpace === s.id
                    ? "bg-white text-black"
                    : "border border-white/20 text-zinc-300 hover:border-white/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Space card */}
          <div className="bg-card rounded-lg overflow-hidden border border-white/10 flex flex-col md:flex-row">
            <div className="md:w-5/12 relative">
              <img
                src={currentSpace.image}
                alt={currentSpace.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <span
                className={`absolute top-4 left-4 ${currentSpace.tagColor} text-white text-xs font-display font-black uppercase tracking-widest px-3 py-1 rounded-sm`}
              >
                {currentSpace.tag}
              </span>
            </div>
            <div className="md:w-7/12 p-8 flex flex-col justify-center">
              <h3 className="font-display font-black text-white text-4xl uppercase mb-4">
                {currentSpace.title}
              </h3>
              <div className="flex flex-col gap-1 mb-4">
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-display font-bold">
                    Best For
                  </span>
                  <p className="text-zinc-200 text-sm mt-0.5">
                    {currentSpace.bestFor}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-display font-bold">
                    Typical Size
                  </span>
                  <p className="text-zinc-200 text-sm mt-0.5">
                    {currentSpace.size}
                  </p>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {currentSpace.description}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {currentSpace.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={14} className="text-orange-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-orange inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-sm self-start"
              >
                Inquire about {currentSpace.label.toLowerCase()} <ArrowRight size={14} />
              </button>
            </div>
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
            No complicated portals. No waiting rooms. Andres personally handles
            every inquiry and makes the process straightforward.
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
            Tell us a little about you and your business. Andres personally reads
            every inquiry and will follow up to set up a walkthrough.
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
                  Opens your email app addressed to Andres. No account needed.
                </span>
              </div>
            </form>

            {/* Contact info + map */}
            <div className="flex flex-col gap-4">
              <div className="bg-card border border-white/10 rounded-lg overflow-hidden">
                {/* Email Andres */}
                <div className="flex items-center gap-4 px-5 py-4 border-b border-white/10">
                  <div className="w-9 h-9 bg-orange-600/20 rounded-md flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-display font-bold mb-0.5">
                      Email Andres
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
