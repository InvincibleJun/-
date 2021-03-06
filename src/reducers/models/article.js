const initState = {
  loaded: false,
  loading: false,
  active: null,
  list: []
}

export default (state = initState, action) => {
  // 加载list相关
  if (action.type === 'SAVE_ARTICLE_LIST') {
    return { ...state, list: action.data, loaded: true, loading: false }
  } else if (action.type === 'SAVE_ARTICLE_LIST_START') {
    return { ...state, loading: true }
    // 创建
  } else if (action.type === 'CREATE_ARTICLE') {
    Object.assign(action.data, { loaded: true })
    state.list.unshift(action.data)
    console.log(state.list)
    return { ...state, list: state.list }
    // 更新
  } else if (action.type === 'UPDATE_ARTICLE') {
    Object.assign(action.data, { loaded: true })
    const { _id } = action.data
    return {
      ...state,
      list: state.list.map(item => (item._id === _id ? action.data : item))
    }
    // 当前激活区域
  } else if (action.type === 'CHANGE_ACTIVE') {
    return {
      ...state,
      active:
        action.data === 'new'
          ? 'new'
          : state.list.find(val => val._id === action.data)
    }
    // 填充当前文章数据
  } else if (action.type === 'FILL_ACTIVE') {
    return {
      ...state,
      active: { ...state.active, ...action.data, loaded: true }
    }
  } else if (action.type === 'DELETE_ARTICLE') {
    const isActive = state.active._id === action.data
    return {
      ...state,
      active: isActive ? null : state.active,
      list: state.list.filter(item => item._id !== action.data)
    }
  } else {
    return state
  }
}

// export default (state = initState, action) => {
//   if (action.type === 'SAVE_ARTICLE_LIST') {
//     return { ...state, list: action.data }
//   } else if (action.type === 'UPDTAE_ARTICLE_ONE') {
//     const { _id } = action.data
//     let art = state.list.find(val => val._id === _id)
//     action.data.loaded = true
//     if (!art) {
//       state.list.unshift(action.data)
//     } else {
//       Object.assign(art, action.data)
//     }
//     state.active = art || action.data
//     return { ...state }
//   } else if (action.type === 'CHANG_ACTIVE') {
//     if (action.data !== 'new') {
//       let art = state.list.find(val => val._id === action.data)
//       state.active = art
//     }
//     return { ...state }
//   } else {
//     return state
//   }
// }
