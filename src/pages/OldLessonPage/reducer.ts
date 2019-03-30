import cloneDeep from "lodash/cloneDeep";

import { LessonPageActionType } from "./actions";
import { ILessonPageState, IQuestion, UserAnswerStatus } from "./types";
import { ActionTypes } from "./constants";

const initialState: ILessonPageState = {
  paragraphs: [],
  questions: [],
  lessonPassed: false
};

export default (
  state: ILessonPageState = initialState,
  action: LessonPageActionType
): ILessonPageState => {
  switch (action.type) {
    case ActionTypes.GET_LESSON: {
      return state;
    }
    case ActionTypes.GET_LESSON_SUCCESS: {
      // TODO: Fuck me this is ugly, refactor - move to a model of array of questions
      // and an array of user answers. Current type/interface system probably fine.
      // Maybe good idea to key into an object by it's lesson id instead of indexing into
      // an array?
      const { paragraphs, questions } = action.lesson;
      const remappedQuestions = questions.map((question: IQuestion) => ({
        ...question,
        userAnswer: {
          answer: "",
          status: UserAnswerStatus.UNSUBMITTED
        }
      }));
      return { ...state, paragraphs, questions: remappedQuestions };
    }
    case ActionTypes.GET_LESSON_FAILURE: {
      return state;
    }

    case ActionTypes.UPDATE_ANSWER: {
      const { index, answer } = action;
      const clonedQuestions: IQuestion[] = cloneDeep(state.questions);

      clonedQuestions[index].userAnswer = {
        answer,
        status: UserAnswerStatus.UNSUBMITTED
      };

      return { ...state, questions: clonedQuestions };
    }

    case ActionTypes.HANDLE_PAGE_SUBMIT: {
      // TODO: Ugly too tbh, refactor... or just hide 😅
      const remappedQuestions: IQuestion[] = state.questions.map(
        (question: IQuestion, index: number) => {
          const { answer } = question.userAnswer;
          return {
            ...question,
            userAnswer: {
              answer,
              status: state.questions[index].answers.includes(answer)
                ? UserAnswerStatus.PASS
                : UserAnswerStatus.FAIL
            }
          };
        }
      );

      const lessonPassed = state.questions.every(
        (question: any, index: number) =>
          question.answers.includes(state.questions[index].userAnswer.answer)
      );

      return { ...state, questions: remappedQuestions, lessonPassed };
    }

    case ActionTypes.CLEAR_LESSON: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
};
