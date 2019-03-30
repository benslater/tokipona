import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import lessonPage from "./pages/LessonPage/reducer";

import { History } from "history";
import { IGlobalState } from "./types";

import { GlobalActionType } from "./actions";

import { ActionTypes } from "./constants";

const initialState: IGlobalState = {
  currentLessonId: 0
};

const global = (
  state: IGlobalState = initialState,
  action: GlobalActionType
): IGlobalState => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_LESSON_ID: {
      return { ...state, currentLessonId: action.currentLessonId };
    }
    default: {
      return state;
    }
  }
};

// TODO: Do we _really_ need connected-react-router?
export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    global,
    lessonPage
  });
