import React, { Component } from "react";
import classnames from "classnames";

import "./styles.css";

interface CardProps {
  id?: string;
  className?: string;
  hoverable?: boolean;
  hasShadow?: boolean;
}

export default class Card extends Component<CardProps> {
  render() {
    const { id, className, hoverable, hasShadow, children } = this.props;
    return (
      <div
        id={id}
        className={classnames(className, "card", {
          "card--hoverable": hoverable,
          "card--with-shadow": hasShadow
        })}
      >
        {children}
      </div>
    );
  }
}
