import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { t as supabase, h as PageLayout, S as Section, o as SectionHeading, q as motion, L as Link, C as Calendar, a as BRAND, P as PageCTABanner } from "./router-BvFo6ij6.js";
import { S as Stethoscope } from "./stethoscope-DDFrHJkj.js";
import { H as HeartHandshake, F as FlaskConical } from "./heart-handshake-Jbg5EEB8.js";
import { B as Briefcase } from "./briefcase-B6s7EvLN.js";
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Meet our team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: doctors.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
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
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/team/$doctorSlug", params: {
        doctorSlug: d.slug || ""
      }, className: "block cursor-pointer", "aria-label": `View profile of ${d.name}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-gray-100", children: d.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image, alt: d.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-base font-bold mb-1", style: {
            color: "#8B0F50"
          }, children: d.name }),
          d.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold mb-1", style: {
            color: "#8B0F50"
          }, children: d.title }),
          d.qualifications && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-1", style: {
            color: "#8B0F50"
          }, children: d.qualifications }),
          d.nmc_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
            color: d.nmc_color || "#8B0F50",
            fontSize: 12,
            fontWeight: 600,
            marginTop: 4,
            marginBottom: 4
          }, children: [
            "NMC No: ",
            d.nmc_number
          ] }),
          d.experience_years ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold mb-3", style: {
            color: "#8B0F50"
          }, children: [
            d.experience_years,
            "+ Years"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/team/$doctorSlug", params: {
              doctorSlug: d.slug || ""
            }, className: "flex-1 py-2 text-xs font-bold rounded-full inline-flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02] border", style: {
              color: "#8B0F50",
              borderColor: "#8B0F50",
              background: "white"
            }, children: "View Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "flex-1 py-2 text-white text-xs font-bold rounded-full inline-flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]", style: {
              background: "#8B0F50"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              " Book"
            ] })
          ] })
        ] })
      ] }) }, d.id)) })
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
