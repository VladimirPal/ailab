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

const AddEvent = (props) => {
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
        fill="currentColor"
        d="M15.058 21v-1h3.327q.23 0 .423-.192q.192-.193.192-.423v-8.77H5V14.5H4V6.615q0-.69.463-1.152Q4.925 5 5.615 5h1.77V2.77h1.077V5h7.153V2.77h1V5h1.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463h-3.327ZM8 23.288l-.688-.688l3.055-3.1H1.5v-1h8.867l-3.055-3.1l.688-.688L12.288 19L8 23.288Z"
      />
    </svg>
  );
};

AddEvent.defaultProps = {
  size: "middle",
  shouldPadding: false,
  applyUiScale: true,
  style: {},
};

AddEvent.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["tiny", "small", "smallX", "middle", "large", "huge"]),
    PropTypes.array,
  ]),
  shouldPadding: PropTypes.bool,
  applyUiScale: PropTypes.bool,
  style: PropTypes.object,
};

export default AddEvent;
