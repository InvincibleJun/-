// import { stringify } from "qs";
import request from '../utils/request'

export async function getDraft ({ query }) {
  return request('/v1/draft/get', {
    query
  })
}

export async function postDraft ({ query }) {
  return request('/v1/draft/post', {
    query
  })
}

export async function getUserInfo () {
  return request('/v1/user/get')
}
