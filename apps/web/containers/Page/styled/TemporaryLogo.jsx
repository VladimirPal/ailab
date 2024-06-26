import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const sizes = {
  small: [16, 16],
  smallX: [18, 18],
  middle: [24, 24],
  large: [32, 32],
  huge: [64, 64],
};

const TemporaryLogo = (props) => {
  const theme = useTheme();
  const sizePoints =
    typeof props.size === "string" ? sizes[props.size] : props.size;
  const [width, height] = sizePoints;

  const svgProps = {
    width: props.applyUiScale ? width * theme.uiScale : width,
    height: props.applyUiScale ? height * theme.uiScale : height,
    style: Object.assign(
      props.shouldPadding ? { padding: "4px" } : {},
      props.style,
    ),
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...svgProps}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.75.5a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 1.5 0V1.25A.75.75 0 0 0 5.75.5m-2 3.5a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m4 0a.75.75 0 0 1 .75-.75h5.75a.75.75 0 0 1 0 1.5H8.5A.75.75 0 0 1 7.75 4m0 8a.75.75 0 0 1 .75-.75h5.75a.75.75 0 0 1 0 1.5H8.5a.75.75 0 0 1-.75-.75m.75-4.75a.75.75 0 1 0 0 1.5h5.75a.75.75 0 0 0 0-1.5zm-6 2a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M3.75 12a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0"
        clipRule="evenodd"
      />
    </svg>
  );
};

TemporaryLogo.propTypes = {
  size: PropTypes.string,
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
  style: PropTypes.object,
};
TemporaryLogo.defaultProps = {
  size: "large",
  shouldPadding: false,
  applyUiScale: false,
  style: {},
};

export default TemporaryLogo;
