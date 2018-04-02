import request from "../utils/request";

export function uploadImage(body) {
  return request("/v1/draft/upload", { method: "POST", body, processData: false })
}

export function fetchDraft(arg) {
  return request("/v1/draft/get", arg);
}

export function publish(arg) {
  return request("/v1/draft/publish", arg);
}

export function addDraft(body) {
  return request("/v1/draft/add", { method: "POST", body });
}

export function getOneDraft(query) {
  return request("/v1/draft/getOne", { query });
}

export function del(query) {
  return request("/v1/draft/del", { query });
}


// export function getList()