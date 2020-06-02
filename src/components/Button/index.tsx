import React, { Component } from "react";
import classnames from "classnames";

import "./styles.css";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

export default class Button extends Component<ButtonProps> {
  render() {
    const { className, onClick, children } = this.props;
    return (
      <button className={classnames("button", className)} onClick={onClick}>
        <span className="button__text">{children}</span>
      </button>
    );
  }
}
