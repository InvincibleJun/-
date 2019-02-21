import { getTag, addTag } from '../services/tag'

const saveTagData = data => ({ type: 'SAVE_TAG_DATA', data })

export const fetchTagsData = arg => {
  return dispatch => {
    getTag(arg).then(res => {
      dispatch(saveTagData(res))
    })
  }
}

const addTagById = data => ({ type: 'ADD_TAG', data })

export const fetchAddTag = arg => {
  return dispatch =>
    addTag(arg).then(res => {
      dispatch(addTagById(res))
      dispatch(fetchTagsData())
      return res
    })
}
