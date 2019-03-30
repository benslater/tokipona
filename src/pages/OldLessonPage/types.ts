export interface ILessonPageState {
  paragraphs: string[];
  questions: IQuestion[];
  lessonPassed: boolean;
}

export interface IQuestion {
  text: string;
  answers: string[];
  userAnswer: IUserAnswer;
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
