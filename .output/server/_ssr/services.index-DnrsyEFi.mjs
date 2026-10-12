import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { s as supabase, P as PageLayout, S as Section, a as SectionHeading, m as motion, B as BRAND, L as Link, e as PageCTABanner, A as AnimatePresence } from "./router-D3NQCnuk.mjs";
import { I as Icons, C as ClipboardList, U as UserCheck } from "./lucide-react-D02tlVIt.mjs";
import { a as useHomepageSection } from "./use-cms-content-CkL30vlf.mjs";
import { C as CalendarCheck } from "./user-round-BantWQqJ.mjs";
import { C as CircleCheck } from "./circle-check-DNWRcUgB.mjs";
import { A as ArrowRight } from "./arrow-right-C0k9iFax.mjs";
import { H as Heart } from "./heart-DOOWiMCz.mjs";



import "./index-CZVAwXUt.mjs";
import "./arrow-up-Bz_3TtFV.mjs";
import "./arrow-left-CMfuYZxx.mjs";
import "./undo-BAl34KoQ.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./calendar-range-y4cCQ38i.mjs";
import "./grip-vertical-BZ97lzFr.mjs";
import "./chevron-left-B3DYEMBD.mjs";
import "./chevron-right-CuQoX9Pi.mjs";
import "./circle-x-Cl8E95HV.mjs";
import "./inbox-D7xsMQ51.mjs";
import "./external-link-CmvYK2QO.mjs";
import "./loader-circle-CW1skEGS.mjs";
import "./eye-ClSFFkn7.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./heart-handshake-B7Ezscjx.mjs";
import "./twitter-Cvo1xDyB.mjs";
import "./message-circle-YyMldOk1.mjs";
import "./minus-Bw_s4iG4.mjs";
import "./pencil-mCoYCDbe.mjs";
import "./play-B6FCKmIk.mjs";
import "./plus-_pcJFpCM.mjs";
import "./power-DS-TZLWq.mjs";
import "./quote-BllpPa8P.mjs";
import "./save-DVe6ySDW.mjs";
import "./search-BYbblEQo.mjs";
import "./star-DjJ2imAx.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./trash-2-DhLuOvGs.mjs";
import "./upload-8X_y_6jh.mjs";
import "./users-CS6GCzjY.mjs";

import "../_libs/unenv.mjs";


const PROCESS_DEFAULTS = {
  heading: "A Simple Guide to Your",
  heading_highlight: "Fertility Journey",
  heading_color: "#8B0F50"
};
const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Select Your Service",
    description: "Choose the type of consultation you need based on your concerns and goals.",
    to: "/services"
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Pick Your Specialist",
    description: "Browse experts and select the doctor that suits your preferences.",
    to: "/team"
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Choose Date & Time",
    description: "Pick available slots and book a time that works best for your schedule.",
    to: "/contact"
  },
  {
    icon: CircleCheck,
    number: "04",
    title: "Confirm & Attend",
    description: "Complete the booking & join your appointment with a heart of confidence.",
    to: "/contact"
  }
];
const STEP_OFFSETS_LG = [0, 120, 30, 120];
const STEP_DELAYS = [0, 0.8, 1.6, 2.4];
function ProcessSteps() {
  const cms = useHomepageSection("process", PROCESS_DEFAULTS);
  const sectionRef = reactExports.useRef(null);
  const [runId, setRunId] = reactExports.useState(0);
  const [active, setActive] = reactExports.useState(false);
  const [isLg, setIsLg] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  reactExports.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            setRunId((n) => n + 1);
          } else {
            setActive(false);
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "process", className: "pt-10 sm:pt-14 lg:pt-20 pb-10 sm:pb-14 lg:pb-20 bg-pink-soft/40 overflow-visible", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: sectionRef, className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-extrabold mb-8 sm:mb-12 lg:mb-16 leading-tight", style: { fontSize: "clamp(1.625rem, 4.2vw, 2.25rem)" }, children: [
      cms.heading,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cms.heading_color }, children: cms.heading_highlight })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-6", children: steps.map((step, i) => {
      const Icon = step.icon;
      const lgOffset = STEP_OFFSETS_LG[i];
      const delay = STEP_DELAYS[i];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 28 },
          animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
          transition: { duration: 0.7, delay: i * 0.14, ease: "easeOut" },
          className: "group relative z-10 flex flex-col items-center overflow-visible",
          style: { ["--lg-offset"]: `${lgOffset}px` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: step.to,
              className: "flex flex-col items-center w-full lg:min-h-[320px] relative overflow-visible cursor-pointer",
              style: { transform: isLg ? `translateY(${lgOffset}px)` : void 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4 sm:mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      className: "absolute inset-0 rounded-full",
                      style: { boxShadow: "0 0 0 0 #E6007E", border: "2px solid #E6007E" },
                      initial: { scale: 1, opacity: 0 },
                      animate: { scale: [1, 1.25, 1], opacity: [0, 0.5, 0] },
                      transition: { duration: 0.6, ease: "easeOut", delay }
                    },
                    `pulse-${runId}-${i}`
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "step-circle h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full gradient-brand grid place-items-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "step-icon inline-flex transition-transform duration-[400ms] ease-out group-hover:scale-[1.15] group-hover:-rotate-[8deg]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11", strokeWidth: 1.8 }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      className: "step-badge absolute -top-1 -right-1 h-9 w-9 rounded-full border-2 border-brand-pink grid place-items-center font-extrabold text-xs shadow-md",
                      initial: { backgroundColor: "#ffffff", color: "#E6007E" },
                      animate: active ? { backgroundColor: ["#ffffff", "#E6007E", "#ffffff"], color: ["#E6007E", "#ffffff", "#E6007E"] } : { backgroundColor: "#ffffff", color: "#E6007E" },
                      transition: { duration: 0.4, delay, ease: "easeOut" },
                      children: step.number
                    },
                    `badge-${runId}-${i}`
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h3,
                  {
                    className: "step-title font-bold text-lg mb-2 transition-colors duration-300",
                    initial: { color: "#1A1535" },
                    animate: active ? { color: ["#1A1535", "#E6007E", "#1A1535"] } : { color: "#1A1535" },
                    transition: { duration: 0.5, delay, ease: "easeOut" },
                    children: step.title
                  },
                  `title-${runId}-${i}`
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[220px] mx-auto", children: step.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity", style: { color: "#E6007E" }, children: "Visit page →" })
              ]
            }
          )
        },
        step.number
      );
    }) })
  ] }) });
}
const STAGES = [
  {
    n: "01",
    icon: "🩸",
    title: "Irregular Menstrual Cycles",
    desc: "If you have irregular or absent menstrual cycles, it may indicate an underlying fertility issue that needs attention."
  },
  {
    n: "02",
    icon: "🤰",
    title: "Having Trouble Conceiving",
    desc: "If you have been trying to conceive for over a year without success, it may be time to seek specialist help."
  },
  {
    n: "03",
    icon: "⏳",
    title: "Age-Related Concerns",
    desc: "If you are over 35 and have been trying to conceive for six months or more, consulting a specialist is strongly advisable."
  },
  {
    n: "04",
    icon: "💙",
    title: "Previous Pregnancy Loss",
    desc: "If you have experienced recurrent miscarriages or pregnancy loss, our specialists can help identify the cause and guide your next steps."
  },
  {
    n: "05",
    icon: "👨‍👩‍👧",
    title: "Family History of Infertility",
    desc: "If you have a family history of infertility or reproductive issues, early consultation can significantly improve your outcomes."
  }
];
function StageCard({ stage, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.55, delay: index * 0.1, ease: "easeOut" },
      className: "group relative bg-white overflow-hidden",
      style: {
        borderRadius: 20,
        padding: "32px 28px",
        border: "1px solid rgba(230,0,126,0.10)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(230,0,126,0.13)";
        e.currentTarget.style.borderColor = "rgba(230,0,126,0.30)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
        e.currentTarget.style.borderColor = "rgba(230,0,126,0.10)";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              width: 80,
              height: 80,
              background: "linear-gradient(225deg, rgba(230,0,126,0.08), transparent)",
              borderRadius: "0 20px 0 80px",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 20,
              right: 20,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#FFF1F7",
              border: "1.5px solid rgba(230,0,126,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#E6007E"
            },
            children: stage.n
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "stage-icon-circle",
            style: {
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFF1F7, #fcd4e8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 22,
              fontSize: 32,
              transition: "background 0.3s ease"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { lineHeight: 1 }, children: stage.icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "stage-title",
            style: {
              fontFamily: "'Playfair Display', serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#2D0A1E",
              marginBottom: 12,
              transition: "color 0.3s ease"
            },
            children: stage.title
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: 14, color: "#7A2050", lineHeight: 1.7, margin: 0 }, children: stage.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/contact",
            className: "stage-learn-more",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#E6007E",
              fontSize: 13,
              fontWeight: 700,
              marginTop: 18,
              textDecoration: "none",
              opacity: 0,
              transition: "all 0.3s ease"
            },
            children: [
              "Book Consultation ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .group:hover .stage-icon-circle {
          background: linear-gradient(135deg, #E6007E, #B5005F) !important;
        }
        .group:hover .stage-icon-circle > span {
          filter: brightness(10);
        }
        .group:hover .stage-title {
          color: #C2185B !important;
        }
        .group:hover .stage-learn-more {
          opacity: 1 !important;
          gap: 10px !important;
        }
      ` })
      ]
    }
  );
}
function FertilityStages() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      style: {
        background: "linear-gradient(135deg, #FFF1F7 0%, #ffffff 50%, #EAF7FD 100%)",
        padding: "80px 8%"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.55, ease: "easeOut" },
              className: "text-center",
              style: { marginBottom: 52 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    style: {
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: "#C2185B",
                      fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                      marginBottom: 12,
                      lineHeight: 1.2
                    },
                    children: "Which Stage of Fertility Are You In?"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#7A2050", fontSize: 15, textAlign: "center", margin: 0 }, children: "Understanding your stage helps us design the right treatment plan for you." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: STAGES.slice(0, 3).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StageCard, { stage: s, index: i }, s.n)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto", style: { maxWidth: "66.6667%" }, children: STAGES.slice(3).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StageCard, { stage: s, index: i + 3 }, s.n)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", style: { marginTop: 44 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#7A2050", fontSize: 15, marginBottom: 16 }, children: "Not sure which stage you are in?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                style: {
                  display: "inline-block",
                  background: "linear-gradient(135deg, #E6007E, #B5005F)",
                  color: "white",
                  padding: "14px 36px",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(230,0,126,0.3)",
                  transition: "all 0.3s ease"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(230,0,126,0.4)";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(230,0,126,0.3)";
                },
                children: "Get a Free Assessment →"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (max-width: 900px) {
          section .mt-6.grid {
            max-width: 100% !important;
          }
        }
      ` })
      ]
    }
  );
}
const cardGradients = ["linear-gradient(135deg, #FFF1F7 0%, #fcd4e8 100%)", "linear-gradient(135deg, #EAF7FD 0%, #F5DCF0 100%)", "linear-gradient(135deg, #fcd4e8 0%, #EAF7FD 100%)", "linear-gradient(135deg, #c2e8f8 0%, #FFF1F7 100%)", "linear-gradient(135deg, #FFF1F7 0%, #c2e8f8 100%)", "linear-gradient(135deg, #EAF7FD 0%, #fcd4e8 100%)"];
function pickIcon(name) {
  const I = Icons[name || ""];
  return I || Heart;
}
function ServicesPage() {
  const [services, setServices] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("services").select("*").eq("status", "published").order("display_order").then(({
      data
    }) => setServices(data || []));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Our Services", breadcrumb: "Services", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Comprehensive Fertility Care" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: services.map((s, i) => {
        const Icon = pickIcon(s.icon);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 24
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.45,
          delay: i % 3 * 0.08
        }, className: "rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 flex flex-col", style: {
          background: cardGradients[i % cardGradients.length],
          border: "1px solid rgba(230,0,126,0.12)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7", style: {
            color: BRAND.pink
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl font-semibold mb-3", style: {
            color: BRAND.plum
          }, children: s.title }),
          s.short_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed mb-4 flex-1", style: {
            color: BRAND.navLink
          }, children: s.short_description }),
          s.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services/$slug", params: {
            slug: s.slug
          }, className: "inline-flex items-center gap-1 text-sm font-semibold mt-auto", style: {
            color: BRAND.pink
          }, children: [
            "Learn More ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] }, s.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FertilityStages, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProcessSteps, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTABanner, {})
  ] });
}
export {
  ServicesPage as component
};
