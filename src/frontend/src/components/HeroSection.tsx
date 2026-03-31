import {
  Briefcase,
  Building2,
  CheckCircle2,
  Globe,
  Globe2,
  Headphones,
  Settings,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Page } from "./PublicPages";

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let current = 0;
    const steps = 60;
    const step = Math.ceil(target / steps);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration, start]);
  return count;
}

const STATS = [
  { icon: Users, label: "Travel Agents", value: 15000, suffix: "+" },
  {
    icon: TrendingUp,
    label: "Bookings Processed",
    value: 2000000,
    suffix: "+",
  },
  { icon: Globe, label: "Countries Covered", value: 190, suffix: "+" },
  { icon: Headphones, label: "Support", value: 0, suffix: "24/7" },
];

const LOGIN_BUTTONS = [
  {
    key: "agent",
    icon: UserCheck,
    label: "Agent Login",
    desc: "For travel agents & agencies",
    gradient: "linear-gradient(135deg, #1E3A8A, #2563EB)",
    glow: "rgba(37,99,235,0.45)",
    border: "rgba(37,99,235,0.5)",
  },
  {
    key: "supplier",
    icon: Building2,
    label: "Supplier Login",
    desc: "For hotels & service providers",
    gradient: "linear-gradient(135deg, #F97316, #FB923C)",
    glow: "rgba(249,115,22,0.45)",
    border: "rgba(249,115,22,0.5)",
  },
  {
    key: "dmc",
    icon: Globe2,
    label: "DMC Login",
    desc: "For destination management",
    gradient: "linear-gradient(135deg, #0F766E, #14B8A6)",
    glow: "rgba(20,184,166,0.45)",
    border: "rgba(20,184,166,0.5)",
  },
  {
    key: "admin",
    icon: Settings,
    label: "Admin Login",
    desc: "Platform administration",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    glow: "rgba(124,58,237,0.45)",
    border: "rgba(124,58,237,0.5)",
  },
  {
    key: "staff",
    icon: Briefcase,
    label: "Staff Login",
    desc: "Operations & booking staff",
    gradient: "linear-gradient(135deg, #064E3B, #059669)",
    glow: "rgba(5,150,105,0.45)",
    border: "rgba(5,150,105,0.5)",
  },
] as const;

const PARTICLES = [
  { size: 10, top: "20%", left: "15%", delay: 0, color: "rgba(37,99,235,0.5)" },
  {
    size: 6,
    top: "65%",
    left: "80%",
    delay: 1.5,
    color: "rgba(249,115,22,0.4)",
  },
  {
    size: 14,
    top: "40%",
    left: "88%",
    delay: 0.8,
    color: "rgba(37,99,235,0.3)",
  },
  {
    size: 8,
    top: "75%",
    left: "12%",
    delay: 2.2,
    color: "rgba(249,115,22,0.3)",
  },
  { size: 12, top: "88%", left: "50%", delay: 1, color: "rgba(30,58,138,0.6)" },
];

function StatCounter({
  stat,
  started,
}: { stat: (typeof STATS)[number]; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started && stat.value > 0);
  const display =
    stat.value === 0
      ? stat.suffix
      : stat.value >= 1000000
        ? `${Math.floor(count / 1000000)}M+`
        : stat.value >= 1000
          ? `${(count / 1000).toFixed(count >= stat.value ? 0 : 1)}K+`
          : `${count}+`;
  return (
    <div className="text-center">
      <p
        className="text-2xl md:text-3xl font-bold"
        style={{
          background: "linear-gradient(135deg, #F97316, #FDBA74)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {display}
      </p>
      <p className="text-white/60 text-xs mt-0.5 uppercase tracking-wide">
        {stat.label}
      </p>
    </div>
  );
}

export function HeroSection({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0F172A" }}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%",
            right: "5%",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(ellipse, rgba(30,58,138,0.8) 0%, rgba(37,99,235,0.4) 40%, transparent 70%)",
            filter: "blur(60px)",
            animation: "blobPulse1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "30%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blobPulse2 15s ease-in-out 2s infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-5%",
            right: "10%",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.45) 0%, rgba(249,115,22,0.15) 40%, transparent 70%)",
            filter: "blur(70px)",
            animation: "blobPulse3 10s ease-in-out 1s infinite",
          }}
        />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Flying airplane */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "-60px",
          animation: "airplaneFly 22s linear 2s infinite",
          zIndex: 2,
        }}
      >
        <div className="relative flex items-center">
          <div
            style={{
              width: "80px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(249,115,22,0.6))",
              borderTop: "2px dashed rgba(249,115,22,0.5)",
              marginRight: "6px",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              filter: "drop-shadow(0 0 10px rgba(249,115,22,0.7))",
            }}
          >
            ✈
          </span>
        </div>
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={`${p.top}-${p.left}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            background: p.color,
            filter: "blur(1px)",
            animation: `floatParticle ${6 + PARTICLES.indexOf(p)}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="container relative z-10 pt-28 pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-medium text-white/80"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#F97316" }} />
              India's #1 B2B Travel Technology Platform
            </div>
          </div>

          {/* Headline */}
          <h1
            className="text-center text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            The Next-Generation <br className="hidden md:block" />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F97316, #FDBA74, #F97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 100%",
                animation: "shimmerText 4s ease-in-out infinite",
              }}
            >
              B2B Travel Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-center text-lg md:text-xl text-white/65 max-w-3xl mx-auto mb-10"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Book flights, hotels, holidays, transfers and visa services from one
            powerful platform built for modern travel agencies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={() => onNavigate("register")}
              className="px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                boxShadow:
                  "0 10px 30px rgba(249,115,22,0.4), 0 4px 12px rgba(249,115,22,0.2)",
                fontFamily: "'Sora', sans-serif",
              }}
              data-ocid="hero.primary_button"
            >
              Create Free Agent Account
            </button>
            <button
              type="button"
              onClick={() => onNavigate("login")}
              className="px-8 py-4 rounded-xl font-bold text-white text-base border transition-all hover:-translate-y-1 hover:bg-white/10"
              style={{
                border: "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
                fontFamily: "'Sora', sans-serif",
              }}
              data-ocid="hero.secondary_button"
            >
              Request Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12">
            {[
              "Trusted by 15,000+ Travel Agents",
              "190+ Countries Covered",
              "24/7 Agent Support",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-sm text-white/70"
              >
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#F97316" }}
                />
                {t}
              </span>
            ))}
          </div>

          {/* Login Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {LOGIN_BUTTONS.map((btn) => {
              const Icon = btn.icon;
              const isHovered = hoveredBtn === btn.key;
              return (
                <button
                  key={btn.key}
                  type="button"
                  onClick={() => {
                    if (btn.key === "supplier") onNavigate("supplier-login");
                    else if (btn.key === "admin") onNavigate("admin-login");
                    else if (btn.key === "dmc") onNavigate("dmc-login");
                    else if (btn.key === "staff") onNavigate("staff-login");
                    else onNavigate("login");
                  }}
                  onMouseEnter={() => setHoveredBtn(btn.key)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="relative flex flex-col items-center gap-3 px-5 py-6 rounded-2xl text-white transition-all duration-300"
                  style={{
                    background: isHovered
                      ? btn.gradient
                      : "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    border: `1px solid ${isHovered ? btn.border : "rgba(255,255,255,0.12)"}`,
                    boxShadow: isHovered
                      ? `0 20px 50px ${btn.glow}, 0 0 0 1px ${btn.border}`
                      : "0 4px 24px rgba(0,0,0,0.3)",
                    transform: isHovered
                      ? "translateY(-6px) scale(1.03)"
                      : "translateY(0) scale(1)",
                    fontFamily: "'Sora', sans-serif",
                  }}
                  data-ocid={`hero.${btn.key}_login.button`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isHovered
                        ? "rgba(255,255,255,0.2)"
                        : btn.gradient,
                      boxShadow: isHovered
                        ? "0 0 20px rgba(255,255,255,0.15)"
                        : `0 4px 16px ${btn.glow}`,
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base text-white">
                      {btn.label}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">{btn.desc}</p>
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl transition-opacity duration-300"
                    style={{
                      background: btn.gradient,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated stats bar */}
      <div
        ref={statsRef}
        className="relative z-10 mt-auto"
        style={{
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                started={statsStarted}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobPulse1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.15) translate(-30px, 20px); }
          66% { transform: scale(0.9) translate(20px, -30px); }
        }
        @keyframes blobPulse2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          40% { transform: scale(1.2) translate(40px, -20px); }
          70% { transform: scale(0.85) translate(-20px, 30px); }
        }
        @keyframes blobPulse3 {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        @keyframes airplaneFly {
          0% { left: -80px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: calc(100vw + 80px); opacity: 0; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.1); }
        }
        @keyframes shimmerText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
