/**
 * Estimates reading time for a given HTML or text content.
 * Assumes average reading speed of 200 words per minute.
 */
export function readingTime(content: string): string {
  if (!content) return "1 min read";
  // Strip HTML tags
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, " ");
  // Count words
  const words = cleanText.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Formats a date string or Date object into a premium, human-readable format.
 * Example: "2026-07-02" -> "July 2, 2026"
 */
export function formatDate(date: string | Date): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
}

/**
 * Standardizes titles or heading texts into URL-friendly slugs.
 * Example: "AI-Powered Diagnostics: Reimagining!" -> "ai-powered-diagnostics-reimagining"
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w\-]+/g, "")       // Remove all non-word chars
    .replace(/\-\-+/g, "-")         // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start of text
    .replace(/-+$/, "");            // Trim - from end of text
}
