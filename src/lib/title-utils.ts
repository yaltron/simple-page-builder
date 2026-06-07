/**
 * Normalize em/en dashes (and their HTML entities) to a regular hyphen so
 * dynamic CMS-supplied strings render consistently in page titles and meta.
 */
export function dashesToHyphen(s: string | null | undefined): string {
  if (!s) return ""
  return s
    .replace(/&mdash;/g, "-")
    .replace(/&ndash;/g, "-")
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/\s+-\s+/g, " - ")
}
