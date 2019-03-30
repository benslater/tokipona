import { AppStateType, IGlobalState } from "./types";

const getNamespace = (state: AppStateType): IGlobalState => state.global;

export const getCurrentLessonId = (state: AppStateType) =>
  getNamespace(state).currentLessonId;
