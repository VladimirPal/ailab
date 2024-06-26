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

const AddIcon = (props) => {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13 11V7a1 1 0 00-2 0v4H7a1 1 0 000 2h4v4a1 1 0 002 0v-4h4a1 1 0 000-2h-4z"
      />
    </svg>
  );
};

AddIcon.propTypes = {
  size: PropTypes.string,
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
  style: PropTypes.object,
};
AddIcon.defaultProps = {
  size: "middle",
  shouldPadding: false,
  applyUiScale: true,
  style: {},
};

export default AddIcon;
