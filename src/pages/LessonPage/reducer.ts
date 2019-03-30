import cloneDeep from "lodash/cloneDeep";

import { LessonPageActionType } from "./actions";
import { ILessonsPageState, UserAnswerStatus } from "./types";
import { ActionTypes } from "./constants";

const initialState: ILessonsPageState = {
  lessons: {},
  answers: {},
  lessonPassed: false
};

export default (
  state: ILessonsPageState = initialState,
  action: LessonPageActionType
): ILessonsPageState => {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_LESSON_ID: {
      return { ...state, activeLessonId: action.activeLessonId };
    }
    case ActionTypes.GET_LESSON: {
      // TODO: Loading state
      return state;
    }
    case ActionTypes.GET_LESSON_SUCCESS: {
      const { id } = action.lesson;
      return { ...state, lessons: { ...state.lessons, [id]: action.lesson } };
    }
    case ActionTypes.GET_LESSON_FAILURE: {
      // TODO: Error state
      return state;
    }

    case ActionTypes.UPDATE_ANSWER: {
      // TODO: For all cases where this is missing, don't return normal state,
      // return error state
      if (!state.activeLessonId) return state;

      const { activeLessonId } = state;
      const { index, answer } = action;

      const updatedAnswers = cloneDeep(state.answers[activeLessonId]) || [];
      updatedAnswers[index] = { answer, status: UserAnswerStatus.UNSUBMITTED };

      return {
        ...state,
        answers: { ...state.answers, [activeLessonId]: updatedAnswers }
      };
    }

    case ActionTypes.HANDLE_PAGE_SUBMIT: {
      // TODO: This could probably use a little refactoring. The 'marking' logic into a util function?
      // Should the reducer even be handling this much logic?
      if (!state.activeLessonId) return state;
      const { activeLessonId, lessons } = state;

      const totalQuestions = lessons[activeLessonId].questions.length;
      const markedAnswers = cloneDeep(state.answers[activeLessonId]);

      if (!markedAnswers || markedAnswers.length < totalQuestions) return state;

      markedAnswers.forEach((answer, index) => {
        answer.status = lessons[activeLessonId].questions[
          index
        ].answers.includes(answer.answer)
          ? UserAnswerStatus.PASS
          : UserAnswerStatus.FAIL;
      });

      const lessonPassed = markedAnswers.every(
        question => question.status === UserAnswerStatus.PASS
      );

      return {
        ...state,
        answers: { ...state.answers, [activeLessonId]: markedAnswers },
        lessonPassed
      };
    }

    default: {
      return state;
    }
  }
};
