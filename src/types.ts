import { ILessonsPageState } from "./pages/LessonPage/types";

export interface IGlobalState {
  currentLessonId: number;
}

export interface AppStateType {
  lessonPage: ILessonsPageState;
  global: IGlobalState;
}
