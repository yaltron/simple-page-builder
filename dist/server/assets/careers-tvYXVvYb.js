import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { s as supabase, h as PageLayout, S as Section, l as SectionHeading, n as motion, a as BRAND, f as MapPin, c as Clock, X, u as ue } from "./router-4B5-JGly.js";
import { H as Heart, G as GraduationCap, A as Award } from "./heart-Ccj7GWvS.js";
import { U as Users } from "./users-NSvbWMRt.js";
import { B as Briefcase } from "./briefcase-CL4WmvrV.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
const perks = [{
  icon: Heart,
  title: "Meaningful Work",
  desc: "Help families build their dreams of parenthood every day."
}, {
  icon: GraduationCap,
  title: "Continuous Learning",
  desc: "Training programs, conferences, and career development."
}, {
  icon: Award,
  title: "Recognition",
  desc: "We celebrate excellence and reward outstanding contributions."
}, {
  icon: Users,
  title: "Caring Team",
  desc: "Work alongside compassionate colleagues in a supportive culture."
}];
function CareersPage() {
  const [listings, setListings] = reactExports.useState([]);
  const [applying, setApplying] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.from("career_listings").select("*").eq("is_active", true).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setListings(data || []));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Career", breadcrumb: "Career", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Why Work With Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: perks.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-6 h-6", style: {
          color: BRAND.pink
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-1", style: {
          color: BRAND.plum
        }, children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: {
          color: BRAND.navLink
        }, children: p.desc })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: BRAND.pinkSoft, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Current Openings" }),
      listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 rounded-2xl bg-white", style: {
        color: BRAND.navLink,
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-10 h-10 mx-auto mb-3", style: {
          color: BRAND.pink
        } }),
        "No current openings. Please check back later or send us your CV at ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:Shubhashreeivf@gmail.com", style: {
          color: BRAND.pink,
          fontWeight: 600
        }, children: "Shubhashreeivf@gmail.com" }),
        "."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: listings.map((j, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl font-bold mb-2", style: {
          color: BRAND.heading
        }, children: j.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs mb-3", style: {
          color: BRAND.navLink
        }, children: [
          j.department && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3 h-3" }),
            j.department
          ] }),
          j.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
            j.location
          ] }),
          j.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            j.type
          ] }),
          j.experience && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: j.experience })
        ] }),
        j.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-3", style: {
          color: BRAND.plum
        }, children: j.description }),
        j.deadline && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mb-4", style: {
          color: BRAND.pink
        }, children: [
          "Apply by: ",
          new Date(j.deadline).toLocaleDateString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setApplying(j), className: "px-5 py-2 rounded-full text-white text-sm font-bold transition-transform hover:scale-105", style: {
          background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
        }, children: "Apply Now" })
      ] }, j.id)) })
    ] }),
    applying && /* @__PURE__ */ jsxRuntimeExports.jsx(ApplyModal, { listing: applying, onClose: () => setApplying(null) })
  ] });
}
function ApplyModal({
  listing,
  onClose
}) {
  const [form, setForm] = reactExports.useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
    portfolio_url: ""
  });
  const [resume, setResume] = reactExports.useState(null);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const ACCEPTED = [".pdf", ".doc", ".docx"];
  const validateFile = (file) => {
    const name = file.name.toLowerCase();
    if (!ACCEPTED.some((ext) => name.endsWith(ext))) {
      ue.error("Please upload PDF, DOC or DOCX only");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("File too large. Maximum size is 5MB");
      return false;
    }
    return true;
  };
  const handleFiles = (files) => {
    if (!files || !files[0]) return;
    if (validateFile(files[0])) setResume(files[0]);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim() || !form.phone.trim()) {
      return ue.error("Name, email, and phone are required");
    }
    setSubmitting(true);
    let resume_url = null;
    if (resume) {
      const folderUuid = crypto.randomUUID();
      const fileUuid = crypto.randomUUID();
      const ext = (resume.name.split(".").pop() || "").toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext)) {
        setSubmitting(false);
        return ue.error("Resume must be a PDF, DOC, or DOCX file");
      }
      const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `uploads/${folderUuid}/${fileUuid}_${safeName}`;
      const {
        error: upErr
      } = await supabase.storage.from("resumes").upload(path, resume);
      if (upErr) {
        setSubmitting(false);
        return ue.error("Resume upload failed: " + upErr.message);
      }
      resume_url = path;
    }
    const {
      error
    } = await supabase.from("career_applications").insert({
      career_id: listing.id,
      position: listing.title,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      cover_letter: form.cover_letter.trim() || null,
      portfolio_url: form.portfolio_url.trim() || null,
      resume_url
    });
    setSubmitting(false);
    if (error) return ue.error(error.message);
    ue.success("Application submitted! We'll be in touch.");
    onClose();
  };
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[1000000] bg-black/60 flex items-center justify-center p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-xl font-bold", style: {
          color: BRAND.heading
        }, children: [
          "Apply for ",
          listing.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: {
          color: BRAND.navLink
        }, children: "All fields marked * are required" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Full Name *", value: form.full_name, onChange: (e) => setForm({
        ...form,
        full_name: e.target.value
      }), className: "w-full px-3 py-2.5 border rounded-lg text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", placeholder: "Email *", value: form.email, onChange: (e) => setForm({
        ...form,
        email: e.target.value
      }), className: "w-full px-3 py-2.5 border rounded-lg text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", placeholder: "Phone *", value: form.phone, onChange: (e) => setForm({
        ...form,
        phone: e.target.value
      }), className: "w-full px-3 py-2.5 border rounded-lg text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Portfolio URL (optional)", value: form.portfolio_url, onChange: (e) => setForm({
        ...form,
        portfolio_url: e.target.value
      }), className: "w-full px-3 py-2.5 border rounded-lg text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold mb-2", style: {
          color: BRAND.navLink
        }, children: "CV / Resume" }),
        !resume ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        }, onDragLeave: () => setDragOver(false), onDrop: (e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }, onClick: () => fileInputRef.current?.click(), className: "text-center cursor-pointer transition-colors", style: {
          border: dragOver ? "2px solid #E6007E" : "2px dashed rgba(230,0,126,0.35)",
          borderRadius: 16,
          background: dragOver ? "rgba(230,0,126,0.08)" : "#FFF1F7",
          padding: 32
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            fontSize: 36,
            color: "#E6007E",
            lineHeight: 1
          }, children: "📎" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mt-3", style: {
            color: BRAND.plum
          }, children: "Drag & drop your CV here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs my-2", style: {
            color: BRAND.navLink
          }, children: "or" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }, className: "px-5 py-1.5 rounded-full text-sm font-semibold", style: {
            border: "1.5px solid #E6007E",
            color: "#E6007E",
            background: "transparent"
          }, children: "Browse Files" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", style: {
            fontSize: 12,
            color: "#b06090"
          }, children: "Accepted: PDF, DOC, DOCX • Max 5MB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: ".pdf,.doc,.docx", onChange: (e) => handleFiles(e.target.files), className: "hidden" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2", style: {
          background: "white",
          border: "1px solid rgba(230,0,126,0.2)",
          borderRadius: 50,
          padding: "8px 16px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📄" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", style: {
            color: BRAND.plum
          }, children: resume.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: {
            color: BRAND.navLink
          }, children: formatSize(resume.size) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setResume(null), className: "ml-1 text-sm", style: {
            color: "#E6007E"
          }, "aria-label": "Remove file", children: "✕" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, placeholder: "Cover letter (optional)", value: form.cover_letter, onChange: (e) => setForm({
        ...form,
        cover_letter: e.target.value
      }), className: "w-full px-3 py-2.5 border rounded-lg text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "w-full py-3 rounded-full text-white font-bold disabled:opacity-60", style: {
        background: "#B5005F"
      }, children: submitting ? "Submitting…" : "Submit Application" })
    ] })
  ] }) });
}
export {
  CareersPage as component
};
