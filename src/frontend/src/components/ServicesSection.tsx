import { useEffect, useRef, useState } from "react";
import type { Page } from "./PublicPages";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const SERVICES = [
  {
    emoji: "✈",
    title: "Global Flights",
    desc: "Compare fares from hundreds of airlines and book instantly with transparent B2B pricing.",
    page: "flights" as Page,
    color: "#2563EB",
  },
  {
    emoji: "🏨",
    title: "Worldwide Hotels",
    desc: "1M+ properties with exclusive B2B rates, real-time pricing, and instant confirmation.",
    page: "hotels" as Page,
    color: "#F97316",
  },
  {
    emoji: "🌍",
    title: "Holiday Packages",
    desc: "Ready-to-sell domestic and international packages with attractive agent margins.",
    page: "packages" as Page,
    color: "#10B981",
  },
  {
    emoji: "🛂",
    title: "Visa Services",
    desc: "eVisa and sticker visa for 190+ countries with OCR passport scan and status tracking.",
    page: "visa" as Page,
    color: "#8B5CF6",
  },
  {
    emoji: "🚕",
    title: "Airport Transfers",
    desc: "City, airport, and hotel transfers with real-time availability and instant booking.",
    page: "transfers" as Page,
    color: "#F59E0B",
  },
  {
    emoji: "🚢",
    title: "Cruises",
    desc: "Premium cruise inventory with cabin class selection and real-time pricing worldwide.",
    page: "cruises" as Page,
    color: "#06B6D4",
  },
  {
    emoji: "🏔",
    title: "Tour Activities",
    desc: "Curated tours, safaris, theme parks, and experiences across global destinations.",
    page: "tours" as Page,
    color: "#EF4444",
  },
  {
    emoji: "🚆",
    title: "Rail Bookings",
    desc: "Indian Railways with PNR status, berth selection, quota, and tatkal booking.",
    page: "railway" as Page,
    color: "#14B8A6",
  },
];

const NETWORK_CARDS = [
  {
    emoji: "👤",
    title: "Travel Agents",
    desc: "Access global travel inventory and earn higher margins with our powerful booking platform designed for professionals.",
    cta: "Register as Agent",
    page: "register" as Page,
    gradient:
      "linear-gradient(135deg, rgba(37,99,235,0.8), rgba(30,58,138,0.9))",
    border: "rgba(37,99,235,0.4)",
    btnColor: "#2563EB",
  },
  {
    emoji: "🔗",
    title: "Distributors",
    desc: "Expand your network and manage sub-agents with advanced distribution tools and real-time reporting.",
    cta: "Join as Distributor",
    page: "register" as Page,
    gradient:
      "linear-gradient(135deg, rgba(249,115,22,0.7), rgba(234,88,12,0.8))",
    border: "rgba(249,115,22,0.4)",
    btnColor: "#F97316",
  },
  {
    emoji: "🏢",
    title: "Suppliers",
    desc: "Connect your hotels, tours, and travel services with a growing global network of travel partners.",
    cta: "Become a Supplier",
    page: "register" as Page,
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.7), rgba(5,150,105,0.8))",
    border: "rgba(16,185,129,0.4)",
    btnColor: "#10B981",
  },
];

export function NewServicesSection({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const { ref: servicesRef, visible: servicesVisible } = useScrollReveal();
  const { ref: networkRef, visible: networkVisible } = useScrollReveal();

  return (
    <>
      {/* ── Part A: Travel Services Grid ── */}
      <section
        className="py-24"
        style={{ background: "#F8FAFC" }}
        ref={servicesRef}
      >
        <div className="container">
          <div className="text-center mb-14">
            <div
              className="inline-block mb-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(37,99,235,0.12))",
                border: "1px solid rgba(249,115,22,0.25)",
                borderRadius: "100px",
                padding: "6px 16px",
              }}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#F97316", fontFamily: "'Sora', sans-serif" }}
              >
                Our Services
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: "#0F172A", fontFamily: "'Sora', sans-serif" }}
            >
              Everything You Need to{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Grow Your Travel Business
              </span>
            </h2>
            <div
              className="mx-auto rounded-full"
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #F97316, #FDBA74)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={i}
                visible={servicesVisible}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Part B: Join Our Network ── */}
      <section
        className="py-24"
        ref={networkRef}
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Built for Every{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F97316, #FDBA74)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Travel Business
              </span>
            </h2>
            <p
              className="text-white/60 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Whether you're an agent, distributor, or supplier — our platform
              is built to power your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NETWORK_CARDS.map((card, i) => (
              <NetworkCard
                key={card.title}
                card={card}
                index={i}
                visible={networkVisible}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  service,
  index,
  visible,
  onNavigate,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  visible: boolean;
  onNavigate: (page: Page) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const transform = !visible
    ? "translateY(20px)"
    : hovered
      ? "translateY(-8px) scale(1.02)"
      : "translateY(0) scale(1)";

  return (
    <button
      type="button"
      onClick={() => onNavigate(service.page)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left w-full rounded-2xl p-6 cursor-pointer"
      style={{
        background: "#ffffff",
        border: hovered ? `2px solid ${service.color}` : "2px solid #E5E7EB",
        transform,
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.12), 0 8px 20px ${service.color}22`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 60}ms`,
      }}
      data-ocid={`services.item.${index + 1}`}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: hovered ? service.color : `${service.color}18`,
          transition: "background 0.3s ease",
        }}
      >
        <span className="text-2xl">{service.emoji}</span>
      </div>
      <h3
        className="font-bold text-base mb-1"
        style={{
          color: hovered ? service.color : "#0F172A",
          fontFamily: "'Sora', sans-serif",
          transition: "color 0.3s ease",
        }}
      >
        {service.title}
      </h3>
      <p
        className="text-xs leading-relaxed"
        style={{
          color: "#64748B",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {service.desc}
      </p>
    </button>
  );
}

function NetworkCard({
  card,
  index,
  visible,
  onNavigate,
}: {
  card: (typeof NETWORK_CARDS)[number];
  index: number;
  visible: boolean;
  onNavigate: (page: Page) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl p-8 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? card.border : "rgba(255,255,255,0.12)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${card.border}`
          : "0 4px 20px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`network.item.${index + 1}`}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl"
        style={{ background: card.gradient }}
      >
        {card.emoji}
      </div>
      <h3
        className="text-xl font-bold text-white mb-3"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {card.title}
      </h3>
      <p
        className="text-white/65 text-sm leading-relaxed mb-6 flex-1"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {card.desc}
      </p>
      <button
        type="button"
        onClick={() => onNavigate(card.page)}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${card.btnColor}, ${card.btnColor}cc)`
            : "rgba(255,255,255,0.1)",
          border: `1px solid ${hovered ? card.btnColor : "rgba(255,255,255,0.2)"}`,
          boxShadow: hovered ? `0 8px 20px ${card.btnColor}44` : "none",
          transition: "all 0.3s ease",
          fontFamily: "'Sora', sans-serif",
        }}
        data-ocid={`network.item.${index + 1}.primary_button`}
      >
        {card.cta} →
      </button>
    </div>
  );
}

export default NewServicesSection;
