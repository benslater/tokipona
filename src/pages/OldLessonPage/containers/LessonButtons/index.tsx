import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import LessonButton from "../../components/LessonButton";
import {
  handlePageSubmit,
  HandlePageSubmit,
  clearLesson,
  ClearLesson
} from "../../actions";

import "./styles.css";
import { AppStateType } from "../../../../types";
import { getLessonPassed } from "../../selectors";
import { updateFirebaseLessonId } from "../../../../utils/firebaseUtils";

interface LessonButtonsProps {
  currentLessonId: number;
  lessonPassed: boolean;
  handlePageSubmit: HandlePageSubmit;
  clearLesson: ClearLesson;
}

export class LessonButtons extends Component<LessonButtonsProps> {
  handleNextButtonClick = () => {
    const { currentLessonId, lessonPassed, handlePageSubmit } = this.props;

    if (lessonPassed) {
      updateFirebaseLessonId(currentLessonId + 1);
      return clearLesson();
    }
    handlePageSubmit();
  };

  render() {
    const { currentLessonId, lessonPassed } = this.props;
    const validPrevLesson = currentLessonId > 1;

    return (
      <div className="lesson-buttons">
        <LessonButton
          theme={validPrevLesson ? "primary" : "secondary"}
          enabled={validPrevLesson}
          to={`/lesson/${currentLessonId - 1}`}
        >
          Prev
        </LessonButton>
        <LessonButton
          theme="primary"
          enabled={lessonPassed}
          to={`/lesson/${currentLessonId + 1}`}
          onClick={this.handleNextButtonClick}
        >
          {lessonPassed ? "Next" : "Submit"}
        </LessonButton>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  lessonPassed: getLessonPassed(state)
});

const actions = { handlePageSubmit, clearLesson };

export default connect(
  mapStateToProps,
  actions
)(LessonButtons);
