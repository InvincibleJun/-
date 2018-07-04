import request from '../utils/request'

export function getList(query) {
  return request('/v1/article/getList', { query })
}

export function delArticle(body) {
  return request('/v1/article/del', { method: 'POST', body })
}

export function addArticle(body) {
  return request('/v1/article/add', { method: 'POST', body })
}

export function getOneArticle(query) {
  return request('/v1/article/getOne', { query })
}
