import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import LessonProgressBar from "./containers/LessonProgressBar";
import LessonBody from "./containers/LessonBody";
import LessonButtons from "./containers/LessonButtons";

import { setAuthStateChangedHandler } from "../../utils/firebaseUtils";

import { AppStateType } from "../../types";
import { IQuestion } from "./types";

import { setCurrentLessonId, SetCurrentLessonId } from "../../actions";
import {
  getLesson,
  GetLesson,
  handlePageSubmit,
  HandlePageSubmit
} from "./actions";

import { getCurrentLessonId } from "../../selectors";
import { getParagraphs, getQuestions, getLessonPassed } from "./selectors";

type LessonPageProps = {
  match: any;

  currentLessonId: number;
  paragraphs: string[];
  questions: IQuestion[];
  lessonPassed: boolean;

  getLesson: GetLesson;
  handlePageSubmit: HandlePageSubmit;
  setCurrentLessonId: SetCurrentLessonId;
};

export class LessonPage extends Component<LessonPageProps> {
  componentDidMount() {
    const { setCurrentLessonId, getLesson } = this.props;

    setAuthStateChangedHandler(this.props.setCurrentLessonId);
    // TODO try and get the lesson id of the user from their firebase store
    const firebaseUserLessonId = null;

    setCurrentLessonId(firebaseUserLessonId || +this.getUrlLessonId());
    console.log(+this.props.currentLessonId);

    if (this.props.currentLessonId) getLesson(+this.props.currentLessonId);
  }

  componentDidUpdate(prevProps: LessonPageProps) {
    const {
      match: {
        params: { id: prevLessonId }
      }
    } = prevProps;
    const lessonId = this.getUrlLessonId();

    // Do we want middleware to do this?

    if (lessonId !== prevLessonId) {
      getLesson(lessonId);
    }
  }

  getUrlLessonId() {
    const {
      match: {
        params: { id: lessonId }
      }
    } = this.props;

    return lessonId;
  }

  render() {
    const { currentLessonId } = this.props;

    return (
      <>
        <LessonProgressBar currentLessonId={+currentLessonId} />
        <LessonBody />
        <LessonButtons currentLessonId={+currentLessonId} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    currentLessonId: getCurrentLessonId(state),
    paragraphs: getParagraphs(state),
    questions: getQuestions(state),
    lessonPassed: getLessonPassed(state)
  };
};

const actions = {
  getLesson,
  handlePageSubmit,
  setCurrentLessonId
};

export default connect(
  mapStateToProps,
  actions
)(LessonPage);
