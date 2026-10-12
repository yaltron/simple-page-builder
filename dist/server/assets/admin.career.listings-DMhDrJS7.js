import { M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-BL4u9tSP.js";
import { J as JobListings } from "./cms-editors-D8LgsjNd.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./router-BvFo6ij6.js";
import "./index-Dn3DJaKR.js";
import "./user-round-Bj-qJepX.js";
import "./file-text-UddeTg2U.js";
import "./stethoscope-DDFrHJkj.js";
import "./briefcase-B6s7EvLN.js";
import "./image-upload-M-0_XqF9.js";
import "./image-to-webp-BeTkcpEw.js";
import "./upload-Cl4Q6rBm.js";
import "./color-picker-CW1j_8Gk.js";
import "./plus-txrYVvu7.js";
import "./grip-vertical-5YpQjzkI.js";
import "./pencil-kM0J4_v-.js";
import "./trash-2-BamfwLcJ.js";
import "./save-Qlm-pCq7.js";
import "./arrow-up-CQuBkeJa.js";
import "./external-link-hNnu8za2.js";
function Page() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { title: "Job Listings", breadcrumb: "Admin / Career / Job Listings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JobListings, {}) });
}
export {
  Page as component
};
