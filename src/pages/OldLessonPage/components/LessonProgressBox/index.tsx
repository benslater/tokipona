import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./styles.css";

interface LessonProgressBoxProps {
  number: number;
  status: string;
}

export default class LessonProgressBox extends Component<
  LessonProgressBoxProps
> {
  render() {
    const { number, status } = this.props;
    return (
      <div className={classnames("lesson-progress-box", status)}>
        <Link to={`/lesson/${number}`}>
          <span>{number}</span>
        </Link>
      </div>
    );
  }
}
