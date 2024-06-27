import * as actionTypes from "../actions/actionTypes";

const mergeValues = (values, state) =>
  Object.keys(values).reduce((acc, key) => {
    const { _merge: shouldMerge, ...valueState } = values[key] ?? {};
    return {
      ...acc,
      [key]: shouldMerge ? mergeValues(valueState, state[key]) : values[key],
    };
  }, state);

const keyValueReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_UI_STATE:
    case actionTypes.SET_STATE: {
      const { keyOrRootValues, maybeValues } = action.payload;
      if (typeof keyOrRootValues === "function") {
        return keyOrRootValues(state);
      }
      const [values, key] =
        maybeValues === undefined
          ? [keyOrRootValues, null]
          : [maybeValues, keyOrRootValues];
      return {
        ...(key
          ? {
              ...state,
              [key]: {
                ...mergeValues(values, state[key]),
              },
            }
          : mergeValues(values, state)),
      };
    }
    default:
      return state;
  }
};

export const combinedKeyValueReducer = (combineReducer) => (state, action) => {
  switch (action.type) {
    case actionTypes.SET_UI_STATE:
    case actionTypes.SET_STATE: {
      return keyValueReducer(state, action);
    }
    default:
      return combineReducer(state, action);
  }
};

export default keyValueReducer;
