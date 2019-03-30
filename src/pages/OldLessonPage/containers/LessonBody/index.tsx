import React, { Component } from "react";
import { connect } from "react-redux";

import { AppStateType } from "../../../../types";

import { updateAnswer, UpdateAnswer } from "../../actions";
import { getParagraphs, getQuestions } from "../../selectors";
import { UserAnswerStatus } from "../../types";

import "./styles.css";

type LessonBodyProps = {
  paragraphs: string[];
  questions: any;
  updateAnswer: UpdateAnswer;
};

const mapClass = (type: UserAnswerStatus): string => {
  switch (type) {
    case UserAnswerStatus.UNSUBMITTED:
      return "answer--unsubmitted";
    case UserAnswerStatus.PASS:
      return "answer--pass";
    case UserAnswerStatus.FAIL:
      return "answer--fail";
    default:
      return "";
  }
};

// TODO: Paragraph comopnent, Question container (connect to have updateAnswer redux action)

export class LessonBody extends Component<LessonBodyProps> {
  render() {
    const { paragraphs, questions, updateAnswer } = this.props;

    return (
      <div className="lesson-body">
        {paragraphs.map((paragraph, index) => (
          <p key={`lesson-body__paragraph-${index}`}>{paragraph}</p>
        ))}
        <h2>Questions</h2>
        <p>
          How would you translate the following to/from Toki Pona to English?
        </p>
        {questions.map((question: any, index: number) => {
          const {
            text,
            userAnswer: { status }
          } = question;

          return (
            <div key={`question-${index}`}>
              <span key={`question-label-${index}`}>{question.text}</span>
              <input
                key={`question-input-${index}`}
                className={mapClass(status)}
                type="text"
                placeholder="Answer..."
                onChange={({ target: { value } }) => updateAnswer(index, value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  paragraphs: getParagraphs(state),
  questions: getQuestions(state)
});

const actions = {
  updateAnswer
};

export default connect(
  mapStateToProps,
  actions
)(LessonBody);
