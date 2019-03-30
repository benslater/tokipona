import { ActionTypes } from "./constants";

export type GlobalActionType = ISetCurrentLessonId;

export interface ISetCurrentLessonId {
  type: ActionTypes.SET_CURRENT_LESSON_ID;
  currentLessonId: number;
}

export type SetCurrentLessonId = (
  currentLessonId: number
) => ISetCurrentLessonId;
export const setCurrentLessonId: SetCurrentLessonId = currentLessonId => ({
  type: ActionTypes.SET_CURRENT_LESSON_ID,
  currentLessonId
});
