const data = {
  loading: false,
  list: []
}

export const tag = (state = data, action) => {
  if (action.type === 'SAVE_TAG_DATA') {
    return { ...state, list: action.data }
  } else {
    return state
  }
}
