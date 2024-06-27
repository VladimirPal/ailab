export const flatCombineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      ...slices[prop](acc, action),
    }),
    state
  );
