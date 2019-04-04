import request from '../utils/request'

export function loginUser(body) {
  return request('/user/login', { method: 'POST', body })
}

export function signout() {
  return request('/tags')
}

export function loginUserGithubService(body) {
  return request('/user/github', { method: 'POST', body })
}
