import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./styles.css";

interface WrappedLinkProps {
  className?: string;
  enabled?: boolean;
  to: string;
}

export default class WrappedLink extends Component<WrappedLinkProps> {
  render() {
    const { className, enabled = true, to, children } = this.props;
    return (
      <>
        {enabled && (
          <Link className={classnames("wrapped-link", className)} to={to}>
            {children}
          </Link>
        )}
        {!enabled && children}
      </>
    );
  }
}
