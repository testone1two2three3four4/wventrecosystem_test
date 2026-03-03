import { useState, useEffect, useRef } from "react";

const STAGES = [
  {
    id: "idea",
    label: "I Have an Idea",
    icon: "💡",
    color: "#E8A838",
    tagline: "Turn your spark into a plan",
    description: "You've got a concept but need help validating it, finding co-founders, or understanding your market.",
  },
  {
    id: "traction",
    label: "I Have Traction",
    icon: "🚀",
    color: "#D4582A",
    tagline: "Accelerate your momentum",
    description: "You've talked to users, have early validation, and are ready for structured programs or pitch competitions.",
  },
  {
    id: "funding",
    label: "Ready for Funding",
    icon: "💰",
    color: "#2A7D4F",
    tagline: "Connect with capital",
    description: "Your business model is validated and you're seeking pre-seed, seed, or growth-stage investment.",
  },
  {
    id: "resources",
    label: "Looking for Resources",
    icon: "🤝",
    color: "#3B5998",
    tagline: "Tap into the ecosystem",
    description: "You want to connect with mentors, communities, co-working spaces, and fellow founders across WV.",
  },
  {
    id: "technical",
    label: "Need Technical Help",
    icon: "🛠️",
    color: "#7B3FA0",
    tagline: "Build it right",
    description: "You need help with product development, prototyping, engineering talent, or technical strategy.",
  },
  {
    id: "grants",
    label: "Seeking Grants",
    icon: "🏛️",
    color: "#1A6B7A",
    tagline: "Non-dilutive fuel for your mission",
    description: "You're looking for SBIR/STTR grants, state programs, or federal funding that doesn't require giving up equity.",
  },
];

const RESOURCES = [
  // IDEA STAGE
  {
    name: "WVU LaunchLab",
    stage: ["idea"],
    type: "Program",
    location: "Morgantown",
    description: "Free startup support and ideation workshops through WVU's entrepreneurship center. Great first step for student and community founders.",
    url: "#",
    featured: false,
  },
  {
    name: "1863 Ventures",
    stage: ["idea", "traction"],
    type: "Accelerator",
    location: "National (WV eligible)",
    description: "Supports New Majority entrepreneurs with business-building programs, mentorship, and access to capital.",
    url: "#",
    featured: false,
  },
  {
    name: "Startup Weekend WV",
    stage: ["idea"],
    type: "Event",
    location: "Various WV Cities",
    description: "54-hour events where aspiring entrepreneurs pitch ideas, form teams, and launch startups in a single weekend.",
    url: "#",
    featured: false,
  },
  {
    name: "SCORE WV Chapters",
    stage: ["idea", "resources"],
    type: "Mentorship",
    location: "Statewide",
    description: "Free mentoring from experienced business professionals. Workshops on business planning, marketing, and financial projections.",
    url: "#",
    featured: false,
  },
  // TRACTION STAGE
  {
    name: "Vantage Ventures",
    stage: ["traction"],
    type: "Accelerator",
    location: "Wheeling",
    description: "13-week pre-seed accelerator teaching unbiased assumption testing and real user validation. $10K Validation Day prize. Applications open for Fall 2026 — deadline May 7.",
    url: "#",
    featured: true,
  },
  {
    name: "Ascend WV",
    stage: ["traction", "resources"],
    type: "Program",
    location: "Statewide",
    description: "Incentive program attracting remote workers and entrepreneurs to West Virginia with cash incentives and community integration.",
    url: "#",
    featured: false,
  },
  {
    name: "WV Pitch Competition Circuit",
    stage: ["traction"],
    type: "Competition",
    location: "Various",
    description: "Regional and statewide pitch events including Bridging Innovation Week, collegiate competitions, and community showcases.",
    url: "#",
    featured: false,
  },
  {
    name: "WVU Chambers College of Business",
    stage: ["traction", "resources"],
    type: "Academic Partner",
    location: "Morgantown",
    description: "Entrepreneurship programs, student venture competitions, and connections to the broader WV innovation ecosystem.",
    url: "#",
    featured: false,
  },
  // FUNDING STAGE
  {
    name: "WV Jobs Investment Trust",
    stage: ["funding"],
    type: "Investment",
    location: "Charleston",
    description: "State-chartered venture capital fund investing in early-stage WV companies. Focus on tech-enabled businesses with growth potential.",
    url: "#",
    featured: false,
  },
  {
    name: "Mountaineer Capital",
    stage: ["funding"],
    type: "Investment",
    location: "WV-based",
    description: "Angel investment network connecting WV startups with accredited investors who understand the regional market.",
    url: "#",
    featured: false,
  },
  {
    name: "Innova Commercialization Group",
    stage: ["funding", "technical"],
    type: "Commercialization",
    location: "Morgantown",
    description: "Helps turn university research into market-ready products. Licensing support, spin-out creation, and investor connections.",
    url: "#",
    featured: false,
  },
  {
    name: "WV Angel Fund Network",
    stage: ["funding"],
    type: "Investment",
    location: "Statewide",
    description: "Network of angel investors focused on West Virginia startups across sectors including tech, energy, and healthcare.",
    url: "#",
    featured: false,
  },
  // RESOURCES STAGE
  {
    name: "TechConnect WV",
    stage: ["resources", "technical"],
    type: "Community",
    location: "Statewide",
    description: "Technology community connecting founders, developers, and innovators across West Virginia through meetups and online forums.",
    url: "#",
    featured: false,
  },
  {
    name: "Wheeling Heritage Trail Innovation District",
    stage: ["resources"],
    type: "Co-working",
    location: "Wheeling",
    description: "Revitalized innovation district with co-working spaces, event venues, and a growing startup community in downtown Wheeling.",
    url: "#",
    featured: false,
  },
  {
    name: "Robert C. Byrd Institute (RCBI)",
    stage: ["resources", "technical"],
    type: "Technical Assistance",
    location: "Huntington / Charleston",
    description: "Advanced manufacturing and prototyping resources. CNC, 3D printing, laser cutting, and technical training for entrepreneurs.",
    url: "#",
    featured: false,
  },
  {
    name: "WV Small Business Development Center",
    stage: ["resources", "idea"],
    type: "Advisory",
    location: "Statewide (multiple offices)",
    description: "Free business advising, training, and market research support. Help with business plans, financial projections, and strategy.",
    url: "#",
    featured: false,
  },
  // TECHNICAL STAGE
  {
    name: "WVU STEM Talent Pipeline",
    stage: ["technical"],
    type: "Talent",
    location: "Morgantown",
    description: "Connect with computer science, engineering, and data science students and graduates for internships and full-time roles.",
    url: "#",
    featured: false,
  },
  {
    name: "Generation WV Tech Corps",
    stage: ["technical", "resources"],
    type: "Talent",
    location: "Statewide",
    description: "Programs placing young tech professionals in WV companies. Build your technical team with emerging local talent.",
    url: "#",
    featured: false,
  },
  // GRANTS STAGE
  {
    name: "WV SBIR/STTR Assistance",
    stage: ["grants"],
    type: "Grant Support",
    location: "Statewide",
    description: "Technical assistance for applying to federal Small Business Innovation Research and Small Business Technology Transfer grants.",
    url: "#",
    featured: false,
  },
  {
    name: "Appalachian Regional Commission (ARC)",
    stage: ["grants", "resources"],
    type: "Federal Grant",
    location: "Appalachian WV",
    description: "Federal funding for economic development, entrepreneurship ecosystem building, and workforce development in Appalachian communities.",
    url: "#",
    featured: false,
  },
  {
    name: "WV Forward Innovation Grants",
    stage: ["grants"],
    type: "State Grant",
    location: "Statewide",
    description: "State-funded grants supporting technology innovation, small business development, and economic diversification in West Virginia.",
    url: "#",
    featured: false,
  },
  {
    name: "EDA University Center Grants",
    stage: ["grants", "technical"],
    type: "Federal Grant",
    location: "University-affiliated",
    description: "Economic Development Administration grants supporting university-led entrepreneurship and commercialization programs.",
    url: "#",
    featured: false,
  },
];

const RESOURCE_TYPES = [...new Set(RESOURCES.map((r) => r.type))].sort();

// -- Reusable Components --

function MountainSVG() {
  return (
    <svg
      viewBox="0 0 1440 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", display: "block", marginTop: -1 }}
    >
      <path
        d="M0 220L48 198C96 176 192 132 288 121C384 110 480 132 576 143C672 154 768 154 864 143C960 132 1056 110 1152 104.5C1248 99 1344 110 1392 115.5L1440 121V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V220Z"
        fill="#1B1F23"
      />
    </svg>
  );
}

function NavBar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "hero", label: "Home" },
    { id: "pathways", label: "Find Your Path" },
    { id: "directory", label: "Directory" },
    { id: "about", label: "About" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(27,31,35,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        borderBottom: scrolled ? "1px solid rgba(232,168,56,0.15)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
          onClick={() => onNavigate("hero")}
        >
          <span style={{ fontSize: 26 }}>⛰️</span>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 800,
              fontSize: 20,
              color: "#E8A838",
              letterSpacing: "-0.02em",
            }}
          >
            WV Founder Hub
          </span>
        </div>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              style={{
                background: "none",
                border: "none",
                color: activeSection === l.id ? "#E8A838" : "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                padding: "4px 0",
                borderBottom: activeSection === l.id ? "2px solid #E8A838" : "2px solid transparent",
                transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}
            >
              {l.label}
            </button>
          ))}
          <a
            href="#"
            style={{
              background: "linear-gradient(135deg, #E8A838, #D4582A)",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 2px 12px rgba(232,168,56,0.25)",
            }}
          >
            Apply to Vantage →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#E8A838",
            fontSize: 28,
            cursor: "pointer",
            padding: 4,
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(27,31,35,0.98)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
          className="nav-mobile-menu"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                onNavigate(l.id);
                setMobileOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                color: activeSection === l.id ? "#E8A838" : "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                textAlign: "left",
                padding: "8px 0",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function StageCard({ stage, isActive, onClick, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${stage.color}22, ${stage.color}11)`
          : hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: isActive ? `2px solid ${stage.color}` : "2px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "28px 24px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        transform: hovered && !isActive ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isActive
          ? `0 8px 32px ${stage.color}22`
          : hovered
          ? "0 8px 24px rgba(0,0,0,0.3)"
          : "none",
        opacity: 0,
        animation: `fadeSlideUp 0.5s ease ${index * 0.08}s forwards`,
        minWidth: 0,
        flex: "1 1 280px",
        maxWidth: 380,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{stage.icon}</div>
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 18,
          fontWeight: 700,
          color: isActive ? stage.color : "#F0ECE3",
          marginBottom: 6,
          lineHeight: 1.3,
        }}
      >
        {stage.label}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "rgba(240,236,227,0.55)",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {stage.tagline}
      </div>
    </button>
  );
}

function ResourceCard({ resource, index }) {
  const [hovered, setHovered] = useState(false);
  const stageData = STAGES.find((s) => s.id === resource.stage[0]);
  const color = stageData?.color || "#E8A838";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        border: resource.featured
          ? `1px solid ${color}88`
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 28,
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.25)" : "none",
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        animation: `fadeSlideUp 0.4s ease ${index * 0.05}s forwards`,
      }}
    >
      {resource.featured && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ★ Featured
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 14,
        }}
      >
        {resource.stage.map((s) => {
          const sd = STAGES.find((st) => st.id === s);
          return (
            <span
              key={s}
              style={{
                background: `${sd?.color || "#666"}22`,
                color: sd?.color || "#aaa",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              {sd?.icon} {sd?.label}
            </span>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#F0ECE3",
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        {resource.name}
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(240,236,227,0.45)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          📍 {resource.location}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "rgba(240,236,227,0.45)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          🏷️ {resource.type}
        </span>
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "rgba(240,236,227,0.65)",
          lineHeight: 1.65,
          margin: 0,
          marginBottom: 16,
        }}
      >
        {resource.description}
      </p>

      <a
        href={resource.url}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 600,
          color: color,
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
          transition: "gap 0.2s",
        }}
      >
        Learn more <span style={{ transition: "transform 0.2s" }}>→</span>
      </a>
    </div>
  );
}

// -- Main App --

export default function WVFounderHub() {
  const [activeStage, setActiveStage] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef({});

  const filteredResources = RESOURCES.filter((r) => {
    const matchesStage = !activeStage || r.stage.includes(activeStage);
    const matchesType = !typeFilter || r.type === typeFilter;
    const matchesSearch =
      !searchQuery ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesType && matchesSearch;
  });

  const activeStageData = STAGES.find((s) => s.id === activeStage);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#1B1F23",
        minHeight: "100vh",
        color: "#F0ECE3",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        ::selection {
          background: #E8A838;
          color: #1B1F23;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1B1F23; }
        ::-webkit-scrollbar-thumb { background: #E8A83855; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #E8A83888; }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
          .hero-title { font-size: 40px !important; }
          .hero-sub { font-size: 16px !important; }
          .stage-grid { gap: 12px !important; }
          .resource-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 769px) {
          .nav-mobile-toggle { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <NavBar activeSection={activeSection} onNavigate={scrollTo} />

      {/* ========== HERO ========== */}
      <section
        id="hero"
        ref={(el) => (sectionRefs.current["hero"] = el)}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "120px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background effects */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 50% at 50% 20%, #E8A83812, transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, #D4582A08, transparent)",
            animation: "float 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "8%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, #2A7D4F08, transparent)",
            animation: "float 10s ease-in-out 2s infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(232,168,56,0.1)",
              border: "1px solid rgba(232,168,56,0.2)",
              borderRadius: 30,
              padding: "6px 18px",
              marginBottom: 32,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#E8A838",
              letterSpacing: "0.06em",
              opacity: 0,
              animation: "fadeSlideUp 0.6s ease 0.2s forwards",
            }}
          >
            🏔️ WEST VIRGINIA'S STARTUP ECOSYSTEM
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: "-0.03em",
              opacity: 0,
              animation: "fadeSlideUp 0.7s ease 0.35s forwards",
            }}
          >
            Build Something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8A838, #D4582A, #E8A838)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Bold
            </span>{" "}
            in the Mountain State
          </h1>

          <p
            className="hero-sub"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 19,
              color: "rgba(240,236,227,0.6)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "0 auto 40px",
              opacity: 0,
              animation: "fadeSlideUp 0.7s ease 0.5s forwards",
            }}
          >
            Whether you're sketching your first idea on a napkin or ready to raise
            your first round — West Virginia has the people, programs, and capital
            to help you launch.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeSlideUp 0.7s ease 0.65s forwards",
            }}
          >
            <button
              onClick={() => scrollTo("pathways")}
              style={{
                background: "linear-gradient(135deg, #E8A838, #D4582A)",
                color: "#fff",
                border: "none",
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 24px rgba(232,168,56,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,168,56,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(232,168,56,0.3)";
              }}
            >
              Find Your Path →
            </button>
            <button
              onClick={() => scrollTo("directory")}
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#F0ECE3",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.02em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
            >
              Browse All Resources
            </button>
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 64,
              flexWrap: "wrap",
              opacity: 0,
              animation: "fadeSlideUp 0.7s ease 0.85s forwards",
            }}
          >
            {[
              { num: "20+", label: "Programs & Resources" },
              { num: "6", label: "Founder Stages Covered" },
              { num: "100%", label: "Mountain State Proud" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#E8A838",
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,236,227,0.4)",
                    fontWeight: 500,
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MountainSVG />

      {/* ========== PATHWAYS ========== */}
      <section
        id="pathways"
        ref={(el) => (sectionRefs.current["pathways"] = el)}
        style={{
          padding: "80px 24px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#E8A838",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Where Are You?
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 42,
              fontWeight: 800,
              marginTop: 12,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Choose Your Stage
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(240,236,227,0.5)",
              maxWidth: 520,
              margin: "16px auto 0",
              lineHeight: 1.6,
            }}
          >
            Every founder's journey is different. Select where you are right now,
            and we'll show you exactly where to go next.
          </p>
        </div>

        <div
          className="stage-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          {STAGES.map((stage, i) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={i}
              isActive={activeStage === stage.id}
              onClick={() => {
                setActiveStage(activeStage === stage.id ? null : stage.id);
                setTypeFilter(null);
                setTimeout(() => scrollTo("directory"), 200);
              }}
            />
          ))}
        </div>

        {activeStageData && (
          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              padding: "32px 24px",
              background: `linear-gradient(135deg, ${activeStageData.color}11, transparent)`,
              borderRadius: 20,
              border: `1px solid ${activeStageData.color}22`,
              opacity: 0,
              animation: "fadeSlideUp 0.4s ease forwards",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                color: activeStageData.color,
                marginBottom: 8,
              }}
            >
              {activeStageData.icon} {activeStageData.label}
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "rgba(240,236,227,0.6)",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {activeStageData.description}
            </p>
            <div
              style={{
                marginTop: 16,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: activeStageData.color,
              }}
            >
              {filteredResources.length} resource{filteredResources.length !== 1 && "s"} available ↓
            </div>
          </div>
        )}
      </section>

      {/* ========== DIRECTORY ========== */}
      <section
        id="directory"
        ref={(el) => (sectionRefs.current["directory"] = el)}
        style={{
          padding: "60px 24px 100px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#E8A838",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Resource Directory
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              fontWeight: 800,
              marginTop: 12,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {activeStage
              ? `Resources for "${activeStageData?.label}"`
              : "All Resources"}
          </h2>
        </div>

        {/* Search + Filters */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 32,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 400 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                opacity: 0.4,
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search programs, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px 12px 40px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: "#F0ECE3",
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(232,168,56,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => setTypeFilter(null)}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                border: !typeFilter ? "1px solid #E8A838" : "1px solid rgba(255,255,255,0.1)",
                background: !typeFilter ? "rgba(232,168,56,0.12)" : "rgba(255,255,255,0.03)",
                color: !typeFilter ? "#E8A838" : "rgba(240,236,227,0.5)",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
            >
              All Types
            </button>
            {RESOURCE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border:
                    typeFilter === type
                      ? "1px solid #E8A838"
                      : "1px solid rgba(255,255,255,0.1)",
                  background:
                    typeFilter === type
                      ? "rgba(232,168,56,0.12)"
                      : "rgba(255,255,255,0.03)",
                  color:
                    typeFilter === type ? "#E8A838" : "rgba(240,236,227,0.5)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                  letterSpacing: "0.02em",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {activeStage && (
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <button
              onClick={() => {
                setActiveStage(null);
                setTypeFilter(null);
              }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(240,236,227,0.45)",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              ✕ Clear stage filter — show all resources
            </button>
          </div>
        )}

        {filteredResources.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 24px",
              opacity: 0,
              animation: "fadeIn 0.4s ease forwards",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔭</div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              No matches found
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "rgba(240,236,227,0.5)",
              }}
            >
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <div
            className="resource-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 20,
            }}
          >
            {filteredResources
              .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
              .map((r, i) => (
                <ResourceCard key={r.name} resource={r} index={i} />
              ))}
          </div>
        )}
      </section>

      {/* ========== VANTAGE CTA ========== */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(212,88,42,0.08), rgba(232,168,56,0.08))",
            border: "1px solid rgba(232,168,56,0.15)",
            borderRadius: 24,
            padding: "56px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,168,56,0.08), transparent)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#D4582A",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Applications Open
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              fontWeight: 800,
              marginTop: 12,
              marginBottom: 16,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Vantage Ventures — Fall 2026 Cohort
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "rgba(240,236,227,0.6)",
              maxWidth: 540,
              margin: "0 auto 8px",
              lineHeight: 1.65,
            }}
          >
            13 weeks of real user validation, not pitch theater. Learn unbiased
            assumption testing. Compete for our $10,000 Validation Day prize.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#E8A838",
              marginBottom: 28,
            }}
          >
            Application deadline: May 7, 2026
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #E8A838, #D4582A)",
              color: "#fff",
              padding: "14px 36px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 24px rgba(232,168,56,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Apply Now →
          </a>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current["about"] = el)}
        style={{
          padding: "60px 24px 100px",
          maxWidth: 800,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#E8A838",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          About This Project
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32,
            fontWeight: 800,
            marginTop: 12,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          Built for WV Founders, by WV Founders
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "rgba(240,236,227,0.55)",
            lineHeight: 1.75,
            maxWidth: 600,
            margin: "0 auto 32px",
          }}
        >
          The Mountain State's entrepreneurship ecosystem is growing fast — but
          navigating it shouldn't require a map and a compass. This directory
          connects aspiring founders with the right programs, funding sources,
          and communities at every stage of their journey.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(240,236,227,0.35)",
            lineHeight: 1.6,
          }}
        >
          A project of{" "}
          <span style={{ color: "#E8A838", fontWeight: 600 }}>Vantage Ventures</span>{" "}
          · Wheeling, WV
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "rgba(240,236,227,0.3)",
          }}
        >
          © 2026 WV Founder Hub · Powered by Vantage Ventures · Wheeling, West Virginia
        </p>
      </footer>
    </div>
  );
}
