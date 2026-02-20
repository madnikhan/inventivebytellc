import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Normalize YouTube/video URLs so react-player can play them reliably. */
export function normalizeVideoUrl(url: string | undefined): string | undefined {
  if (!url || typeof url !== "string") return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;

  // Ensure protocol for URLs that look like YouTube but lack it
  let input = trimmed;
  if (/^youtube\.com|^youtu\.be|^www\.youtube/.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    input = `https://${trimmed.replace(/^\/+/, "")}`;
  }

  // YouTube: normalize to watch URL (react-player supports all, but watch is most reliable)
  const ytMatch =
    input.match(/^(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/) ||
    input.match(/^(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    input.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/) ||
    input.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
  }

  return input;
}

/** Strip markdown to plain text for previews (e.g. card excerpts). */
export function stripMarkdown(md: string | undefined): string {
  if (!md || typeof md !== "string") return "";
  return md
    .replace(/^#{1,6}\s+/gm, "") // headings
    .replace(/\*\*(.+?)\*\*/g, "$1") // bold
    .replace(/\*(.+?)\*/g, "$1") // italic
    .replace(/__(.+?)__/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/^[-*+]\s+/gm, "") // list bullets
    .replace(/^\d+\.\s+/gm, "") // numbered lists
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/^>\s+/gm, "") // blockquote
    .replace(/\n{2,}/g, " ") // collapse newlines
    .trim();
}

/** True if URL is a direct video file (e.g. Sanity CDN, .mp4, .webm). Use native <video> for these. */
export function isDirectVideoUrl(url: string | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const u = url.trim().toLowerCase();
  return (
    u.includes("cdn.sanity.io/files") ||
    /\.(mp4|webm|ogg|mov)(\?|$)/i.test(u) ||
    u.startsWith("blob:")
  );
}
