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

const AddCalendarEvent = (props) => {
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      {...svgProps}
    >
      <path
        fill="currentColor"
        d="M1664 128h384v1792H0V128h384V0h128v128h1024V0h128v128zM384 256H128v256h1792V256h-256v128h-128V256H512v128H384V256zM128 1792h1792V640H128v1152zm960-1024v384h384v128h-384v384H960v-384H576v-128h384V768h128z"
      />
    </svg>
  );
};

AddCalendarEvent.defaultProps = {
  size: "middle",
  shouldPadding: false,
  applyUiScale: true,
  style: {},
};

AddCalendarEvent.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["tiny", "small", "smallX", "middle", "large", "huge"]),
    PropTypes.array,
  ]),
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
  style: PropTypes.object,
};

export default AddCalendarEvent;
