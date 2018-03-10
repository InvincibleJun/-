import request from "../utils/request";

export function fetchDraft(arg) {
  return request("/api/draft/get", arg);
}

export function publish(arg) {
  return request("/api/draft/publish", arg);
}

export function addDraft(body) {
  return request("/api/draft/add", { method: "POST", body });
}

export function getOneDraft(query) {
  return request("/api/draft/getOne", { query });
}

export function del(query) {
  return request("/api/draft/del", { query });
}


// export function getList()