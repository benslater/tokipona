import React, { Component } from "react";

import Button from "../../../../components/Button";

import "./styles.css";

interface LessonButtonsProps {
  handlePrevClick: () => void;
  handleSubmit: () => void;
  submitButtonText: string;
}

export default class LessonButtons extends Component<LessonButtonsProps> {
  render() {
    const { handlePrevClick, handleSubmit, submitButtonText } = this.props;
    return (
      <div className="lesson-page__buttons">
        <Button onClick={handlePrevClick}>Back</Button>
        <Button onClick={handleSubmit}>{submitButtonText}</Button>
      </div>
    );
  }
}
