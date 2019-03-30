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

export type HandlePageSubmit = () => IHandlePageSubmit;
export const handlePageSubmit: HandlePageSubmit = () => ({
  type: ActionTypes.HANDLE_PAGE_SUBMIT
});

export type GetLesson = (lessonId: number) => void;
export const getLesson: GetLesson = (lessonId: number) => async (
  dispatch: Dispatch
) => {
  console.log("getting");

  // TODO: auth headers, make dataset private on sanity
  dispatch(apiGetLesson());

  try {
    const lesson = await client.fetch("*[_type == 'lesson' && id == $id][0]", {
      id: lessonId.toString()
    });
    console.log("got");

    dispatch(apiGetLessonSuccess(lesson));
  } catch (error) {
    console.log("err", error);
    dispatch(apiGetLessonFailure(error));
    console.error("Oh no, error occured: ", error);
  }
};

export type ClearLesson = () => IClearLesson;
export const clearLesson: ClearLesson = () => ({
  type: ActionTypes.CLEAR_LESSON
});
