import { combineReducers } from "redux";
import sankeyReducer from "./sankeyReducer";
import sankeyUpdateReducer from "./sankeyUpdateReducer";
import intlReducer from "./intlReducer";

const reducers = combineReducers({
  transactions: sankeyReducer,
  modalState: sankeyUpdateReducer,
  i18nState: intlReducer,
});

export default reducers;
