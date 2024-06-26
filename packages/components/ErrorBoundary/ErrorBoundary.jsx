import React from 'react';
import PropTypes from 'prop-types';

import * as Sentry from '@sentry/browser';

import FallBack from '../FallBack';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, { componentStack }) {
    if (this.props.onCatch) {
      this.props.onCatch(error, componentStack, this.state, this.setState);
    } else {
      Sentry.withScope((scope) => {
        if (this.props.beforeCapture) {
          this.props.beforeCapture(scope, error);
          Sentry.captureException(error, {
            contexts: { react: { componentStack } },
          });
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <FallBack />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  onCatch: PropTypes.func,
  beforeCapture: PropTypes.func,
  fallback: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
