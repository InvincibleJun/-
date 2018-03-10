import request from "../utils/request";

export function getList(query) {
  return request("/api/article/getList", { query });
}

export function delArticle(body) {
  return request("/api/article/del", { method: 'POST', body })
}