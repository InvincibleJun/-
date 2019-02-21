import request from '../utils/request'

export function getList(query) {
  return request('/articles', { query })
}

export function delArticle(body) {
  return request('/article/del', { method: 'POST', body })
}

export function addArticle(body) {
  return request('/articles', { method: 'POST', body })
}

export function editArticle(body, id) {
  return request(`/articles/${id}`, { method: 'PUT', body })
}

export function getOneArticle(id) {
  return request(`/articles/${id}`)
}

export function uploadImage(body) {
  return request('/articles/image', {
    method: 'POST',
    body,
    processData: false
  })
}

export function deleteArticle(id) {
  return request(`/articles/${id}`, {
    method: 'DELETE',
    processData: false
  })
}

export function publishArticle(id) {
  return request(`/articles/${id}/1`, {
    method: 'PUT'
  })
}
