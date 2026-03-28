// lib/utils.ts — Utility helpers
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateScrapeId(): string {
  return 'SCT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
