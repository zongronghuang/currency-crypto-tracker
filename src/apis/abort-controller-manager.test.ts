import { describe } from "vitest";
import {
  __private_fns__,
  __private_data__,
  abortAll,
  abortByApiUrl,
  track,
} from "./abort-controller-manager";

afterEach(() => {
  const { test_map, test_keys } = __private_data__;
  test_keys.clear();
  test_map.clear();
});

test("dedup abort controller for same API URLs without body data", () => {
  const { test_map, test_keys } = __private_data__;

  const controller1 = new AbortController();
  const apiUrl1 = "http://example.com/path/#hash?search1=1&search2=2";
  track(controller1, apiUrl1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const apiUrl2 = apiUrl1;
  track(controller2, apiUrl2);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);
});

test("tracks multiple abort controller for different API URLs without body data", () => {
  const { test_map, test_keys } = __private_data__;

  const controller1 = new AbortController();
  const apiUrl1 = "http://example.com/path/#hash?search1=1&search2=2";
  track(controller1, apiUrl1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  // path difference
  const controller2 = new AbortController();
  const apiUrl2 = "http://example.com/pathpath/#hash?search1=1&search2=2";
  track(controller2, apiUrl2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);

  // hash difference
  const controller3 = new AbortController();
  const apiUrl3 = "http://example.com/pathpath/#hashhash?search1=1&search2=2";
  track(controller3, apiUrl3);
  expect(test_map.size).toBe(3);
  expect(test_keys.size).toBe(3);

  // search param difference
  const controller4 = new AbortController();
  const apiUrl4 = "http://example.com/pathpath/#hash?search1=1&search2=0";
  track(controller4, apiUrl4);
  expect(test_map.size).toBe(4);
  expect(test_keys.size).toBe(4);
});

// test with body data

test("abort all API requests and remove all abort controllers", () => {
  const { test_map, test_keys } = __private_data__;

  const controller1 = new AbortController();
  const apiUrl1 = "http://example.com/path/#hash?search1=1&search2=2";
  track(controller1, apiUrl1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const apiUrl2 = "http://example.com/pathpath/#hash?search1=1&search2=2";
  track(controller2, apiUrl2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);

  abortAll();
  expect(test_map.size).toBe(0);
  expect(test_keys.size).toBe(0);
});

test("abort API requests by API URL without body data", () => {
  const { test_map, test_keys } = __private_data__;

  const controller1 = new AbortController();
  const apiUrl1 = "http://example.com/path/#hash?search1=1&search2=2";
  track(controller1, apiUrl1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const apiUrl2 = "http://example.com/pathpath/#hash?search1=1&search2=2";
  track(controller2, apiUrl2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);

  abortByApiUrl(apiUrl1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const deletedTrackKey = "/path/#hash?search1=1&search2=2";
  expect(test_map.has(deletedTrackKey)).toBe(false);
  expect(test_map.get(deletedTrackKey)).toBeUndefined();
  expect(test_keys.has(deletedTrackKey)).toBe(false);

  const remainingTrackKey = "/pathpath/#hash?search1=1&search2=2";
  expect(test_map.has(remainingTrackKey)).toBe(true);
  expect(test_map.get(remainingTrackKey)).toBeInstanceOf(Set);
  expect(test_keys.has(remainingTrackKey)).toBe(true);
});

test("track same API requests with different regular object data in body", () => {
  const { test_map, test_keys } = __private_data__;

  const apiUrl = "http://example.com/path";
  const controller1 = new AbortController();
  const body1 = {
    time: "time1",
  };
  track(controller1, apiUrl, body1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const body2 = {
    time: "time2",
  };
  track(controller2, apiUrl, body2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);
});

test("track same API requests with different arrays in body", () => {
  const { test_map, test_keys } = __private_data__;

  const apiUrl = "http://example.com/path";
  const controller1 = new AbortController();
  const body1 = [1, 2, 3];
  track(controller1, apiUrl, body1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const body2 = [3, 2, 1];
  track(controller2, apiUrl, body2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);
});

test("track same API requests with different strings in body", () => {
  const { test_map, test_keys } = __private_data__;

  const apiUrl = "http://example.com/path";
  const controller1 = new AbortController();
  const body1 = "body1";
  track(controller1, apiUrl, body1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const body2 = "body2";
  track(controller2, apiUrl, body2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);
});

test("track same API requests with different FormData in body", () => {
  const { test_map, test_keys } = __private_data__;

  const apiUrl = "http://example.com/path";
  const controller1 = new AbortController();
  const fd1 = new FormData();
  fd1.append("fd", "fd1");
  const body1 = fd1;
  track(controller1, apiUrl, body1);
  expect(test_map.size).toBe(1);
  expect(test_keys.size).toBe(1);

  const controller2 = new AbortController();
  const fd2 = new FormData();
  fd1.append("fd", "fd2");
  const body2 = fd2;
  track(controller2, apiUrl, body2);
  expect(test_map.size).toBe(2);
  expect(test_keys.size).toBe(2);
});

describe("__private_fns__", () => {
  test("extractTrackKey(apiUrl)", () => {
    const { extractTrackKey } = __private_fns__;

    const apiUrl = "http://example.com/path/#hash?search1=1&search2=2";

    const trackKey = extractTrackKey(apiUrl);
    expect(trackKey).toBe("/path/#hash?search1=1&search2=2");
  });

  test("extractTrackKey(apiUrl, string)", () => {
    const { extractTrackKey } = __private_fns__;

    const apiUrl = "http://example.com/path/#hash?search1=1&search2=2";
    const body = "body";

    const trackKey = extractTrackKey(apiUrl, body);
    expect(trackKey).toBe("/path/#hash?search1=1&search2=2body");
  });

  test("extractTrackKey(apiUrl, object)", () => {
    const { extractTrackKey } = __private_fns__;

    const apiUrl = "http://example.com/path/#hash?search1=1&search2=2";
    const body = { body: "body" };

    const trackKey = extractTrackKey(apiUrl, body);
    expect(trackKey).toBe(
      "/path/#hash?search1=1&search2=2" + JSON.stringify(body),
    );
  });

  test("extractTrackKey(apiUrl, array)", () => {
    const { extractTrackKey } = __private_fns__;

    const apiUrl = "http://example.com/path/#hash?search1=1&search2=2";
    const body = [1, 2, 3];

    const trackKey = extractTrackKey(apiUrl, body);
    expect(trackKey).toBe(
      "/path/#hash?search1=1&search2=2" + JSON.stringify(body),
    );
  });

  test("extractTrackKey(apiUrl, formData)", () => {
    const { extractTrackKey } = __private_fns__;

    const apiUrl = "http://example.com/path/#hash?search1=1&search2=2";
    const fd = new FormData();
    fd.append("1", "1");
    fd.append("2", "2");
    const body = fd;

    const trackKey = extractTrackKey(apiUrl, body);
    expect(trackKey).toBe(
      "/path/#hash?search1=1&search2=2" + JSON.stringify({ 1: "1", 2: "2" }),
    );
  });

  test("sortObject(array)", () => {
    const { sortObject } = __private_fns__;

    const result1 = JSON.stringify(sortObject([1, 2, 3]));
    const result2 = JSON.stringify(sortObject([3, 2, 1]));
    expect(result1).toBe("[1,2,3]");
    expect(result2).toBe("[3,2,1]");
    expect(result1).not.toBe(result2);
  });

  test("sortObject(object)", () => {
    const { sortObject } = __private_fns__;

    const result1 = JSON.stringify(sortObject({ a: 1, b: 2 }));
    const result2 = JSON.stringify(sortObject({ b: 2, a: 1 }));
    expect(result1).toBe('{"a":1,"b":2}');
    expect(result2).toBe('{"a":1,"b":2}');
    expect(result1).toBe(result2);
  });

  test("sortObject(formData)", () => {
    const { sortObject } = __private_fns__;

    const fd1 = new FormData();
    fd1.append("a", "1");
    fd1.append("b", "2");

    const fd2 = new FormData();
    fd2.append("b", "2");
    fd2.append("a", "1");

    const result1 = JSON.stringify(sortObject(fd1));
    const result2 = JSON.stringify(sortObject(fd2));
    expect(result1).toBe('{"a":"1","b":"2"}');
    expect(result2).toBe('{"a":"1","b":"2"}');
    expect(result1).toBe(result2);
  });

  test("sortObject(complex object)", () => {
    const { sortObject } = __private_fns__;

    const obj1 = {
      z: "z",
      a: "a",
      arr: [
        { 4: 4, 3: 3 },
        { 1: 1, 2: 2 },
      ],
      obj: {
        x: [1, 2, 3],
        y: [3, 2, 1],
      },
    };

    const obj2 = {
      a: "a",
      arr: [
        { 3: 3, 4: 4 },
        { 1: 1, 2: 2 },
      ],
      obj: {
        x: [1, 2, 3],
        y: [3, 2, 1],
      },
      z: "z",
    };

    const result1 = JSON.stringify(sortObject(obj1));
    expect(result1).toBe(JSON.stringify(obj2));
  });
});
