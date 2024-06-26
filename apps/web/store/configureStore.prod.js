import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

import rootReducer from "../reducers";

function configure() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false,
    middleware: (getDefaultMiddleWare) => {
      return getDefaultMiddleWare({
        immutableCheck: false,
      }).concat([]);
    },
  });
  setupListeners(store.dispatch);

  return store;
}

export default configure;
