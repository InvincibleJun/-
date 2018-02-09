const data = {
  loading: false,
  userinfo: null
};

export const user = (state = data, action) => {
  if (action.type === "USER_LOAD") {
    return Object.assign({}, state, {
      userinfo: action.data
    });
  } else {
    return data;
  }
};
