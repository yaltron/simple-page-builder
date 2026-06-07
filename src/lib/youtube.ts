/**
 * Convert any common YouTube URL form into a safe embed URL.
 * Returns null when the input is empty or unparseable, and returns the
 * original string for non-YouTube URLs (e.g. Vimeo) so callers can fall back.
 */
export function toYouTubeEmbed(url: string | null | undefined): string | null {
  if (!url) return null
  const patterns = [
    /youtube\.com\/watch\?v=([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`
  }
  return url
}
