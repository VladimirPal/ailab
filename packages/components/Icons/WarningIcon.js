import React from 'react';
import PropTypes from 'prop-types';

const sizes = {
  small: ['12px', '12px'],
  middle: ['24px', '24px'],
  large: ['32px', '32px'],
  huge: ['64px', '64px'],
};

const WarningIcon = (props) => {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={sizes[props.size][0]}
      height={sizes[props.size][1]}
      fill="currentColor"
      style={{
        ...(props.shouldPadding
          ? {
              padding: '4px',
            }
          : {}),
      }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
};

WarningIcon.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'middle', 'large', 'huge']),
    PropTypes.array,
  ]),
  shouldPadding: PropTypes.bool,
};
WarningIcon.defaultProps = {
  size: 'middle',
  shouldPadding: false,
};

export default WarningIcon;
