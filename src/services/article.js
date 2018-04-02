import request from "../utils/request";

export function getList(query) {
  return request("/v1/article/getList", { query });
}

export function delArticle(body) {
  return request("/v1/article/del", { method: 'POST', body })
}
