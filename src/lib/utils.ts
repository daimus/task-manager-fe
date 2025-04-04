import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AxiosRequestConfig} from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseApiErrors(response) {
  if (!response.errors || !Array.isArray(response.errors)) {
    return ["Unknown error"];
  }
  return response.errors.map(error => error.message);
}

export function createAxiosConfig(token: string | null = null){
  let config : AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
  }
  if (!!token){
    config = {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      },
    }
  }
  return config;
}