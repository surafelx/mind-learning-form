import {
  QuestionsActionsType,
  QuestionsStateType,
  SET_FIRST_NAME,
  SET_ROLE,
  SET_EMAIL,
} from "../index";

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType
) {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };

    // case SET_INDUSTRY:
    //   return { ...state, industry: action.payload };

    case SET_ROLE:
      return { ...state, role: action.payload };

    case SET_EMAIL:
      return { ...state, email: action.payload };

    default:
      return state;
  }
}
