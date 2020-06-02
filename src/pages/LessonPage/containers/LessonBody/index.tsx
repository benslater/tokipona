import React, { Component } from "react";
import classnames from "classnames";

import Input from "../../../../components/Input";

import { UpdateAnswer } from "../../actions";

import mapClass from "../../utils/mapAnswerStateToClass";

import { IQuestion, IUserAnswer, UserAnswerStatus } from "../../types";

import "./styles.css";

interface LessonBodyProps {
  title: string;
  paragraphs: string[];
  questions: IQuestion[];
  answers: IUserAnswer[];

  updateAnswer: UpdateAnswer;
}

export default class LessonBody extends Component<LessonBodyProps> {
  render() {
    const { title, paragraphs, questions, answers, updateAnswer } = this.props;

    // TODO: Massively extract into components

    return (
      <div className="lesson-body">
        <div className="lesson-body__text">
          <h1 className="lesson-body__title">{title}</h1>
          {paragraphs &&
            paragraphs.map((paragraph, index) => (
              <p
                key={`paragraph-${index}`}
                className="lesson-body__text__paragraph"
              >
                {paragraph}
              </p>
            ))}
        </div>
        {questions && <h3>How would you translate the following?</h3>}
        {questions &&
          questions.map((question, index) => {
            const { text } = question;

            // TODO: This isn't super pretty
            const className =
              (answers && answers[index] && mapClass(answers[index].status)) ||
              "";

            return (
              <div key={`question-${index}`} className="lesson-body__question">
                <p
                  key={`question-text-${index}`}
                  className="lesson-body__question-text"
                >
                  {text}
                </p>
                <Input
                  key={`question-input-${index}`}
                  className={classnames(
                    "lesson-body__question-input",
                    className
                  )}
                  type="text"
                  placeholder="Answer..."
                  value={
                    (answers && answers[index] && answers[index].answer) || ""
                  }
                  onChange={({ target: { value } }) =>
                    updateAnswer(index, value)
                  }
                />
                {answers &&
                  answers[index] &&
                  answers[index].status === UserAnswerStatus.FAIL && (
                    <div key={`correct-answers-${index}`}>
                      Correct answers:{" "}
                      {question &&
                        question.answers.map((answer, correctAnswerIndex) => (
                          <p key={`correct-answer-${correctAnswerIndex}`}>
                            {answer}
                          </p>
                        ))}
                    </div>
                  )}
              </div>
            );
          })}
      </div>
    );
  }
}
