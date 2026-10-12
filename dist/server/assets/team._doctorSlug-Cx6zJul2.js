import { c as createServerRpc } from "./createServerRpc-D_-6bKnO.js";
import { j as createServerFn, Q as notFound } from "../server.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const fetchDoctor_createServerFn_handler = createServerRpc({
  id: "1ed4365c74b148e0a90e150fe1ea2bd2792593df92c74b96fd0dc40a49e28ef8",
  name: "fetchDoctor",
  filename: "src/routes/team.$doctorSlug.tsx"
}, (opts) => fetchDoctor.__executeServer(opts));
const fetchDoctor = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(fetchDoctor_createServerFn_handler, async ({
  data
}) => {
  const {
    createClient
  } = await import("./index-Dn3DJaKR.js");
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  const {
    data: doctor
  } = await sb.from("doctors").select("*").eq("slug", data.slug).eq("status", "published").maybeSingle();
  if (!doctor) throw notFound();
  return doctor;
});
export {
  fetchDoctor_createServerFn_handler
};
