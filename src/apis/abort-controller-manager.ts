import { z } from "zod";

const ABORT_CONTROLLER_MAP = new Map<string, Set<AbortController>>();
const ACTIVE_TRACK_KEYS: Set<string> = new Set(); // APIs fired for the page where the user navigates to

// track a new abort controller
export function track(
  controller: AbortController,
  apiUrl: string,
  body?: object | string,
) {
  const trackKey = extractTrackKey(apiUrl, body);
  if (trackKey === null) return;
  // abort previous ongoing requests to avoid outdated response data
  abortByApiUrl(apiUrl, body);

  ABORT_CONTROLLER_MAP.set(trackKey, new Set([controller]));
  ACTIVE_TRACK_KEYS.add(trackKey);
}

// abort all requests
export function abortAll() {
  ACTIVE_TRACK_KEYS.forEach((key) => {
    if (ABORT_CONTROLLER_MAP.has(key)) {
      const controllerSet = ABORT_CONTROLLER_MAP.get(key);
      controllerSet?.forEach((c) => c.abort());
    }
  });

  ACTIVE_TRACK_KEYS.clear();
  ABORT_CONTROLLER_MAP.clear();
}

// abort request by API URL
export function abortByApiUrl(apiUrl: string, body?: object | string) {
  const trackKey = extractTrackKey(apiUrl, body);
  if (trackKey === null || !ABORT_CONTROLLER_MAP.has(trackKey)) return;

  const controllerSet = ABORT_CONTROLLER_MAP.get(trackKey);
  controllerSet?.forEach((c) => c.abort());

  ABORT_CONTROLLER_MAP.delete(trackKey);
  ACTIVE_TRACK_KEYS.delete(trackKey);
}

export const __private_fns__ = {
  extractTrackKey,
  sortObject,
};

export const __private_data__ = {
  test_map: ABORT_CONTROLLER_MAP,
  test_keys: ACTIVE_TRACK_KEYS,
};

// extract track key from API URL
// track key = pathname + hashes + search params + (body)
// eg 'path/#hash?search=123{data:"abc"}'
// body is included because POST requests may have the same API URL but with different body data
function extractTrackKey(apiUrl: string, body?: object | FormData | string) {
  const result = z.httpUrl().safeParse(apiUrl);
  if (!result.success) {
    z.prettifyError(result.error);
    return null;
  }

  const parsedUrl = new URL(apiUrl);
  let trackKey = parsedUrl.href.replace(parsedUrl.origin, "");

  if (typeof body === "string") {
    trackKey += body;
  }

  if (body instanceof FormData || typeof body === "object") {
    trackKey += JSON.stringify(sortObject(body));
  }

  return trackKey;
}

function sortObject(object: { [key: string]: any }): object {
  // FormData
  if (object instanceof FormData) {
    const tempObj: { [key: string]: any } = {};
    for (const key of object.keys()) {
      tempObj[key] = object.get(key);
    }

    return sortObject(tempObj);
  }

  // Array
  if (Array.isArray(object)) {
    return object.map(sortObject);
  }

  // regular object
  if (typeof object === "object" && object.constructor === Object) {
    return Object.keys(object)
      .sort()
      .reduce((obj: { [key: string]: any }, key) => {
        obj[key] = sortObject(object[key]);
        return obj;
      }, {});
  }

  return object;
}
