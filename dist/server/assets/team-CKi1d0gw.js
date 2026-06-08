import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { s as supabase, h as PageLayout, S as Section, l as SectionHeading, n as motion, a as BRAND, L as Link, C as Calendar, P as PageCTABanner } from "./router-4B5-JGly.js";
import { S as Stethoscope } from "./stethoscope-Dg79Wn2h.js";
import { H as HeartHandshake, F as FlaskConical } from "./heart-handshake-CIz-Vs8P.js";
import { B as Briefcase } from "./briefcase-CL4WmvrV.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
function useDoctors() {
  const [doctors, setDoctors] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let mounted = true;
    const fetchDoctors = async () => {
      const { data } = await supabase.from("doctors").select("*").eq("status", "published").order("display_order", { ascending: true });
      if (mounted) {
        setDoctors(data || []);
        setLoading(false);
      }
    };
    fetchDoctors();
    const channel = supabase.channel("doctors-changes").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "doctors" },
      () => fetchDoctors()
    ).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);
  return { doctors, loading };
}
const support = [{
  icon: Stethoscope,
  title: "Nurses",
  desc: "Dedicated fertility nurses guiding you at every visit."
}, {
  icon: HeartHandshake,
  title: "Counsellors",
  desc: "Emotional support specialists for couples and individuals."
}, {
  icon: FlaskConical,
  title: "Lab Technicians",
  desc: "Skilled embryology and andrology lab professionals."
}, {
  icon: Briefcase,
  title: "Admin Staff",
  desc: "Friendly coordinators handling appointments and paperwork."
}];
function TeamPage() {
  const {
    doctors
  } = useDoctors();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Our Team", breadcrumb: "Our Team", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Meet Our Specialists" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: doctors.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
      }, className: "rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5", style: {
        background: i % 2 === 0 ? "linear-gradient(135deg, #FFF1F7 0%, #fcd4e8 100%)" : "linear-gradient(135deg, #EAF7FD 0%, #F5DCF0 100%)",
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-gray-100", children: d.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image, alt: d.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base font-bold mb-1", style: {
            color: BRAND.heading
          }, children: d.name }),
          d.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold mb-1", style: {
            color: BRAND.pink
          }, children: d.title }),
          d.qualifications && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-1", style: {
            color: BRAND.navLink
          }, children: d.qualifications }),
          d.experience_years ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold mb-3", style: {
            color: BRAND.plum
          }, children: [
            d.experience_years,
            "+ Years"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "w-full py-2 text-white text-xs font-bold rounded-full inline-flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]", style: {
            background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            " Book"
          ] })
        ] })
      ] }, d.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: BRAND.pinkSoft, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Our Support Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: support.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
      }, className: "bg-white rounded-2xl p-6 text-center transition-transform hover:-translate-y-1", style: {
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4", style: {
          background: BRAND.pinkSoft
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-6 h-6", style: {
          color: BRAND.pink
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-1", style: {
          color: BRAND.plum
        }, children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: {
          color: BRAND.navLink
        }, children: s.desc })
      ] }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTABanner, {})
  ] });
}
export {
  TeamPage as component
};
