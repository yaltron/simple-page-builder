import { supabase } from "@/integrations/supabase/client"

/**
 * Safely fetch a single site_settings row's `value` JSON, merged onto defaults.
 * Returns the defaults if:
 *  - the row is missing
 *  - the value is null/not an object
 *  - the network/RLS query throws
 *
 * This guarantees consumers never crash on empty/malformed settings.
 */
export async function fetchSettings<T extends Record<string, any>>(
  key: string,
  defaults: T,
): Promise<T> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle()
    if (error) return { ...defaults }
    const v = data?.value
    if (!v || typeof v !== "object" || Array.isArray(v)) return { ...defaults }
    return { ...defaults, ...(v as Record<string, any>) } as T
  } catch {
    return { ...defaults }
  }
}
