import { getUserInfo } from '../services/api'
import { loginUser, loginUserGithubService } from '../services/user'

export const fetchUserInfo = () => dispatch =>
  getUserInfo().then(res => {
    dispatch(saveUser({ a: 1 }))
  })

export const saveUser = data => ({ type: 'USER_LOAD', data })

export const get = data => ({ type: 'USER', data })

export const login = data => ({ type: 'USER_LOGIN', data })

export const fetchLogin = args => dispatch =>
  loginUser(args).then(data => {
    dispatch(login(data))
    return data
  })

export const userGitHubLogin = args => dispatch =>
  loginUserGithubService(args).then(data => {
    dispatch(login(data))
    return data
  })
