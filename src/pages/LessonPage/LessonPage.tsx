import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import firebase from "firebase";

import LessonBody from "./containers/LessonBody";
import LessonButtons from "./components/LessonButtons";

import {
  getLesson,
  GetLesson,
  updateAnswer,
  UpdateAnswer,
  updateActiveLessonId,
  UpdateActiveLessonId,
  handlePageSubmit,
  HandlePageSubmit
} from "./actions";

import {
  getParagraphs,
  getQuestions,
  getLessons,
  getAnswers,
  getLessonPassed
} from "./selectors";

import { AppStateType } from "../../types";
import {
  ILesson,
  UserAnswerStatus,
  ILessonsObject,
  IUserAnswer
} from "./types";

interface LessonPageProps extends ILesson, RouteComponentProps<{ id: string }> {
  lessons: ILessonsObject;
  answers: IUserAnswer[];
  lessonPassed: boolean;

  updateActiveLessonId: UpdateActiveLessonId;
  getLesson: GetLesson;
  updateAnswer: UpdateAnswer;
  handlePageSubmit: HandlePageSubmit;
}

export class LessonPage extends Component<LessonPageProps> {
  state = { lessonId: this.getUrlLessonId() };

  componentDidMount() {
    const { lessons, updateActiveLessonId, getLesson } = this.props;
    const { lessonId } = this.state;

    updateActiveLessonId(lessonId);
    if (!lessons[lessonId]) getLesson(lessonId);
  }

  getUrlLessonId() {
    const {
      match: {
        params: { id: lessonId }
      }
    } = this.props;

    return lessonId;
  }

  // Class property arrow functions to bind scope (access to this.props)
  handlePrevClick = () => {
    const { push } = this.props.history;

    push("/lessons");
  };

  handleSubmit = () => {
    const {
      lessonPassed,
      handlePageSubmit,
      history: { push }
    } = this.props;

    if (lessonPassed) {
      this.saveLessonProgress();
      push("/lessons");
    } else {
      handlePageSubmit();
    }
  };

  async saveLessonProgress() {
    const { lessonId } = this.state;
    const user = firebase.auth().currentUser;
    const uid = user && user.uid;

    if (!uid) return;

    const db = firebase.firestore();
    const userDoc = await db.collection("users").doc(uid);

    // TODO: Can technically fail if there is no document for uid
    // const completedLessons = userDoc
    //   .get()
    //   .then((doc: firebase.firestore.DocumentData) => {
    //     if (doc.exists) {
    //       // TODO: doc.data() is an empty object if this is the first completed lesson
    //       return doc.data().completed_lessons || [];
    //     }
    //   });

    // TODO: Feedback for failed update, toast?
    const documentSnapshot = await userDoc.get();
    const data = documentSnapshot.data();
    if (!data) return;

    // TODO: use [...new Set(data.completedLessons || [])] when TS supports iterables on sets...
    // Alternatively target ES6 in tsconfig compiler options, depending on browser usage in analytics...
    // downlevelIteration flag results in very excessive boilerplate
    const completedLessons = data.completedLessons || [];
    completedLessons.push(lessonId);
    const saveableLessons = completedLessons.filter(
      (lesson: string, index: number, self: string[]) =>
        self.indexOf(lesson) === index
    );

    userDoc.set({ ...data, completedLessons: saveableLessons });
  }

  renderSubmitButtonText() {
    const { lessonPassed } = this.props;

    return lessonPassed ? "Finish" : "Submit";
  }

  render() {
    const { paragraphs, questions, answers, updateAnswer } = this.props;
    return (
      <>
        {/* TODO: Loading state for here as well as rest of app */}
        <LessonBody
          title="getTitle"
          paragraphs={paragraphs}
          questions={questions}
          answers={answers}
          updateAnswer={updateAnswer}
        />
        {/* TODO: As with old page, separate components */}
        {/* Give LessonBody overflow: scroll */}
        {/* Give LessonBody a fade effect toward bottom to indicate scrollable */}
        <LessonButtons
          handlePrevClick={this.handlePrevClick}
          handleSubmit={this.handleSubmit}
          submitButtonText={this.renderSubmitButtonText()}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  lessons: getLessons(state),
  paragraphs: getParagraphs(state),
  questions: getQuestions(state),
  answers: getAnswers(state),
  lessonPassed: getLessonPassed(state)
});

const actions = {
  updateActiveLessonId,
  getLesson,
  updateAnswer,
  handlePageSubmit
};

export default connect(
  mapStateToProps,
  actions
)(LessonPage);
