type RequestOptions = {
  headers: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
};

async function retrieve(
  method: "GET" | "POST" | "DELETE" | "PATCH" | "PUT",
  url: string,
  options?: RequestOptions,
) {
  try {
    const response = await fetch(new URL(url).href, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(options?.body),
      signal: options?.signal,
    });

    if (!response.ok)
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);

    return response.json();
  } catch (error: any) {
    console.error(error.toString());
    throw error; // rethrow error for specific handling
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
