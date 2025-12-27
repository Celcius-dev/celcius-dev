export const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http") || path.startsWith("https")) {
    return path;
  }
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  return `${backendUrl}${path}`;
};
