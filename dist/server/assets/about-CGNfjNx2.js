import { M as jsxRuntimeExports } from "../server.js";
import { u as useAboutSection, T as Target, S as ShieldCheck, a as Sparkles, I as Icons } from "./use-cms-content-CvrE5Tw3.js";
import { h as PageLayout, S as Section, n as motion, l as SectionHeading, a as BRAND, P as PageCTABanner } from "./router-4B5-JGly.js";
import { E as Eye } from "./eye-DRAxxSWW.js";
import { H as HeartHandshake } from "./heart-handshake-CIz-Vs8P.js";
import { A as Award } from "./heart-Ccj7GWvS.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./arrow-up-Dgr8uSBS.js";
import "./arrow-left-iHfrrvYd.js";
import "./arrow-right-DK1uGO4x.js";
import "./list-BneYn18z.js";
import "./briefcase-CL4WmvrV.js";
import "./user-round-fnYlCX4m.js";
import "./calendar-range-VxvM3j6w.js";
import "./save-4q9bzKMH.js";
import "./chevron-left-CjtAut_D.js";
import "./chevron-right-CJtinDDl.js";
import "./circle-check-fYV4Wd0M.js";
import "./undo-CbuQIKny.js";
import "./inbox-C9blCg3c.js";
import "./external-link-ydgjgwiV.js";
import "./loader-circle-ChIHrNgL.js";
import "./file-text-BJ6E_L4F.js";
import "./twitter-7XL9ywFp.js";
import "./message-circle-CdfqQonY.js";
import "./minus-LJROBNSp.js";
import "./pencil-CVrspOTf.js";
import "./play-j3TZw2pg.js";
import "./plus-DZCCIbCT.js";
import "./power-B3FuVy2Y.js";
import "./quote-Ci86XyD3.js";
import "./search-BuQbiwCV.js";
import "./star-Px5vbkZd.js";
import "./stethoscope-Dg79Wn2h.js";
import "./trash-2-Duwar6QF.js";
import "./upload-DroGKuN0.js";
import "./users-NSvbWMRt.js";
import "./index-Dn3DJaKR.js";
const whoClinic = "/assets/who-clinic-C08D0FBc.jpg";
const whoTeam = "/assets/who-team-B5bqQWRE.jpg";
const whyChoose = [{
  icon: ShieldCheck,
  label: "ISO Certified Lab"
}, {
  icon: HeartHandshake,
  label: "Personalised Plans"
}, {
  icon: Sparkles,
  label: "Emotional Support"
}, {
  icon: Award,
  label: "Affordable Care"
}];
const DEFAULT_STORY = {
  paragraph_1: "Founded over 12 years ago, Subhashree IVF & Fertility Centre has grown into Nepal's most trusted name in reproductive medicine. From our first clinic to today's full-service centre of excellence, our mission has remained the same - bringing happiness into your life.",
  paragraph_2: "With more than 5,000 successful treatments and a dedicated team of specialists, embryologists and counsellors, we have built a reputation founded on outcomes, transparency and compassionate care for every couple who walks through our doors.",
  images: [{
    url: whoClinic,
    alt: "Shubhashree IVF Clinic building and reception in Kathmandu"
  }, {
    url: whoTeam,
    alt: "Our fertility specialist team at Shubhashree IVF Clinic, Kathmandu"
  }]
};
const DEFAULT_MV = {
  mission_title: "Our Mission",
  mission_text: "To empower every couple on their path to parenthood through advanced fertility care, transparent guidance and compassionate emotional support - at a cost accessible to all.",
  vision_title: "Our Vision",
  vision_text: "To be South Asia's most trusted fertility centre, recognised for medical excellence, ethical practice and the joy we bring to families."
};
const DEFAULT_VALUES = {
  items: [{
    icon: "HeartHandshake",
    title: "Compassion",
    description: "Every patient is treated with empathy, dignity and unwavering support."
  }, {
    icon: "ShieldCheck",
    title: "Excellence",
    description: "World-class technology and protocols, refined over more than a decade."
  }, {
    icon: "Sparkles",
    title: "Hope",
    description: "We believe in the dream of every family - and work tirelessly to honour it."
  }]
};
function IconByName({
  name,
  className,
  style
}) {
  const Cmp = Icons[name] || Sparkles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Cmp, { className, style });
}
function resolveImage(url) {
  if (url?.includes("who-clinic")) return whoClinic;
  if (url?.includes("who-team")) return whoTeam;
  return url;
}
function AboutPage() {
  const story = useAboutSection("story_images", DEFAULT_STORY);
  const mv = useAboutSection("mission_vision", DEFAULT_MV);
  const valuesRow = useAboutSection("values", DEFAULT_VALUES);
  const images = (story.images && story.images.length ? story.images : DEFAULT_STORY.images).slice(0, 3);
  const values = valuesRow.items && valuesRow.items.length ? valuesRow.items : DEFAULT_VALUES.items;
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { align: "left", children: "Our Story" }),
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
      }, className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden h-56 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[0].url), alt: images[0].alt, className: "w-full h-full object-cover" }) }),
          images[2] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden h-56 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[2].url), alt: images[2].alt, className: "w-full h-full object-cover" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-10", children: images[1] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden h-72 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveImage(images[1].url), alt: images[1].alt, className: "w-full h-full object-cover" }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Our Mission & Vision" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: [{
        Icon: Target,
        title: mv.mission_title,
        bg: BRAND.pinkSoft,
        text: mv.mission_text
      }, {
        Icon: Eye,
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Why Choose Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: whyChoose.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
      }, className: "bg-white rounded-2xl p-5 flex items-center gap-4 transition-transform hover:-translate-y-1", style: {
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", style: {
          background: BRAND.pinkSoft
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "w-6 h-6", style: {
          color: BRAND.pink
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", style: {
          color: BRAND.plum
        }, children: w.label })
      ] }, w.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Our Values" }),
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
        }, children: v.description || v.desc })
      ] }, v.title + i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTABanner, {})
  ] });
}
export {
  AboutPage as component
};
