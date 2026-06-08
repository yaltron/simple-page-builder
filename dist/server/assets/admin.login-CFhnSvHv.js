import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { p as useNavigate, H as Hospital, L as Link, s as supabase, u as ue } from "./router-4B5-JGly.js";
import { l as logo } from "./logo-mJLYSy2R.js";
import { F as FileText } from "./file-text-BJ6E_L4F.js";
import { U as Users } from "./users-NSvbWMRt.js";
import { E as EyeOff, L as LoaderCircle } from "./loader-circle-ChIHrNgL.js";
import { E as Eye } from "./eye-DRAxxSWW.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPw, setShowPw] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      setErr("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }
    const uid = data.user?.id;
    const {
      data: role
    } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    if (!role) {
      await supabase.auth.signOut();
      setErr("This account doesn't have admin access.");
      setLoading(false);
      return;
    }
    ue.success("Welcome back");
    navigate({
      to: "/admin"
    });
  };
  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid rgba(230,0,126,0.2)",
    borderRadius: 12,
    fontSize: 15,
    background: "white",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease"
  };
  const onFocus = (e) => {
    e.currentTarget.style.borderColor = "#E6007E";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230,0,126,0.1)";
  };
  const onBlur = (e) => {
    e.currentTarget.style.borderColor = "rgba(230,0,126,0.2)";
    e.currentTarget.style.boxShadow = "none";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      flex: "0 0 45%",
      minWidth: 320,
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2D0A1E 0%, #880E4F 60%, #E6007E 100%)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 40px",
      overflow: "hidden"
    }, className: "admin-login-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        top: -120,
        left: -120,
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "white",
        opacity: 0.05,
        filter: "blur(40px)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        bottom: -140,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "white",
        opacity: 0.05,
        filter: "blur(50px)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        width: "100%",
        maxWidth: 360
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Subhashree IVF", style: {
          width: 180,
          height: "auto",
          display: "block",
          margin: "0 auto 24px",
          filter: "brightness(1.1)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          color: "white",
          fontWeight: 700,
          textAlign: "center"
        }, children: "Subhashree IVF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontSize: 13,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          textAlign: "center",
          marginTop: 6,
          marginBottom: 40
        }, children: "Fertility & IVF Centre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "admin-login-pills", style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10
        }, children: [{
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hospital, { className: "w-4 h-4" }),
          label: "Manage Appointments"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          label: "Edit Content & Blog"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          label: "Team & Services"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 50,
          padding: "10px 20px",
          color: "white",
          fontSize: 13,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 8
        }, children: [
          p.icon,
          p.label
        ] }, p.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        bottom: 24,
        left: 0,
        right: 0,
        fontSize: 11,
        color: "rgba(255,255,255,0.3)",
        textAlign: "center"
      }, children: "Secure admin access only" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      flex: "1 1 55%",
      minWidth: 320,
      minHeight: "100vh",
      background: "#FFFAF8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "60px 10%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      width: "100%",
      maxWidth: 440,
      margin: "0 auto"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Subhashree IVF", style: {
        width: 80,
        height: "auto",
        display: "block",
        margin: "0 auto 8px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: "#b06090",
        textAlign: "center",
        marginBottom: 40
      }, children: "CMS Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
        fontFamily: "'Playfair Display', serif",
        fontSize: 32,
        fontWeight: 700,
        color: "#2D0A1E",
        marginBottom: 6
      }, children: "Welcome Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        fontSize: 15,
        color: "#7A2050",
        marginBottom: 36
      }, children: "Sign in to your admin dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
          display: "block",
          fontSize: 13,
          fontWeight: 700,
          color: "#2D0A1E",
          marginBottom: 6
        }, children: "Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), style: {
          ...inputStyle,
          marginBottom: 20
        }, onFocus, onBlur }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: {
          display: "block",
          fontSize: 13,
          fontWeight: 700,
          color: "#2D0A1E",
          marginBottom: 6
        }, children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          position: "relative",
          marginBottom: 8
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPw ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), style: {
            ...inputStyle,
            paddingRight: 44
          }, onFocus, onBlur }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPw((v) => !v), "aria-label": showPw ? "Hide password" : "Show password", style: {
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#b06090",
            padding: 4,
            display: "flex"
          }, onMouseEnter: (e) => e.currentTarget.style.color = "#E6007E", onMouseLeave: (e) => e.currentTarget.style.color = "#b06090", children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", style: {
          width: "100%",
          padding: 14,
          borderRadius: 50,
          background: "linear-gradient(135deg, #E6007E, #B5005F)",
          color: "white",
          fontSize: 16,
          fontWeight: 700,
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: 8,
          boxShadow: "0 8px 24px rgba(230,0,126,0.3)",
          transition: "all 0.25s ease",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: loading ? 0.85 : 1
        }, onMouseEnter: (e) => {
          if (loading) return;
          e.currentTarget.style.opacity = "0.92";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(230,0,126,0.4)";
        }, onMouseLeave: (e) => {
          if (loading) return;
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(230,0,126,0.3)";
        }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " Signing in…"
        ] }) : "Sign In" }),
        err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          background: "#FFF1F7",
          border: "1px solid rgba(230,0,126,0.3)",
          borderRadius: 10,
          padding: "10px 14px",
          color: "#C2185B",
          fontSize: 13,
          fontWeight: 600,
          marginTop: 12
        }, children: err })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        borderTop: "1px solid rgba(230,0,126,0.15)",
        marginTop: 32,
        paddingTop: 16
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          fontSize: 12,
          color: "#b06090",
          textAlign: "center"
        }, children: "© 2025 Subhashree IVF Clinic Pvt. Ltd." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "block text-center text-xs mt-3", style: {
          color: "#b06090"
        }, children: "← Back to website" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media (max-width: 768px) {
          .admin-login-left {
            flex: 0 0 100% !important;
            min-height: 200px !important;
            padding: 24px !important;
          }
          .admin-login-left .admin-login-pills { display: none !important; }
        }
      ` })
  ] });
}
export {
  AdminLoginPage as component
};
