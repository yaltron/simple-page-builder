import { W as jsxRuntimeExports } from "./index.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { c as ServicesHeadingEditor } from "./cms-editors-BXID7X_s.mjs";



import "./router-D3NQCnuk.mjs";
import "./index-CZVAwXUt.mjs";
import "./user-round-BantWQqJ.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./upload-8X_y_6jh.mjs";
import "./plus-_pcJFpCM.mjs";
import "./grip-vertical-BZ97lzFr.mjs";
import "./pencil-mCoYCDbe.mjs";
import "./trash-2-DhLuOvGs.mjs";
import "./save-DVe6ySDW.mjs";
import "./arrow-up-Bz_3TtFV.mjs";
import "./external-link-CmvYK2QO.mjs";

import "../_libs/unenv.mjs";


import "./image-upload-bZam0mLR.mjs";
import "./image-to-webp-BeTkcpEw.mjs";
import "./color-picker-BcfGrOpe.mjs";
function Page() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminShell, { title: "Services Section", breadcrumb: "Admin / Homepage / Services", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServicesHeadingEditor, {}) });
}
export {
  Page as component
};
