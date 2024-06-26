import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { applyLogPrefix } from "@ailab/log";
import { CacheProvider as StylesCacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import ErrorBoundary from "@ailab/components/ErrorBoundary";
import GlobalStyles from "@ailab/components/styled";
import LocalStorageThemeProvider from "@ailab/components/styled/LocalStorageThemeProvider";
import App from "../containers/App";

import store from "../store";
import "../i18n";
import config from "../config";

applyLogPrefix("[web]");

const rootEl = window.document.getElementById("content");
const root = createRoot(rootEl);

const stylesCache = createCache({
  key: "ailab",
  prepend: true,
});

const Router = BrowserRouter;

const render = (Component) => {
  root.render(
    <ReduxProvider store={store}>
      <StylesCacheProvider value={stylesCache}>
        <LocalStorageThemeProvider>
          <GlobalStyles />
          <Router>
            <ErrorBoundary>
              <React.Suspense fallback="Loading...">
                <Component />
              </React.Suspense>
            </ErrorBoundary>
          </Router>
        </LocalStorageThemeProvider>
      </StylesCacheProvider>
    </ReduxProvider>,
  );
};

render(App);

console.log('Hello, World!');
log.tmp('Hello, World!');
