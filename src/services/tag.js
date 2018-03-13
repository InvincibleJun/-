import request from "../utils/request";

export function addTag(body) {
  return request("/api/tag/add", { method: "POST", body });
}

export function getTag() {
  return request("/api/tag/getList");
}