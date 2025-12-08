// Helper to get correct asset path for both development and production (GitHub Pages)
export const getAssetPath = (path: string): string => {
  const basePath = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}${cleanPath}`;
};
