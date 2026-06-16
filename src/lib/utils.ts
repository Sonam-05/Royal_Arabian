import { urlFor } from "./sanity";

/**
 * Gets a renderable image URL from a Sanity image source or string fallback
 */
export function getImageUrl(source: any): string {
  if (!source) return "/placeholder.jpg";
  if (typeof source === "string") return source;
  
  if (source && (source.asset || source._ref)) {
    try {
      const url = urlFor(source).url();
      if (url) return url;
    } catch (e) {
      console.warn("Error building image URL from Sanity:", e);
    }
  }
  
  return "/placeholder.jpg";
}

/**
 * Formats a number to AED price format
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
