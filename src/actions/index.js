import { fetchDraft, publish, del } from '../services/tags'

export const getDraft = arg => {
  return dispatch => {
    fetchDraft(arg).then(res => {
      dispatch(saveDraft(res))
    })
  }
}

export const publishDraft = arg => {
  return dispatch => {
    publish(arg).then(res => {
      dispatch(getDraft())
    })
  }
}

const saveDraft = data => ({ type: 'SAVE_DRAFT_DATA', data })

export const delDraft = (arg, cb) => {
  return dispatch => {
    del(arg).then(res => {
      dispatch(getDraft({}))
      cb()
    })
  }
}
