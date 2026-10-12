import process from "node:process";
import { c as createServerRpc } from "./createServerRpc-DxDtqOaD.mjs";
import { a5 as createServerFn, a7 as notFound } from "./index.mjs";



import "../_libs/unenv.mjs";


const fetchPost_createServerFn_handler = createServerRpc({
  id: "70ca892c0ce80924f4010c4d9bd37ef380164b6ce0824155ad27f68cbcdcedd5",
  name: "fetchPost",
  filename: "src/routes/blog.$slug.tsx"
}, (opts) => fetchPost.__executeServer(opts));
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(fetchPost_createServerFn_handler, async ({
  data
}) => {
  const {
    createClient
  } = await import("./index-CZVAwXUt.mjs");
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
  const {
    data: post
  } = await sb.from("blogs").select("id,title,slug,excerpt,content,featured_image,featured_image_alt,author,category,published_at,updated_at,reading_time,meta_title,meta_description,focus_keyword").eq("slug", data.slug).eq("status", "published").maybeSingle();
  if (!post) throw notFound();
  const {
    data: related
  } = await sb.from("blogs").select("id,title,slug,excerpt,featured_image,featured_image_alt,category,published_at,reading_time").eq("status", "published").neq("id", post.id).eq("category", post.category || "").order("published_at", {
    ascending: false
  }).limit(3);
  return {
    post,
    related: related || []
  };
});
export {
  fetchPost_createServerFn_handler
};
