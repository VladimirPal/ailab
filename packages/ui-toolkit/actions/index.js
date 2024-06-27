import { SET_STATE } from "./actionTypes";

export * from "./ui";
export * as actionTypes from "./actionTypes";

export const setState = (keyOrRootValues, maybeValues) => ({
  type: SET_STATE,
  payload: {
    keyOrRootValues,
    maybeValues,
  },
});
