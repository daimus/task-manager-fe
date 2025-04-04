import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseApiErrors(response) {
  if (!response.errors || !Array.isArray(response.errors)) {
    return ["Unknown error"];
  }
  return response.errors.map(error => error.message);
}