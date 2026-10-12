import { W as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, S as Section, m as motion, B as BRAND, L as Link } from "./router-D3NQCnuk.mjs";
import { I as Icons, T as Target, S as Sparkles } from "./lucide-react-D02tlVIt.mjs";
import { u as useAboutSection } from "./use-cms-content-CkL30vlf.mjs";
import { E as Eye } from "./eye-ClSFFkn7.mjs";



import "./index-CZVAwXUt.mjs";
import "./arrow-up-Bz_3TtFV.mjs";
import "./arrow-left-CMfuYZxx.mjs";
import "./arrow-right-C0k9iFax.mjs";
import "./heart-DOOWiMCz.mjs";
import "./undo-BAl34KoQ.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./user-round-BantWQqJ.mjs";
import "./calendar-range-y4cCQ38i.mjs";
import "./grip-vertical-BZ97lzFr.mjs";
import "./chevron-left-B3DYEMBD.mjs";
import "./chevron-right-CuQoX9Pi.mjs";
import "./circle-check-DNWRcUgB.mjs";
import "./circle-x-Cl8E95HV.mjs";
import "./inbox-D7xsMQ51.mjs";
import "./external-link-CmvYK2QO.mjs";
import "./loader-circle-CW1skEGS.mjs";
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


const whoClinic = "/assets/who-clinic-C08D0FBc.jpg";
const whoTeam = "/assets/who-team-B5bqQWRE.jpg";
const DEFAULT_STORY = {
  heading: "Our Story",
  heading_color: "#C2185B",
  paragraph_1: "Founded over 12 years ago, Shubhashree IVF & Fertility Centre has grown into a dedicated fertility centre in Nepal focused on reproductive medicine. From our first clinic to today's full-service centre of excellence, our mission has remained the same - bringing happiness into your life.",
  paragraph_2: "With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.",
  images: [{
    url: whoClinic,
    alt: "Shubhashree IVF Clinic building and reception in Kathmandu"
  }, {
    url: whoTeam,
    alt: "Our fertility specialist team at Shubhashree IVF Clinic, Kathmandu"
  }, {
    url: whoClinic,
    alt: "Shubhashree IVF Clinic facilities"
  }]
};
const DEFAULT_MV = {
  mission_title: "Our Mission",
  mission_text: "To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support - at a cost accessible to all.",
  vision_title: "Our Vision",
  vision_text: "To be a fertility centre in South Asia recognised for medical dedication, ethical practice and the joy we bring to families.",
  mission_icon: "Target",
  vision_icon: "Eye"
};
const DEFAULT_WHY = {
  heading: "Why Choose Us",
  heading_color: "#C2185B",
  cards: [{
    icon: "HeartHandshake",
    title: "Personalised Plans",
    description: "Treatment plans tailored to your unique journey."
  }, {
    icon: "Sparkles",
    title: "Emotional Support",
    description: "Counselling and compassion at every step."
  }, {
    icon: "Award",
    title: "Affordable Care",
    description: "Comprehensive fertility care accessible to all."
  }]
};
const DEFAULT_VALUES = {
  heading: "Our Values",
  heading_color: "#C2185B",
  items: [{
    icon: "HeartHandshake",
    title: "Compassion",
    description: "Every patient is treated with empathy, dignity and unwavering support."
  }, {
    icon: "ShieldCheck",
    title: "Excellence",
    description: "Modern technology and protocols, refined over more than a decade."
  }, {
    icon: "Sparkles",
    title: "Hope",
    description: "We believe in the dream of every family - and work tirelessly to honour it."
  }]
};
const DEFAULT_CTA = {
  heading: "Ready to Start Your Journey?",
  subtext: "Take the first step towards parenthood. Our compassionate team is here for you.",
  button_text: "Book Consultation",
  button_url: "/contact"
};
function IconByName({
  name,
  className,
  style
}) {
  const Cmp = Icons[name] || Sparkles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Cmp, { className, style });
}
function Heading({
  children,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
    fontFamily: "'Playfair Display', serif",
    color: color || BRAND.heading,
    fontSize: "clamp(26px, 3.5vw, 38px)",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 36
  }, children });
}
function resolveImage(url) {
  if (url?.includes("who-clinic")) return whoClinic;
  if (url?.includes("who-team")) return whoTeam;
  return url;
}
function AboutPage() {
  const story = useAboutSection("story_images", DEFAULT_STORY);
  const mv = useAboutSection("mission_vision", DEFAULT_MV);
  const why = useAboutSection("why_choose_us", DEFAULT_WHY);
  const valuesRow = useAboutSection("values", DEFAULT_VALUES);
  const cta = useAboutSection("cta_banner", DEFAULT_CTA);
  const images = (story.images && story.images.length ? story.images : DEFAULT_STORY.images).slice(0, 3);
  const whyCards = why.cards && why.cards.length ? why.cards : DEFAULT_WHY.cards;
  const values = valuesRow.items && valuesRow.items.length ? valuesRow.items : DEFAULT_VALUES.items;
  const MissionIcon = Icons[mv.mission_icon || "Target"] || Target;
  const VisionIcon = Icons[mv.vision_icon || "Eye"] || Eye;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "About Us", breadcrumb: "About Us", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
          fontFamily: "'Playfair Display', serif",
          color: story.heading_color || BRAND.heading,
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 700,
          textAlign: "left",
          marginBottom: 24
        }, children: story.heading || "Our Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          lineHeight: 1.8,
          marginBottom: 16
        }, children: story.paragraph_1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          lineHeight: 1.8
        }, children: story.paragraph_2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: 30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
              .story-collage { display: flex; flex-direction: row; gap: 16px; align-items: stretch; width: 100%; }
              .story-collage-left { display: flex; flex-direction: column; gap: 16px; width: 45%; }
              .story-collage-right { width: 52%; }
              .story-collage-img-sm { width: 100%; height: 220px; object-fit: cover; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.10); display: block; }
              .story-collage-img-tall { width: 100%; height: 460px; object-fit: cover; object-position: top center; border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.10); display: block; }
              @media (max-width: 767px) {
                .story-collage { flex-direction: column; }
                .story-collage-left, .story-collage-right { width: 100%; }
                .story-collage-img-tall { height: 220px; }
              }
            ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-collage", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "story-collage-left", children: [
            images[0]?.url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[0].url), alt: images[0].alt || "", className: "story-collage-img-sm" }),
            images[1]?.url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[1].url), alt: images[1].alt || "", className: "story-collage-img-sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "story-collage-right", children: images[2]?.url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[2].url), alt: images[2].alt || "", className: "story-collage-img-tall" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { children: "Our Mission & Vision" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [{
        Icon: MissionIcon,
        title: mv.mission_title,
        bg: BRAND.pinkSoft,
        text: mv.mission_text
      }, {
        Icon: VisionIcon,
        title: mv.vision_title,
        bg: BRAND.blueSoft,
        text: mv.vision_text
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5
      }, className: "rounded-2xl p-8 transition-transform hover:-translate-y-1.5", style: {
        background: c.bg,
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.Icon, { className: "w-7 h-7", style: {
          color: BRAND.pink
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl font-bold mb-3", style: {
          color: BRAND.heading
        }, children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          lineHeight: 1.7
        }, children: c.text })
      ] }, c.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: BRAND.pinkSoft, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { color: why.heading_color, children: why.heading || "Why Choose Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5 max-w-5xl mx-auto", children: whyCards.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.4,
        delay: i * 0.08
      }, className: "bg-white rounded-2xl p-6 transition-transform hover:-translate-y-1", style: {
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center mb-4", style: {
          background: BRAND.pinkSoft
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconByName, { name: w.icon || "HeartHandshake", className: "w-6 h-6", style: {
          color: BRAND.pink
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold mb-2", style: {
          color: BRAND.plum
        }, children: w.title }),
        w.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          lineHeight: 1.6,
          fontSize: 14
        }, children: w.description })
      ] }, (w.title || "") + i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { color: valuesRow.heading_color, children: valuesRow.heading || "Our Values" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5,
        delay: i * 0.1
      }, className: "rounded-2xl p-7 text-center transition-transform hover:-translate-y-1.5", style: {
        background: i % 2 === 0 ? BRAND.pinkSoft : BRAND.blueSoft,
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center", style: {
          background: `linear-gradient(135deg, ${BRAND.pink}, ${BRAND.pinkDark})`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconByName, { name: v.icon || "Sparkles", className: "w-8 h-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl font-bold mb-2", style: {
          color: BRAND.heading
        }, children: v.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          lineHeight: 1.7
        }, children: v.description })
      ] }, (v.title || "") + i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      padding: "60px 8%",
      background: "linear-gradient(135deg, rgba(248,187,217,0.4) 0%, #FFFAF7 50%, rgba(255,248,225,0.4) 100%)",
      color: BRAND.plum,
      textAlign: "center"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-50px"
    }, transition: {
      duration: 0.6
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700,
        marginBottom: 14,
        color: BRAND.heading
      }, children: cta.heading }),
      cta.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        opacity: 0.85,
        maxWidth: 620,
        margin: "0 auto 28px",
        fontSize: 16,
        color: BRAND.plum
      }, children: cta.subtext }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4", children: cta.button_text && (cta.button_url?.startsWith("/") ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: cta.button_url, className: "px-7 py-3 rounded-full font-bold transition-transform hover:scale-105", style: {
        background: "#8B0F50",
        color: "white"
      }, children: cta.button_text }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: cta.button_url || "#", className: "px-7 py-3 rounded-full font-bold transition-transform hover:scale-105", style: {
        background: "#8B0F50",
        color: "white"
      }, children: cta.button_text })) })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
