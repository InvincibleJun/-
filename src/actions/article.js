import {
  getList,
  addArticle,
  editArticle,
  getOneArticle,
  deleteArticle,
  publishArticle
} from '../services/article'

// export const addArticle = data => ({type: 'ADD_ARTICLE', data});

export const fetchGetList = arg => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: 'SAVE_ARTICLE_LIST_START' })
      getList(arg)
        .then(data => {
          dispatch({ type: 'SAVE_ARTICLE_LIST', data })
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export const fetchAddArticle = arg => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (arg._id) {
        editArticle(arg, arg._id)
          .then(data => {
            dispatch({ type: 'UPDATE_ARTICLE', data })
            resolve(data)
          })
          .catch(e => {
            reject(e)
          })
      } else {
        addArticle(arg)
          .then(data => {
            dispatch({ type: 'CREATE_ARTICLE', data })
            resolve(data)
          })
          .catch(e => {
            reject(e)
          })
      }
    })
  }
}

export const fetchdeleteArticle = _id => {
  return dispatch =>
    deleteArticle(_id).then(res => {
      dispatch({ type: 'DELETE_ARTICLE', data: _id })
    })
}

// export const fetchOneArticle = arg => {
//   return dispatch => {
//     getOneArticle(arg).then(res => {
//       // dispatch(updateArticleOne(res))
//     })
//   }
// }

export const openArticle = _id => {
  return dispatch => {
    getOneArticle(_id).then(data => {
      dispatch({ type: 'FILL_ACTIVE', data })
    })
  }
}

export const changeActive = data => ({ type: 'CHANGE_ACTIVE', data })

export const fetchPublishArticle = _id => {
  return dispatch => publishArticle(_id)
}
// const updateArticleOne = data => ({ type: 'UPDTAE_ARTICLE_ONE', data })
