// lib/api.ts

// import { cookies } from "next/headers";

/**
 * Base API URL
 */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(">>>>>>>>>>NEXT_PUBLIC_API_URL>", process.env.NEXT_PUBLIC_API_URL);
if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/**
 * Custom error for API failures
 */
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

/**
 * Request options
 */
type ApiOptions = RequestInit & {
  timeout?: number;
  auth?: boolean; // include token automatically
  next?: { revalidate?: number; tags?: string[] }; // Next.js caching
};

/**
 * Get auth token (server-safe)
 */
// async function getAuthToken() {
//   try {
//     const cookieStore = await cookies();
//     return cookieStore.get("token")?.value;
//   } catch {
//     // fallback for client-side usage
//     if (typeof window !== "undefined") {
//       return localStorage.getItem("token");
//     }
//   }
// }

/**
 * Timeout wrapper
 */
function fetchWithTimeout(url: string, options: RequestInit, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => clearTimeout(id));
}

/**
 * Main API fetch function
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { timeout = 10000, auth = true, headers, ...rest } = options;

  let token: string | undefined;

  //   if (auth) {
  //     token = await getAuthToken();
  //   }

  const res = await fetchWithTimeout(
    `${BASE_URL}${endpoint}`,
    {
      // credentials: "include",
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    },
    timeout,
  );

  // Handle empty response
  if (res.status === 204) return null as T;

  let data: unknown;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(
      (data as any)?.message || "Request failed",
      res.status,
      data,
    );
  }

  return data as T;
}

/**
 * Cleaner HTTP helpers
 */
export const api = {
  get: <T>(url: string, options?: ApiOptions) =>
    apiFetch<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body?: unknown, options?: ApiOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown, options?: ApiOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown, options?: ApiOptions) =>
    apiFetch<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: ApiOptions) =>
    apiFetch<T>(url, { ...options, method: "DELETE" }),
};
