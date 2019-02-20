import request from '../utils/request'

export function addTag(body) {
  return request('/tags', { method: 'POST', body })
}

export function getTag() {
  return request('/tags')
}
