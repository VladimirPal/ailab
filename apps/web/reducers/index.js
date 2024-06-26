import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@ailab/ui-toolkit/api-slices/app";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
