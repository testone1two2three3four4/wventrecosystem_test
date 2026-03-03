import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   DATA: STAGES
   ═══════════════════════════════════════════════ */
const STAGES = [
  {
    id: "idea",
    label: "I Have an Idea",
    icon: "💡",
    color: "#D4882B",
    tagline: "Turn your spark into a plan",
    description:
      "You have a concept but need help validating it, finding co-founders, or understanding your market.",
  },
  {
    id: "traction",
    label: "I Have Traction",
    icon: "🚀",
    color: "#C04A2B",
    tagline: "Accelerate your momentum",
    description:
      "You have talked to users, have early validation, and are ready for structured programs or pitch competitions.",
  },
  {
    id: "funding",
    label: "Ready for Funding",
    icon: "💰",
    color: "#1F7A4D",
    tagline: "Connect with capital",
    description:
      "Your business model is validated and you are seeking pre-seed, seed, or growth-stage investment.",
  },
  {
    id: "resources",
    label: "Looking for Resources",
    icon: "🤝",
    color: "#2D5AA0",
    tagline: "Tap into the ecosystem",
    description:
      "You want to connect with mentors, communities, co-working spaces, and fellow founders across WV.",
  },
  {
    id: "technical",
    label: "Need Technical Help",
    icon: "🛠️",
    color: "#6B3FA0",
    tagline: "Build it right",
    description:
      "You need product development support, technical expertise, or specialized consulting to bring your idea to life.",
  },
  {
    id: "grants",
    label: "Seeking Grants",
    icon: "📋",
    color: "#0E6B7A",
    tagline: "Non-dilutive capital awaits",
    description:
      "You are looking for grants, non-dilutive funding, and government programs to support your venture.",
  },
];

/* ═══════════════════════════════════════════════
   DATA: RESOURCES (with real URLs)
   ═══════════════════════════════════════════════ */
const RESOURCES = [
  // IDEA STAGE
  {
    name: "WV Small Business Development Center",
    org: "WV SBDC",
    description:
      "Free one-on-one business coaching, workshops, and training to help you move from concept to launch. Statewide network with offices across WV.",
    url: "https://wvsbdc.com/",
    stages: ["idea", "technical"],
    type: "Coaching",
  },
  {
    name: "SCORE West Virginia",
    org: "SBA / SCORE",
    description:
      "Free confidential mentoring from experienced business professionals. Get matched with a volunteer mentor who has real-world expertise in your industry.",
    url: "https://www.score.org/wv",
    stages: ["idea", "resources"],
    type: "Mentorship",
  },
  {
    name: "WV BusinessLink",
    org: "WV SBDC",
    description:
      "Statewide platform connecting entrepreneurs with 170+ resource partners. Find training events, funding info, and connections tailored to your stage.",
    url: "https://wvbusinesslink.com/",
    stages: ["idea", "resources"],
    type: "Platform",
  },
  {
    name: "WV Hive Network",
    org: "NRGRDA",
    description:
      "Entrepreneur hub in Southern WV offering business advising, makerspace access, co-working, and training across a 13-county region. Based in Beckley.",
    url: "https://wvhive.com/",
    stages: ["idea", "resources", "technical"],
    type: "Incubator",
  },
  // TRACTION STAGE
  {
    name: "Vantage Ventures Accelerator",
    org: "WVU Chambers College",
    description:
      "13-week pre-seed accelerator based in West Virginia. Teaches founders how to test assumptions with real users. Up to $10K in technical assistance, plus up to $100K seed funding for top performers.",
    url: "https://business.wvu.edu/research-outreach/vantage-ventures/accelerator-program",
    stages: ["traction", "funding"],
    type: "Accelerator",
    featured: true,
  },
  {
    name: "TechConnect West Virginia",
    org: "TechConnect WV",
    description:
      "Statewide nonprofit advancing tech entrepreneurship. Offers Tech Fellows programs, CatalyzeWV venture events, one-on-one startup support, and connections to funding.",
    url: "https://techconnectwv.org/",
    stages: ["traction", "technical", "resources"],
    type: "Ecosystem",
  },
  {
    name: "Bridging Innovation Week",
    org: "WV Entrepreneurship Ecosystem",
    description:
      "The state's premier annual entrepreneurship event. Features pitch competitions, workshops, networking, and the Vantage Ventures Validation Day with a $10K prize.",
    url: "https://wvbusinesslink.com/",
    stages: ["traction", "resources"],
    type: "Event",
  },
  {
    name: "Pitch Southern West Virginia",
    org: "WV Hive / NRGRDA",
    description:
      "Business idea competition run by the WV Hive. Present your strategy to judges and compete for prizes and recognition in the Southern WV region.",
    url: "https://wvhive.com/",
    stages: ["traction"],
    type: "Competition",
  },
  // FUNDING STAGE
  {
    name: "Vantage Ventures Seed Fund",
    org: "WVU Foundation",
    description:
      "Investments up to $100K via SAFE agreements for accelerator graduates. Designed to stimulate early-stage deal flow and prepare WV founders for venture capital.",
    url: "https://business.wvu.edu/research-outreach/vantage-ventures/seed-investment-fund",
    stages: ["funding"],
    type: "Seed Fund",
  },
  {
    name: "WV Jobs Investment Trust",
    org: "State of WV",
    description:
      "West Virginia's public venture capital fund since 1992. Invests in early, growth, and mature-stage companies creating jobs in the state. Sector-agnostic.",
    url: "https://wvjit.wv.gov/",
    stages: ["funding"],
    type: "Venture Capital",
  },
  {
    name: "Country Roads Angel Network",
    org: "NRGRDA / WV Hive",
    description:
      "Statewide angel investment network connecting accredited investors with WV-based startups. Provides both capital and mentorship from experienced investors.",
    url: "https://wvcran.com/",
    stages: ["funding"],
    type: "Angel Network",
  },
  {
    name: "WV Capital Access Program (WVCAP)",
    org: "WVJIT",
    description:
      "Debt and equity capital for creditworthy WV small businesses that may not fit traditional lending models. Administered by the Jobs Investment Trust.",
    url: "https://wvjit.wv.gov/wvcap/",
    stages: ["funding"],
    type: "Capital Program",
  },
  // RESOURCES STAGE
  {
    name: "Ascend WV",
    org: "Brad & Alys Smith Foundation",
    description:
      "Remote worker incentive program offering $12K to relocate to WV plus free outdoor recreation, co-working space, and community programming.",
    url: "https://ascendwv.com/",
    stages: ["resources"],
    type: "Relocation",
  },
  {
    name: "SBA West Virginia District Office",
    org: "U.S. Small Business Administration",
    description:
      "Federal resource for WV businesses. Offers SBA loan programs (7a, 504, Microloans), counseling, federal contracting support, and certifications.",
    url: "https://www.sba.gov/district/west-virginia",
    stages: ["resources", "funding", "grants"],
    type: "Federal",
  },
  {
    name: "WV Women's Business Center",
    org: "WV Women",
    description:
      "Dedicated support for women entrepreneurs in West Virginia. Business coaching, workshops, and networking tailored to women-owned businesses.",
    url: "https://wvsbdc.com/",
    stages: ["resources"],
    type: "Community",
  },
  // TECHNICAL STAGE
  {
    name: "INNOVA Commercialization Group",
    org: "WVHTC Foundation",
    description:
      "Statewide commercialization support for innovators. Provides professional and technical assistance plus early-stage investment capital to bring new products to market.",
    url: "https://techconnectwv.org/",
    stages: ["technical", "funding"],
    type: "Commercialization",
  },
  {
    name: "Vantage Ventures External Partners",
    org: "WVU Chambers College",
    description:
      "Technical assistance vendor network. Access paid experts in product development, AI, startup legal, and accounting through the EDA-funded program.",
    url: "https://business.wvu.edu/research-outreach/vantage-ventures/external-partner-application",
    stages: ["technical"],
    type: "Vendor Network",
  },
  {
    name: "WV SBDC Innovation-Technology Program",
    org: "WV SBDC",
    description:
      "Specialized coaching track focused on technology commercialization and innovation. Helps businesses navigate bringing new tech products and services to market.",
    url: "https://wvsbdc.com/services/",
    stages: ["technical", "idea"],
    type: "Coaching",
  },
  // GRANTS STAGE
  {
    name: "EDA Technical Assistance Funding",
    org: "U.S. EDA / Vantage Ventures",
    description:
      "Up to $10,000 in non-dilutive technical assistance funding for startups accepted into the Vantage Ventures accelerator program. Federal grant-backed.",
    url: "https://business.wvu.edu/research-outreach/vantage-ventures/accelerator-program",
    stages: ["grants", "traction"],
    type: "Grant",
  },
  {
    name: "WV State Trade Expansion Program (STEP)",
    org: "WV Dept. of Economic Development",
    description:
      "Reimbursement of up to 75% of eligible export expenses, max $15K. For established WV businesses looking to expand into global markets.",
    url: "https://westvirginia.gov/wvstep/",
    stages: ["grants"],
    type: "Grant",
  },
  {
    name: "WV Dept. of Economic Development",
    org: "State of WV",
    description:
      "State-level support for business growth. Tax credits, incentive programs, site selection assistance, and connections to workforce development resources.",
    url: "https://westvirginia.gov/divisions/small-business-development-center/",
    stages: ["grants", "resources"],
    type: "State Program",
  },
  {
    name: "FASTER WV Program",
    org: "BridgeValley CTC",
    description:
      "Comprehensive business coaching connecting entrepreneurs with experienced mentors. Has supported the creation of 50+ businesses and 150 jobs statewide.",
    url: "https://wvsbdc.com/",
    stages: ["grants", "idea"],
    type: "Program",
  },
];

/* ═══════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════ */
const BG = "#0C0F14";
const SURFACE = "#14181F";
const SURFACE2 = "#1A1F28";
const BORDER = "#252B36";
const TEXT = "#E8ECF1";
const TEXT_MID = "#9BA3B2";
const TEXT_DIM = "#5F6878";
const ACCENT = "#EAAA00";
const ACCENT_DIM = "rgba(234,170,0,0.12)";

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

function ResourceCard({ resource, stageColor }) {
  const [hovered, setHovered] = useState(false);
  const matchedStages = STAGES.filter((s) => resource.stages.includes(s.id));

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: hovered ? SURFACE2 : SURFACE,
        border: `1px solid ${hovered ? stageColor || ACCENT : BORDER}`,
        borderRadius: 12,
        padding: "24px 24px 20px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${stageColor || ACCENT}30`
          : "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {resource.featured && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: -28,
            background: ACCENT,
            color: BG,
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 32px",
            transform: "rotate(45deg)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Featured
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: stageColor || ACCENT,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {resource.type}
          </div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: TEXT,
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {resource.name}
          </h3>
        </div>
        <div
          style={{
            fontSize: 18,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.2s",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          ↗
        </div>
      </div>

      <div
        style={{
          fontSize: 11,
          color: TEXT_MID,
          marginBottom: 10,
          fontWeight: 500,
        }}
      >
        {resource.org}
      </div>

      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: TEXT_MID,
          margin: "0 0 16px",
        }}
      >
        {resource.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {matchedStages.map((s) => (
          <span
            key={s.id}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              color: s.color,
              background: `${s.color}18`,
              border: `1px solid ${s.color}30`,
              padding: "3px 8px",
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            {s.icon} {s.label}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${BORDER}`,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: hovered ? ACCENT : TEXT_DIM,
          transition: "color 0.2s",
        }}
      >
        Visit Website →
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
export default function WVEntrepreneurHub() {
  const [activeStage, setActiveStage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const resourcesRef = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const h = () => {
      const curr = window.scrollY;
      setHeaderVisible(curr < 60 || curr < lastScroll.current);
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filteredResources = RESOURCES.filter((r) => {
    const matchesStage = !activeStage || r.stages.includes(activeStage);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.org.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q);
    return matchesStage && matchesSearch;
  });

  const scrollToResources = useCallback(() => {
    resourcesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleStageClick = useCallback(
    (stageId) => {
      setActiveStage((prev) => (prev === stageId ? null : stageId));
      setTimeout(() => scrollToResources(), 100);
    },
    [scrollToResources]
  );

  const activeStageData = STAGES.find((s) => s.id === activeStage);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: BG,
        color: TEXT,
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${ACCENT}40; color: ${TEXT}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      `}</style>

      {/* ─── STICKY HEADER ─── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `${BG}ee`,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 24px",
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>⛰️</span>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 16,
                color: TEXT,
                letterSpacing: "-0.01em",
              }}
            >
              WV Founder Hub
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="https://business.wvu.edu/research-outreach/vantage-ventures/accelerator-program"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: BG,
                background: ACCENT,
                padding: "7px 16px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              Apply to Vantage Ventures
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 80,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient bg */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            background: `radial-gradient(ellipse at center, ${ACCENT}08 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            animation: "fadeUp 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: ACCENT_DIM,
              border: `1px solid ${ACCENT}30`,
              borderRadius: 100,
              padding: "6px 16px",
              fontSize: 12,
              fontWeight: 600,
              color: ACCENT,
              marginBottom: 28,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ animation: "pulse 2s ease infinite" }}>●</span>
            Built by Vantage Ventures
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: TEXT,
              marginBottom: 20,
              letterSpacing: "-0.02em",
            }}
          >
            West Virginia
            <br />
            <span style={{ color: ACCENT }}>Entrepreneur Navigator</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.7,
              color: TEXT_MID,
              maxWidth: 560,
              margin: "0 auto 36px",
            }}
          >
            Every resource, program, and funding opportunity for founders in
            West Virginia. Find your path from idea to funded startup.
          </p>
        </div>
      </section>

      {/* ─── STAGE SELECTOR ─── */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 48px" }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 8,
            color: TEXT,
            textAlign: "center",
          }}
        >
          Where are you on your journey?
        </h2>
        <p
          style={{
            fontSize: 14,
            color: TEXT_DIM,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Select a stage to filter resources, or browse everything below.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {STAGES.map((stage, i) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => handleStageClick(stage.id)}
                style={{
                  background: isActive ? `${stage.color}20` : SURFACE,
                  border: `1.5px solid ${isActive ? stage.color : BORDER}`,
                  borderRadius: 12,
                  padding: "18px 16px 14px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.25s ease",
                  animation: `fadeUp 0.4s ease ${i * 0.06}s both`,
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive
                    ? `0 4px 20px ${stage.color}25`
                    : "none",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{stage.icon}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isActive ? stage.color : TEXT,
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {stage.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: isActive ? stage.color : TEXT_DIM,
                    fontStyle: "italic",
                    opacity: isActive ? 0.9 : 0.7,
                  }}
                >
                  {stage.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {activeStage && (
          <button
            onClick={() => setActiveStage(null)}
            style={{
              display: "block",
              margin: "0 auto",
              background: "transparent",
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              padding: "8px 20px",
              color: TEXT_MID,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ✕ Clear Filter — Show All Resources
          </button>
        )}
      </section>

      {/* ─── ACTIVE STAGE BANNER ─── */}
      {activeStageData && (
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto 24px",
            padding: "0 24px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              background: `${activeStageData.color}12`,
              border: `1px solid ${activeStageData.color}30`,
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 36 }}>{activeStageData.icon}</span>
            <div>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: activeStageData.color,
                  marginBottom: 4,
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {activeStageData.label}
              </h3>
              <p style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.5 }}>
                {activeStageData.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── SEARCH & RESOURCE GRID ─── */}
      <section
        ref={resourcesRef}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                color: TEXT,
              }}
            >
              {activeStageData
                ? `Resources for "${activeStageData.label}"`
                : "All Resources"}
            </h2>
            <p style={{ fontSize: 13, color: TEXT_DIM, marginTop: 4 }}>
              {filteredResources.length} resource
              {filteredResources.length !== 1 ? "s" : ""} found
              {searchQuery ? ` matching "${searchQuery}"` : ""}
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: "10px 16px 10px 38px",
                color: TEXT,
                fontSize: 14,
                width: 260,
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = ACCENT)
              }
              onBlur={(e) =>
                (e.target.style.borderColor = BORDER)
              }
            />
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                opacity: 0.4,
              }}
            >
              🔍
            </span>
          </div>
        </div>

        {filteredResources.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {filteredResources.map((r, i) => (
              <div
                key={r.name}
                style={{ animation: `fadeUp 0.4s ease ${i * 0.04}s both` }}
              >
                <ResourceCard
                  resource={r}
                  stageColor={activeStageData?.color || null}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              color: TEXT_DIM,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              No resources match your search
            </p>
            <p style={{ fontSize: 14 }}>
              Try a different keyword or clear your filters.
            </p>
          </div>
        )}
      </section>

      {/* ─── CTA SECTION ─── */}
      <section
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              color: TEXT,
              marginBottom: 12,
            }}
          >
            Ready to start building?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: TEXT_MID,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            Vantage Ventures is accepting applications for the Fall 2026 cohort.
            Our 13-week accelerator helps WV founders test assumptions, talk to
            real users, and position themselves for investment.
          </p>
          <a
            href="https://business.wvu.edu/research-outreach/vantage-ventures/accelerator-program"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: ACCENT,
              color: BG,
              fontSize: 15,
              fontWeight: 700,
              padding: "14px 32px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: `0 4px 20px ${ACCENT}30`,
            }}
          >
            Apply Now — Deadline May 7
          </a>
          <p
            style={{
              fontSize: 12,
              color: TEXT_DIM,
              marginTop: 16,
            }}
          >
            Questions? Email{" "}
            <a
              href="mailto:Vantage@mail.wvu.edu"
              style={{ color: ACCENT, textDecoration: "none" }}
            >
              Vantage@mail.wvu.edu
            </a>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          borderTop: `1px solid ${BORDER}`,
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.8 }}>
          Built by{" "}
          <a
            href="https://business.wvu.edu/research-outreach/vantage-ventures"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: ACCENT, textDecoration: "none" }}
          >
            Vantage Ventures
          </a>{" "}
          · WVU John Chambers College of Business and Economics
          <br />
          Part of the West Virginia Entrepreneurship Ecosystem
        </p>
      </footer>
    </div>
  );
}
