import { X as reactExports } from "../server.js";
import { t as supabase } from "./router-BvFo6ij6.js";
const homepageCache = {};
const aboutCache = {};
function useHomepageSection(section, defaults) {
  const [data, setData] = reactExports.useState(homepageCache[section] ?? defaults);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: row } = await supabase.from("homepage_content").select("content").eq("section", section).maybeSingle();
      if (cancelled) return;
      if (row?.content) {
        const merged = { ...defaults, ...row.content };
        homepageCache[section] = merged;
        setData(merged);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [section]);
  return data;
}
function useAboutSection(section, defaults) {
  const [data, setData] = reactExports.useState(aboutCache[section] ?? defaults);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: row } = await supabase.from("about_content").select("content").eq("section", section).maybeSingle();
      if (cancelled) return;
      if (row?.content) {
        const merged = { ...defaults, ...row.content };
        aboutCache[section] = merged;
        setData(merged);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [section]);
  return data;
}
export {
  useHomepageSection as a,
  useAboutSection as u
};
