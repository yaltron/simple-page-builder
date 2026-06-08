import { M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-Ce2DoEvQ.js";
import { c as WhoWeAreEditor } from "./cms-editors-D5JV30z0.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./router-4B5-JGly.js";
import "./index-Dn3DJaKR.js";
import "./logo-mJLYSy2R.js";
import "./user-round-fnYlCX4m.js";
import "./file-text-BJ6E_L4F.js";
import "./stethoscope-Dg79Wn2h.js";
import "./briefcase-CL4WmvrV.js";
import "./image-upload-BOdsd7gT.js";
import "./image-to-webp-BeTkcpEw.js";
import "./upload-DroGKuN0.js";
import "./plus-DZCCIbCT.js";
import "./save-4q9bzKMH.js";
import "./pencil-CVrspOTf.js";
import "./trash-2-Duwar6QF.js";
import "./external-link-ydgjgwiV.js";
import "./arrow-up-Dgr8uSBS.js";
function Page() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { title: "Who We Are", breadcrumb: "Admin / Homepage / Who We Are", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WhoWeAreEditor, {}) });
}
export {
  Page as component
};
