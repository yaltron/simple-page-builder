import { W as jsxRuntimeExports } from "./index.mjs";
import { l as Route$p, N as Navbar, L as Link, g as Calendar, F as Footer } from "./router-D3NQCnuk.mjs";



import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


function DoctorProfilePage() {
  const doctor = Route$p.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      background: "#FFF1F7",
      padding: "12px 5%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto text-sm", style: {
      color: "#7A2050"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", style: {
        color: "#7A2050"
      }, children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        margin: "0 8px",
        opacity: 0.6
      }, children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/team", style: {
        color: "#7A2050"
      }, children: "Our Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        margin: "0 8px",
        opacity: 0.6
      }, children: "›" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        color: "#8B0F50",
        fontWeight: 600
      }, children: doctor.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      background: "#fff",
      padding: "60px 5%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-[2fr_3fr] gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        doctor.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: doctor.image, alt: doctor.name, style: {
          width: "100%",
          aspectRatio: "4/5",
          objectFit: "cover",
          borderRadius: 20,
          display: "block"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-5 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold transition-transform hover:scale-[1.02]", style: {
          background: "#8B0F50",
          color: "#fff"
        }, onMouseEnter: (e) => e.currentTarget.style.background = "#6D0A3E", onMouseLeave: (e) => e.currentTarget.style.background = "#8B0F50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
          " Book Consultation with ",
          doctor.name.replace(/^Dr\.?\s*/, "Dr. ")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif font-bold", style: {
          color: "#C2185B",
          fontSize: "clamp(26px, 3vw, 36px)",
          margin: 0
        }, children: doctor.name }),
        doctor.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: "#8B0F50",
          fontWeight: 700,
          fontSize: 15,
          marginTop: 6
        }, children: doctor.title }),
        doctor.nmc_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
          color: doctor.nmc_color || "#8B0F50",
          fontSize: 12,
          fontWeight: 600,
          marginTop: 4
        }, children: [
          "NMC No: ",
          doctor.nmc_number
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { style: {
          margin: "18px 0",
          border: 0,
          borderTop: "1px solid rgba(139,15,80,0.18)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-6", children: [
          doctor.experience_years ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { children: [
            doctor.experience_years,
            "+ Years Experience"
          ] }) : null,
          doctor.qualifications ? /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: doctor.qualifications }) : null
        ] }),
        doctor.bio && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-serif font-bold mb-2", style: {
            color: "#8B0F50",
            fontSize: 22
          }, children: [
            "About ",
            doctor.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
            color: "#3D2040",
            lineHeight: 1.8,
            marginBottom: 24
          }, children: doctor.bio })
        ] }),
        doctor.specialties && doctor.specialties.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif font-bold mb-3", style: {
            color: "#8B0F50",
            fontSize: 22
          }, children: "Areas of Expertise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: {
            paddingLeft: 0,
            listStyle: "none",
            marginBottom: 24
          }, children: doctor.specialties.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            marginBottom: 8,
            color: "#3D2040"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#8B0F50",
              marginTop: 8,
              flexShrink: 0
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s })
          ] }, s)) })
        ] }),
        doctor.qualifications && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif font-bold mb-2", style: {
            color: "#8B0F50",
            fontSize: 22
          }, children: "Qualifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
            color: "#3D2040",
            lineHeight: 1.8
          }, children: doctor.qualifications })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Chip({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    background: "#FFF1F7",
    color: "#8B0F50",
    borderRadius: 50,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600
  }, children });
}
export {
  DoctorProfilePage as component
};
