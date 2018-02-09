import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { user } from "./models/user";
import draft from "./models/draft";

const rootReudcers = combineReducers({
  user,
  draft
});

export default createStore(rootReudcers, applyMiddleware(thunkMiddleware));
