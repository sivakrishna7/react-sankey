import { combineReducers } from "redux";
import sankeyReducer from "./sankeyReducer";
import sankeyUpdateReducer from "./sankeyUpdateReducer";

const reducers = combineReducers({
  transactions: sankeyReducer,
  modalState: sankeyUpdateReducer,
});

export default reducers;
