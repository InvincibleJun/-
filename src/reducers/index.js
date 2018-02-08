import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { user } from "./models/user";

const rootReudcers = combineReducers({
  user
});

export default createStore(rootReudcers, applyMiddleware(thunkMiddleware));
