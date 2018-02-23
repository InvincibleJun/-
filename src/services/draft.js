import request from "../utils/request";

export function fetchDraft(arg) {
  return request("/api/draft/get", arg);
}

export function publish(arg) {
  return request("/api/draft/publish", arg);
}
