const initState = {
  fetching: false,
  data: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_DRAFT_DATA':
      return { ...state, data: action.data }
    default:
      return state
  }
}
