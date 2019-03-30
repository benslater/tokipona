import { AppStateType } from "../../types";
import { ILessonsPageState, ILesson, ILessonsObject } from "./types";

const getNamespace = (state: AppStateType): ILessonsPageState =>
  state.lessonPage;

export const getLessons = (state: AppStateType): ILessonsObject =>
  getNamespace(state).lessons;

// TODO: Keying into a value that we know will be undefined is not great.
// Find a better way to do this. Maybe have a loading state and require an activeLessonId
// if not loading. interface LoadingLessonState and interface LessonState union type?
export const getLesson = (state: AppStateType): ILesson => {
  const { lessons, activeLessonId } = getNamespace(state);
  return lessons[activeLessonId || "default"];
};

export const getParagraphs = (state: AppStateType) =>
  getLesson(state) && getLesson(state).paragraphs;
export const getQuestions = (state: AppStateType) =>
  getLesson(state) && getLesson(state).questions;
export const getAnswers = (state: AppStateType) => {
  const { activeLessonId } = getNamespace(state);
  return getNamespace(state).answers[activeLessonId || "default"];
};
export const getLessonPassed = (state: AppStateType) =>
  getNamespace(state).lessonPassed;
