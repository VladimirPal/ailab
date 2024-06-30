import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import aiChatApi from "@ailab/ui-toolkit/api-slices/aiChat";

import rootReducer from "../reducers";

function configure() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleWare) => {
      return getDefaultMiddleWare({
        immutableCheck: false,
      }).concat([
        aiChatApi.middleware,
      ]);
    },
  });
  setupListeners(store.dispatch);

  return store;
}

export default configure;
