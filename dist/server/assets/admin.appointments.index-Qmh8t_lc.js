import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-Ce2DoEvQ.js";
import { s as supabase, u as ue, C as Calendar, c as Clock, X, i as Phone } from "./router-4B5-JGly.js";
import { I as Inbox, D as Download } from "./inbox-C9blCg3c.js";
import { C as CircleCheck } from "./circle-check-fYV4Wd0M.js";
import { S as Search } from "./search-BuQbiwCV.js";
import { T as Trash2 } from "./trash-2-Duwar6QF.js";
import { M as MessageCircle } from "./message-circle-CdfqQonY.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./logo-mJLYSy2R.js";
import "./user-round-fnYlCX4m.js";
import "./file-text-BJ6E_L4F.js";
import "./stethoscope-Dg79Wn2h.js";
import "./briefcase-CL4WmvrV.js";
import "./index-Dn3DJaKR.js";
function splitIso(iso) {
  if (!iso) return {
    date: "",
    time: ""
  };
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`
  };
}
function combineToIso(date, time) {
  if (!date || !time) return null;
  const d = /* @__PURE__ */ new Date(`${date}T${time}`);
  if (isNaN(d.getTime())) return null;
  return d.toISOString();
}
function FollowUpDateTime({
  value,
  onSave,
  compact = false
}) {
  const initial = splitIso(value);
  const [date, setDate] = reactExports.useState(initial.date);
  const [time, setTime] = reactExports.useState(initial.time);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const s = splitIso(value);
    setDate(s.date);
    setTime(s.time);
    setError("");
  }, [value]);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const inputStyle = {
    width: "50%",
    border: "1.5px solid rgba(230,0,126,0.3)",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 14,
    color: "#2D0A1E",
    background: "white",
    outline: "none"
  };
  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23E6007E' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: 32
  };
  const focus = (e) => e.currentTarget.style.borderColor = "#E6007E";
  const blur = (e) => e.currentTarget.style.borderColor = "rgba(230,0,126,0.3)";
  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const value2 = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const period = h < 12 ? "AM" : "PM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const label = `${hour12}:${String(m).padStart(2, "0")} ${period}`;
      timeOptions.push({
        value: value2,
        label
      });
    }
  }
  const commit = (nd, nt) => {
    if (!nd || !nt) {
      setError("Please select both date and time for follow up");
      return;
    }
    setError("");
    onSave(combineToIso(nd, nt));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    marginTop: compact ? 8 : 12
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      fontSize: 13,
      fontWeight: 700,
      color: "#2D0A1E",
      marginBottom: 6
    }, children: "Follow Up Date & Time" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", min: today, value: date, onChange: (e) => {
        setDate(e.target.value);
        commit(e.target.value, time);
      }, style: inputStyle, onFocus: focus, onBlur: blur, "aria-label": "Follow Up Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: time, onChange: (e) => {
        setTime(e.target.value);
        commit(date, e.target.value);
      }, style: selectStyle, onFocus: focus, onBlur: blur, "aria-label": "Follow Up Time", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select time..." }),
        timeOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      color: "#C2185B",
      fontSize: 12,
      marginTop: 6
    }, children: error })
  ] });
}
const STATUS_OPTIONS = ["new", "confirmed", "follow_up", "completed", "cancelled"];
const STATUS_LABELS = {
  new: "New",
  confirmed: "Confirmed",
  follow_up: "Follow Up",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STATUS_COLORS = {
  new: {
    bg: "#DBEAFE",
    fg: "#1E40AF"
  },
  confirmed: {
    bg: "#D1FADF",
    fg: "#027A48"
  },
  follow_up: {
    bg: "#F59E0B",
    fg: "#FFFFFF"
  },
  completed: {
    bg: "#E6007E",
    fg: "#FFFFFF"
  },
  cancelled: {
    bg: "#FEE2E2",
    fg: "#991B1B"
  }
};
function formatFollowUp(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function AdminAppointmentsPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [items, setItems] = reactExports.useState([]);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [from, setFrom] = reactExports.useState("");
  const [to, setTo] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("appointments").select("*").order("created_at", {
      ascending: false
    });
    if (error) {
      ue.error("Failed to load");
      return;
    }
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    load();
    const ch = supabase.channel("appointments-admin").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "appointments"
    }, (payload) => {
      if (payload.eventType === "INSERT") {
        const row = payload.new;
        setItems((prev) => [row, ...prev.filter((p) => p.id !== row.id)]);
        ue.success(`🔔 New appointment from ${row.full_name}!`);
      } else if (payload.eventType === "UPDATE") {
        setItems((prev) => prev.map((p) => p.id === payload.new.id ? payload.new : p));
      } else if (payload.eventType === "DELETE") {
        setItems((prev) => prev.filter((p) => p.id !== payload.old.id));
      }
    }).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [isAdmin]);
  const filtered = reactExports.useMemo(() => {
    return items.filter((it) => {
      if (statusFilter !== "all" && it.status !== statusFilter) return false;
      if (from && it.preferred_date < from) return false;
      if (to && it.preferred_date > to) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!it.full_name.toLowerCase().includes(s) && !it.phone.includes(s)) return false;
      }
      return true;
    });
  }, [items, statusFilter, from, to, search]);
  const stats = reactExports.useMemo(() => ({
    total: items.length,
    new: items.filter((i) => i.status === "new").length,
    confirmed: items.filter((i) => i.status === "confirmed").length,
    completed: items.filter((i) => i.status === "completed").length
  }), [items]);
  const updateStatus = async (id, status) => {
    setBusy(true);
    const patch = {
      status
    };
    if (status !== "follow_up") patch.follow_up_at = null;
    const {
      error
    } = await supabase.from("appointments").update(patch).eq("id", id);
    setBusy(false);
    if (error) {
      ue.error("Update failed");
      return;
    }
    ue.success("Status updated");
  };
  const updateFollowUpAt = async (id, follow_up_at) => {
    const {
      error
    } = await supabase.from("appointments").update({
      follow_up_at
    }).eq("id", id);
    if (error) {
      ue.error("Save failed");
      return;
    }
    ue.success("Follow-up time saved");
  };
  const updateNotes = async (id, admin_notes) => {
    const {
      error
    } = await supabase.from("appointments").update({
      admin_notes
    }).eq("id", id);
    if (error) {
      ue.error("Save failed");
      return;
    }
    ue.success("Notes saved");
  };
  const remove = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    const {
      error
    } = await supabase.from("appointments").delete().eq("id", id);
    if (error) {
      ue.error("Delete failed");
      return;
    }
    setSelected(null);
    ue.success("Deleted");
  };
  const exportCsv = () => {
    const headers = ["Name", "Phone", "Email", "Service", "Date", "Time", "Status", "Message", "Received"];
    const rows = filtered.map((i) => [i.full_name, i.phone, i.email || "", i.service || "", i.preferred_date, i.preferred_time, i.status, (i.message || "").replace(/\n/g, " "), new Date(i.created_at).toISOString()]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  const cards = [{
    label: "Total",
    value: stats.total,
    icon: Calendar
  }, {
    label: "New",
    value: stats.new,
    icon: Inbox
  }, {
    label: "Confirmed",
    value: stats.confirmed,
    icon: Clock
  }, {
    label: "Completed",
    value: stats.completed,
    icon: CircleCheck
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Appointments", breadcrumb: "Admin / Appointments", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center", style: {
        background: "#FFE4EF",
        color: "#E6007E"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", style: {
          color: "#2D0A1E"
        }, children: c.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.label })
      ] })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "px-3 py-2 text-sm rounded-lg border bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Statuses" }),
          STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: from, onChange: (e) => setFrom(e.target.value), className: "px-3 py-2 text-sm rounded-lg border", placeholder: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: to, onChange: (e) => setTo(e.target.value), className: "px-3 py-2 text-sm rounded-lg border", placeholder: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search name or phone…", className: "w-full pl-9 pr-3 py-2 text-sm rounded-lg border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportCsv, className: "px-4 py-2 text-sm font-semibold rounded-lg text-white flex items-center gap-2", style: {
          background: "#E6007E"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          " Export CSV"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Follow Up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 9, className: "px-5 py-10 text-center text-muted-foreground", children: "No appointments found." }) }),
          filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t hover:bg-gray-50 cursor-pointer", onClick: () => setSelected(it), style: it.status === "new" ? {
            borderLeft: "4px solid #E6007E"
          } : void 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: it.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: it.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: it.service || "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: it.preferred_date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs", children: it.preferred_time }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { disabled: busy, value: it.status, onChange: (e) => updateStatus(it.id, e.target.value), className: "text-xs px-2 py-1 rounded-full border-0 font-semibold", style: {
                background: STATUS_COLORS[it.status].bg,
                color: STATUS_COLORS[it.status].fg
              }, children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s)) }),
              it.status === "follow_up" && /* @__PURE__ */ jsxRuntimeExports.jsx(FollowUpDateTime, { compact: true, value: it.follow_up_at, onSave: (iso) => updateFollowUpAt(it.id, iso) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs", children: it.follow_up_at ? formatFollowUp(it.follow_up_at) : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(it.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(it.id), className: "text-red-500 hover:text-red-700 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) }) })
          ] }, it.id))
        ] })
      ] }) })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailPanel, { appt: selected, onClose: () => setSelected(null), onUpdateStatus: updateStatus, onUpdateFollowUp: updateFollowUpAt, onSaveNotes: updateNotes, onDelete: remove })
  ] });
}
function DetailPanel({
  appt,
  onClose,
  onUpdateStatus,
  onUpdateFollowUp,
  onSaveNotes,
  onDelete
}) {
  const [notes, setNotes] = reactExports.useState(appt.admin_notes || "");
  reactExports.useEffect(() => {
    setNotes(appt.admin_notes || "");
  }, [appt.id]);
  const phoneClean = appt.phone.replace(/\D/g, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[1000]", style: {
    background: "rgba(0,0,0,0.4)"
  }, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", style: {
          color: "#2D0A1E"
        }, children: appt.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Received ",
          new Date(appt.created_at).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-1 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: appt.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: appt.email || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Service", value: appt.service || "-" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", value: appt.preferred_date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Time", value: appt.preferred_time }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Type", value: appt.consultation_type }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground mb-1", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm whitespace-pre-wrap p-3 bg-gray-50 rounded-lg", children: appt.message || "-" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground mb-1", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: appt.status, onChange: (e) => onUpdateStatus(appt.id, e.target.value), className: "w-full px-3 py-2 text-sm rounded-lg border bg-white", children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: STATUS_LABELS[s] }, s)) }),
        appt.status === "follow_up" && /* @__PURE__ */ jsxRuntimeExports.jsx(FollowUpDateTime, { value: appt.follow_up_at, onSave: (iso) => onUpdateFollowUp(appt.id, iso) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground mb-1", children: "Internal Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), rows: 4, className: "w-full px-3 py-2 text-sm rounded-lg border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onSaveNotes(appt.id, notes), className: "mt-2 px-3 py-1.5 text-xs font-semibold text-white rounded-lg", style: {
          background: "#E6007E"
        }, children: "Save Notes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${appt.phone}`, className: "flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white rounded-lg", style: {
          background: "#1BA0DC"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
          " Call"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${phoneClean}`, target: "_blank", rel: "noreferrer", className: "flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white rounded-lg", style: {
          background: "#25D366"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
          " WhatsApp"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onDelete(appt.id), className: "w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
        " Delete Appointment"
      ] })
    ] })
  ] }) });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: value })
  ] });
}
export {
  AdminAppointmentsPage as component
};
