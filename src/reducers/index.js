import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { user } from './models/user'
import { tag } from './models/tag'
import draft from './models/draft'
import article from './models/article'

const rootReudcers = combineReducers({
  user,
  tag,
  draft,
  article
})

export default createStore(rootReudcers, applyMiddleware(thunkMiddleware))
