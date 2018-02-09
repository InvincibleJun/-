import { getUserInfo } from "../services/api";

export const fetchUserInfo = () => {
  return function(dispatch) {
    return getUserInfo().then(res => {
      dispatch(saveUser({ a: 1 }));
    });
  };
};

export const saveUser = data => ({ type: "USER_LOAD", data });

export const get = data => ({ type: "USER", data });
