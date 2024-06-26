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

const DoneIcon = (props) => {
  const theme = useTheme();
  const size = typeof props.size === "string" ? sizes[props.size] : props.size;
  const [width, height] = size;

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
        d="M6.73534 12.3223C6.36105 11.9162 5.72841 11.8904 5.3223 12.2647C4.91619 12.639 4.89039 13.2716 5.26467 13.6777L8.87678 17.597C9.41431 18.1231 10.2145 18.1231 10.7111 17.6264C10.7724 17.5662 10.7724 17.5662 11.0754 17.2683C11.3699 16.9785 11.6981 16.6556 12.0516 16.3075C13.0614 15.313 14.0713 14.3169 15.014 13.3848L15.0543 13.3449C16.7291 11.6887 18.0004 10.4236 18.712 9.70223C19.0998 9.30904 19.0954 8.67589 18.7022 8.28805C18.309 7.90022 17.6759 7.90457 17.2881 8.29777C16.5843 9.01131 15.3169 10.2724 13.648 11.9228L13.6077 11.9626C12.6662 12.8937 11.6572 13.8889 10.6483 14.8825C10.3578 15.1685 10.0845 15.4375 9.83288 15.6851L6.73534 12.3223Z"
        fill="currentColor"
      />
    </svg>
  );
};

DoneIcon.defaultProps = {
  size: "middle",
  shouldPadding: false,
  applyUiScale: true,
  style: {},
};

DoneIcon.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["tiny", "small", "smallX", "middle", "large", "huge"]),
    PropTypes.array,
  ]),
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
  style: PropTypes.object,
};

export default DoneIcon;
