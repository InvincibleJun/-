import { fetchDraft } from "../services/draft";

export const getDraft = arg => {
  return dispatch => {
    fetchDraft(arg).then(res => {
      dispatch(saveDraft(res));
    });
  };
};

const saveDraft = data => ({ type: "SAVE_DRAFT_DATA", data });
