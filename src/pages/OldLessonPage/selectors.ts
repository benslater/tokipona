import { AppStateType } from "../../types";
import { ILessonPageState } from "./types";

const getNamespace = (state: AppStateType): ILessonPageState =>
  state.lessonPage;

export const getParagraphs = (state: AppStateType) =>
  getNamespace(state).paragraphs;
export const getQuestions = (state: AppStateType) =>
  getNamespace(state).questions;
export const getLessonPassed = (state: AppStateType) =>
  getNamespace(state).lessonPassed;
