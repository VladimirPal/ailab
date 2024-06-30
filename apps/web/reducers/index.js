import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "@ailab/ui-toolkit/api-slices/app";
import aiChatApi from "@ailab/ui-toolkit/api-slices/aiChat";

const rootReducer = combineReducers({
  app: appReducer,
  [aiChatApi.reducerPath]: aiChatApi.reducer,
});

export default rootReducer;
