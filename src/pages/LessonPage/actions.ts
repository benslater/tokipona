import { Dispatch } from "redux";

import sanityClient from "@sanity/client";

import { ActionTypes } from "./constants";

const client = sanityClient({
  projectId: "wrnl8of7",
  dataset: "production"
});

export type LessonPageActionType =
  | IApiGetLesson
  | IApiGetLessonSuccess
  | IApiGetLessonFailure
  | IUpdateAnswer
  | IUpdateActiveLessonId
  | IHandlePageSubmit
  | IClearLesson;

interface IApiGetLesson {
  type: ActionTypes.GET_LESSON;
}

interface IApiGetLessonSuccess {
  type: ActionTypes.GET_LESSON_SUCCESS;
  lesson: any;
}

interface IApiGetLessonFailure {
  type: ActionTypes.GET_LESSON_FAILURE;
  error: any;
}

interface IUpdateAnswer {
  type: ActionTypes.UPDATE_ANSWER;
  index: number;
  answer: string;
}

interface IHandlePageSubmit {
  type: ActionTypes.HANDLE_PAGE_SUBMIT;
}

interface IClearLesson {
  type: ActionTypes.CLEAR_LESSON;
}

interface IUpdateActiveLessonId {
  type: ActionTypes.UPDATE_ACTIVE_LESSON_ID;
  activeLessonId: string;
}

// TODO: type lesson and error properly
type ApiGetLesson = () => IApiGetLesson;
const apiGetLesson: ApiGetLesson = () => ({
  type: ActionTypes.GET_LESSON
});

type ApiGetLessonSuccess = (lesson: any) => IApiGetLessonSuccess;
const apiGetLessonSuccess: ApiGetLessonSuccess = lesson => ({
  type: ActionTypes.GET_LESSON_SUCCESS,
  lesson
});

type ApiGetLessonFailure = (error: any) => IApiGetLessonFailure;
const apiGetLessonFailure: ApiGetLessonFailure = error => ({
  type: ActionTypes.GET_LESSON_FAILURE,
  error
});

export type UpdateAnswer = (index: number, answer: string) => IUpdateAnswer;
export const updateAnswer: UpdateAnswer = (index, answer) => ({
  type: ActionTypes.UPDATE_ANSWER,
  index,
  answer
});

export type UpdateActiveLessonId = (
  activeLessonId: string
) => IUpdateActiveLessonId;
export const updateActiveLessonId: UpdateActiveLessonId = activeLessonId => ({
  type: ActionTypes.UPDATE_ACTIVE_LESSON_ID,
  activeLessonId
});

export type HandlePageSubmit = () => IHandlePageSubmit;
export const handlePageSubmit: HandlePageSubmit = () => ({
  type: ActionTypes.HANDLE_PAGE_SUBMIT
});

export type GetLesson = (lessonId: string) => void;
export const getLesson: GetLesson = (lessonId: string) => async (
  dispatch: Dispatch
) => {
  // TODO: auth headers, make dataset private on sanity
  dispatch(apiGetLesson());

  try {
    // const lesson = await client.fetch("*[_type == 'lesson' && id == $id][0]", {
    //   id: lessonId
    // });

    const lesson = {
      id: "1",
      paragraphs: [
        "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
        "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
      ],
      questions: [
        {
          text: "Dolor",
          answers: ["Sit"]
        },
        {
          text: "Dolor",
          answers: ["Sit"]
        },
        {
          text: "Dolor",
          answers: ["Sit"]
        }
      ]
    };

    dispatch(apiGetLessonSuccess(lesson));
  } catch (error) {
    dispatch(apiGetLessonFailure(error));
    console.error("Oh no, error occured: ", error);
  }
};

export type ClearLesson = () => IClearLesson;
export const clearLesson: ClearLesson = () => ({
  type: ActionTypes.CLEAR_LESSON
});
