function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([^&\n?#]+)/);
  return m ? m[1] : null;
}
function getYouTubeEmbedUrl(url) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
function getYouTubeThumbnail(url) {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null;
}
export {
  getYouTubeThumbnail as a,
  getYouTubeEmbedUrl as g
};
