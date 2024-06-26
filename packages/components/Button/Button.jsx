import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Button = ({
  appearance,
  children,
  className,
  id,
  onClick,
  spacing,
  withIcon,
  withBorder,
  highlightHovered,
  bigPadding,
  isDisabled,
  isSelected,
  isLoading,
  fitContent,
  fit,
  type,
  style,
}) => (
  <S.Button
    id={id}
    type={type}
    appearance={appearance}
    spacing={spacing}
    bigPadding={bigPadding}
    fitContent={fitContent}
    fit={fit}
    className={className}
    disabled={isDisabled}
    withIcon={withIcon}
    withBorder={withBorder}
    isSelected={isSelected}
    isLoading={isLoading}
    highlightHovered={highlightHovered}
    onClick={onClick}
    style={style}
  >
    {children}
  </S.Button>
);

Button.propTypes = {
  /** The base styling to apply to the button. */
  appearance: PropTypes.string,
  /** Button's child nodes. */
  children: PropTypes.node,
  /** Classname to the button. */
  className: PropTypes.string,
  /** Id to the button. */
  id: PropTypes.string,
  /** Set if the button is disabled. */
  isDisabled: PropTypes.bool,
  /** Set loading mode. */
  isLoading: PropTypes.bool,
  /** set align-items: center, center child icon. */
  withIcon: PropTypes.bool,
  withBorder: PropTypes.bool,
  /** Change the style to indicate the button is selected. */
  isSelected: PropTypes.bool,
  /** Change the with to fit-content. */
  fitContent: PropTypes.bool,
  fit: PropTypes.bool,
  /** Handler to be called on click. */
  onClick: PropTypes.func,
  /** Set the amount of padding in the button. */
  spacing: PropTypes.string,
  /** Set whether it is a button or a form submission. */
  type: PropTypes.string,
  bigPadding: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  isDisabled: false,
  withIcon: false,
  withBorder: false,
  isSelected: false,
  highlightHovered: false,
  fitContent: false,
  fit: false,
  children: null,
  bigPadding: null,
  className: "",
  type: "button",
  spacing: "default",
  appearance: "default",
  onClick: () => {},
};

export default Button;
