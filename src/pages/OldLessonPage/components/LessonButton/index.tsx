import React, { Component } from "react";
import classnames from "classnames";

import Link from "../../../../components/Link";

import "./styles.css";

interface LessonButtonProps {
  theme: string;
  enabled: boolean;
  to: string;
  onClick?: () => void;
}

const noop = () => {};

export default class LessonButton extends Component<LessonButtonProps> {
  render() {
    const { theme, enabled, to, onClick, children } = this.props;

    return (
      <button
        className={classnames(
          "lesson-button",
          `lesson-button--${theme || "primary"}`
        )}
        onClick={enabled ? onClick : noop}
      >
        <Link enabled={enabled} className="lesson-link" to={to}>
          {children}
        </Link>
      </button>
    );
  }
}
