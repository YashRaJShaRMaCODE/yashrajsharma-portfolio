import { getLeadHubOrigin } from "./leadhub-origin.mjs";

export async function getRelatedProducts(baseUrl, project, consent, fetcher = fetch) {
  const origin = getLeadHubOrigin(baseUrl);
  if (!consent || !origin) return [];
  const response = await fetcher(`${origin}/api/recommendations?project=${encodeURIComponent(project)}&consent=true`);
  if (!response.ok) throw new Error("Suggestions unavailable");
  const result = await response.json();
  return (Array.isArray(result.items) ? result.items : []).filter((item) => {
    if (typeof item?.name !== "string" || typeof item?.reason !== "string" || typeof item?.url !== "string") return false;
    try {
      const url = new URL(item.url);
      return url.protocol === "https:" && !url.username && !url.password && url.hostname !== "example.com" && !url.hostname.endsWith(".example.com");
    } catch {
      return false;
    }
  });
}
