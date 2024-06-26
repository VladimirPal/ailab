import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const getButtonStyles = (props) => {
  const { theme } = props;
  let cursor = "pointer";
  let height = "32px";
  let lineHeight = "32px";
  let padding = "0 12px";
  let verticalAlign = "middle";
  let width = "auto";

  let color = "var(--text)";
  let background = "var(--background-neutral)";
  let hoverColor = color;
  let hoverBackground = "var(--background-neutral-hovered)";
  let hoverTextDecoration = "none";
  let alignItems = "baseline";
  let justifyContent = "center";

  if (props.withIcon) {
    alignItems = "center";
  }

  if (props.appearance === "link") {
    color = "#0052CC";
    background = "transparent";
    hoverColor = "#0052CC";
    hoverBackground = "transparent";
    hoverTextDecoration = "underline";
  }

  if (props.appearance === "subtle-link") {
    color = "var(--text-subtle)";
    background = "none";
    hoverColor = "var(--text-subtle)";
    hoverBackground = props.highlightHovered
      ? "var(--background-neutral-hovered)"
      : "none";
  }

  if (props.appearance === "primary") {
    color = theme.mode === "dark" ? "#1D2125" : "#FFFFFF";
    background = theme.mode === "dark" ? "#579DFF" : "#0C66E4";
    hoverColor = "#fff";
    hoverBackground = theme.mode === "dark" ? "#85B8FF" : "#0055CC";
  }

  if (props.appearance === "success") {
    color = "#fff";
    background = "#5aac44";
    hoverColor = "#fff";
    hoverBackground = "#61bd4f";
  }

  if (props.appearance === "danger") {
    color = "var(--text-inverse)";
    background = "var(--background-danger-bold)";
    hoverColor = "#fff";
    hoverBackground = "var(--background-danger-bold-hovered)";
  }

  if (props.appearance === "list-item") {
    justifyContent = "start";
  }

  if (props.isSelected) {
    color = "#ffffff";
    background = "rgb(61, 145, 255)";
    hoverColor = "#F4F5F7";
    hoverBackground = "#253858";
  }

  if (props.isDisabled) {
    color = "#A5ADBA";
    background = "rgba(9, 30, 66, 0.04)";
    hoverBackground = "rgba(9, 30, 66, 0.04)";
  }

  // Spacing: Compact
  if (props.spacing === "compact") {
    height = "18px";
    lineHeight = "18px";
    padding = "0 5px";
  }

  // Spacing: None
  if (props.spacing === "none") {
    height = "auto";
    lineHeight = "inherit";
    padding = "0";
    verticalAlign = "baseline";
  }

  if (props.bigPadding) {
    padding = "20px";
  }

  // Disabled
  if (props.disabled) {
    cursor = "not-allowed";
  }

  // Fit to parent width
  if (props.fit) {
    width = "100%";
  }

  if (props.fitContent) {
    width = "fit-content";
  }

  return css({
    display: "flex",
    width,
    height,
    alignItems,
    justifyContent,
    background,
    borderRadius: "3px",
    borderWidth: props.withBorder ? "1px" : "0",
    borderColor: "#172b4d",
    boxSizing: "border-box",
    color,
    cursor,
    fontSize: "inherit",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight,
    margin: "0",
    maxWidth: "100%",
    outline: "none !important",
    padding,
    pointerEvents: "auto",
    textAlign: "center",
    textDecoration: "none",
    transition:
      "background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)",
    transitionDuration: "0.1s, 0.15s",
    verticalAlign,
    whiteSpace: "nowrap",
    boxShadow: "none",
    userSelect: "none",

    "&::-moz-focus-inner": {
      border: 0,
      margin: 0,
      padding: 0,
    },

    "&:hover": {
      // color: hoverColor,
      background: hoverBackground,
      textDecoration: hoverTextDecoration,
    },

    "&:active": {
      transitionDuration: "0s",
    },

    "&:focus": {
      outline: "none",
      transitionDuration: "0s, 0.2s",
    },

    "&:disabled": {
      color: "#00000040",
    },
    ...(props.isLoading
      ? {
          "&:after": {
            content: '""',
            width: "16px",
            height: "16px",
            marginLeft: "4px",
            border: "2px solid transparent",
            borderTopColor: "grey",
            borderRadius: "50%",
            animation: "button-loading-spinner 1s ease infinite",
          },

          "@keyframes button-loading-spinner": {
            from: {
              transform: "rotate(0turn)",
            },

            to: {
              transform: "rotate(1turn)",
            },
          },
        }
      : {}),
  });
};

export const Button = styled.button`
  ${getButtonStyles};
`;

export const ButtonsStory = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ButtonsStoryRow = styled.div`
  display: inline-flex;
  margin-top: 30px;
  &:last-child {
    margin-bottom: 30px;
  }
`;
export const ButtonStory = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;
