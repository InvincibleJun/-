import request from "../utils/request";

export function addTag(body) {
  return request("/v1/tag/add", { method: "POST", body });
}

export function getTag() {
  return request("/v1/tag/getList");
}