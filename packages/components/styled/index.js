import { css, Global, withTheme } from "@emotion/react";
import colorsCss from "./colors";
import "normalize.css";

const getFontsUrl = (theme) => {
  const fonts = [theme.font].filter(Boolean).join("&family=");
  const url = `https://fonts.googleapis.com/css2?family=Montserrat:wght@400&family=${fonts}&display=swap`;
  return url;
};

const getGlobalStyles = (theme) => css`
  @import url("${getFontsUrl(theme)}");

  ${colorsCss(theme)}

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-feature-settings: normal;
    font-family:
      "${theme.font.split(":")[0]}",
      ui-sans-serif,
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Ubuntu,
      Cantarell,
      Noto Sans,
      sans-serif,
      Helvetica Neue,
      Arial,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol,
      Noto Color Emoji;
    font-feature-settings: normal;
    font-variation-settings: normal;
    font-weight: 400;
    line-height: 1.2;
    tab-size: 4;
    color-scheme: ${theme.mode};
    height: 100%;
  }

  body {
    line-height: inherit;
    margin: 0;
    height: 100%;
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      visibility: visible !important;
    }
  }

  ::-webkit-scrollbar-thumb {
    visibility: hidden;
    background-color: var(--background-neutral-hovered);
  }

  ::-webkit-scrollbar-button:end:increment,
  ::-webkit-scrollbar-button:start:decrement {
    background: #0000;
    display: none;
  }

  ::-webkit-scrollbar-track-piece:vertical:start {
    border-radius: 6px 6px 0 0;
  }

  ::-webkit-scrollbar-track-piece:vertical:end {
    border-radius: 0 0 6px 6px;
  }

  ::-webkit-scrollbar-track-piece:horizontal:start {
    border-radius: 6px 0 0 6px;
  }

  ::-webkit-scrollbar-track-piece:horizontal:end {
    border-radius: 0 6px 6px 0;
  }
`;

const GlobalStyles = ({ theme }) => <Global styles={getGlobalStyles(theme)} />;

export default withTheme(GlobalStyles);
