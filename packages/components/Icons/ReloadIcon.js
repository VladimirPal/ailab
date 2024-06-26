import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const sizes = {
  tiny: [12, 12],
  small: [16, 16],
  smallX: [18, 18],
  middle: [24, 24],
  large: [32, 32],
  huge: [64, 64],
};

const ReloadIcon = ({ size, applyUiScale, style, shouldPadding, ...other }) => {
  const theme = useTheme();
  const sizePoints = typeof size === "string" ? sizes[size] : size;
  const [width, height] = sizePoints;

  const svgProps = {
    width: applyUiScale ? width * theme.uiScale : width,
    height: applyUiScale ? height * theme.uiScale : height,
    style: Object.assign(shouldPadding ? { padding: "4px" } : {}, style),
    ...other,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" {...svgProps}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65c2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-1 0v1.813C12.296 3.071 10.666.85 7.5.85C3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65c1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 0 0 1.428-2.167a.5.5 0 1 0-.925-.38a5.77 5.77 0 0 1-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643c-3.44 0-5.65-2.815-5.65-5.65Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

ReloadIcon.defaultProps = {
  size: "middle",
  shouldPadding: false,
  applyUiScale: true,
};
ReloadIcon.propTypes = {
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "smallX", "middle", "large", "huge"]),
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
};

export default ReloadIcon;
