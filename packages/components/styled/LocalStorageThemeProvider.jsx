import { useMemo } from "react";
import { ThemeProvider } from "@emotion/react";
import PropTypes from "prop-types";

import useLocalStorage from "@ailab/ui-toolkit/hooks/useLocalStorage";

import allThemes from "./themes";

function LocalStorageThemeProvider({ children }) {
  const [backGradient] = useLocalStorage("backGradient", null);

  const [themeName] = useLocalStorage("themeName", "default");
  const [themeMode] = useLocalStorage("themeMode", "dark");

  const [localThemes] = useLocalStorage("localThemes", {});

  const [newThemeRaw] = useLocalStorage("newTheme", null);
  const newTheme = useMemo(
    () => (newThemeRaw ? JSON.parse(newThemeRaw) : null),
    [newThemeRaw],
  );

  const themeData =
    allThemes[themeName] ?? localThemes[themeName] ?? allThemes.default;

  const themeModeData = {
    ...themeData[themeMode],
    ...(newTheme?.[themeMode] ?? {}),
    type: themeData.type,
    size: {
      ...themeData.size,
      ...(newTheme?.size ?? {}),
    },
    color: {
      ...themeData[themeMode].color,
      ...(newTheme?.[themeMode]?.color ?? {}),
    },
    font: newTheme?.font ?? themeData.font ?? "Kode Mono",
    uiScale: newTheme?.uiScale ?? themeData.uiScale ?? 1,
  };

  const theme = {
    name: themeName,
    mode: themeMode,
    newTheme,
    backGradient,
    original: themeData,
    ...themeModeData,
  };

  log.tmp({ theme });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

LocalStorageThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default LocalStorageThemeProvider;
