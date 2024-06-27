import { SET_UI_STATE } from "./actionTypes";

export const setUiState = (keyOrRootValues, maybeValues) => ({
  type: SET_UI_STATE,
  payload: {
    keyOrRootValues,
    maybeValues,
  },
});
