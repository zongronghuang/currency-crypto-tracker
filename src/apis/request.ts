import { track, abortByApiUrl } from "./abort-controller-manager";

type RequestOptions = {
  headers: HeadersInit;
  body?: object | string;
};

async function retrieve(
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT",
  url: string,
  options?: RequestOptions,
) {
  try {
    const controller = new AbortController();
    track(controller, url, options?.body);

    const response = await fetch(new URL(url).href, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(options?.body),
      signal: controller.signal,
    });

    if (!response.ok)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    return response.json();
  } catch (error: any) {
    if (error.name === "AbortError") return console.log(`[Aborted] ${url}`);

    abortByApiUrl(url);
    throw error; // rethrow error for custom handling
  }
}

export const request = {
  GET: (url: string, options?: RequestOptions) => retrieve("GET", url, options),
  POST: (url: string, options?: RequestOptions) =>
    retrieve("POST", url, options),
  DELETE: (url: string, options?: RequestOptions) =>
    retrieve("DELETE", url, options),
  PATCH: (url: string, options?: RequestOptions) =>
    retrieve("PATCH", url, options),
  PUT: (url: string, options?: RequestOptions) => retrieve("PUT", url, options),
};
