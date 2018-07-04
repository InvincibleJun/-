import { getList, addArticle, getOneArticle } from '../services/article'

// export const addArticle = data => ({type: 'ADD_ARTICLE', data});

export const fetchGetList = arg => {
  return dispatch => {
    dispatch({ type: 'SAVE_ARTICLE_LIST_START' })
    getList(arg).then(data => {
      dispatch({ type: 'SAVE_ARTICLE_LIST', data })
    })
  }
}

export const fetchAddArticle = arg => {
  return dispatch => {
    addArticle(arg).then(data => {
      if (!arg._id) {
        dispatch({ type: 'CREATE_ARTICLE', data })
      } else {
        dispatch({ type: 'UPDATE_ARTICLE', data })
      }
    })
  }
}

export const fetchOneArticle = arg => {
  return dispatch => {
    getOneArticle(arg).then(res => {
      dispatch(updateArticleOne(res))
    })
  }
}

export const openArticle = (_id, active) => {
  return dispatch => {
    dispatch(changeActive(active))
    if (!active || !active.loaded) {
      // deg
      dispatch(fetchOneArticle({ _id }))
    }
  }
}

export const changeActive = data => ({ type: 'CHANG_ACTIVE', data })

const updateArticleOne = data => ({ type: 'UPDTAE_ARTICLE_ONE', data })
