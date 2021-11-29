import { ActionType } from "../action-types";

const languageOptions = [
  {
    key: "en",
    value: "English",
  },
  {
    key: "es",
    value: "Spanish",
  },
];

const initialState = {
  loading: false,
  error: null,
  language: languageOptions[0]["value"],
  languageOptions,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_LANGUAGE:
      return { ...state, language: action.payload.language };
    default:
      return state;
  }
};

export default reducer;
