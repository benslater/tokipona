export interface ILessonsPageState {
  activeLessonId?: string;
  lessons: ILessonsObject;
  answers: { [lessonId: string]: IUserAnswer[] };
  lessonPassed: boolean;
}

export interface ILessonsObject {
  [lessonId: string]: ILesson;
}

export interface ILesson {
  paragraphs: string[];
  questions: IQuestion[];
  userAnswers: IUserAnswer[];
}

export interface IQuestion {
  text: string;
  answers: string[];
}

export interface IUserAnswer {
  answer: string;
  status: UserAnswerStatus;
}

export enum UserAnswerStatus {
  UNSUBMITTED,
  PASS,
  FAIL
}
