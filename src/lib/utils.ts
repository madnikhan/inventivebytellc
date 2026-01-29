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

  // YouTube: normalize to watch URL (react-player supports all, but watch is most reliable)
  const ytMatch =
    trimmed.match(/^(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/) ||
    trimmed.match(/^(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    trimmed.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/) ||
    trimmed.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/watch?v=${ytMatch[1]}`;
  }

  return trimmed;
}
