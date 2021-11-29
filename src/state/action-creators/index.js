import axios from "axios";
import { ActionType } from "../action-types";
import transactions from "../data/transactions.json";

export const loadData = (remoteFetch = false) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.LOAD_SANKEY_DATA,
    });
    if (remoteFetch) {
      try {
        // makes api request here, however rerouting to local data store
        await axios.get("https://registry.npmjs.org/-/v1/search", {
          params: {
            text: "react-sankey",
          },
        });

        dispatch({
          type: ActionType.SANKEY_DATA_SUCCESS,
          payload: transactions,
        });
      } catch (err) {
        dispatch({
          type: ActionType.SANKEY_DATA_ERROR,
          payload: err.message,
        });
      }
    }
    dispatch({
      type: ActionType.SANKEY_DATA_SUCCESS,
      payload: transactions,
    });
  };
};

export const updateLinkAndCloseModal = (payload) => {
  return (dispatch) => {
    dispatch({ type: ActionType.UPDATE_LINK, payload });
    dispatch({ type: ActionType.UNSET_ACTIVE_ITEM });
  };
};

export const updateNodeAndCloseModal = (payload) => {
  return (dispatch) => {
    dispatch({ type: ActionType.UPDATE_NODE, payload });
    dispatch({ type: ActionType.UNSET_ACTIVE_ITEM });
  };
};

export const openModalAndSetActiveItem = (payload) => {
  return (dispatch) => dispatch({ type: ActionType.SET_ACTIVE_ITEM, payload });
};

export const closeModalAndRemoveActiveItem = () => {
  return (dispatch) => dispatch({ type: ActionType.UNSET_ACTIVE_ITEM });
};

export const updateActiveItemValue = (payload) => {
  return (dispatch) =>
    dispatch({ type: ActionType.UPDATE_ACTIVE_ITEM_VALUE, payload });
};

export const addNode = (payload) => {
  return (dispatch) => dispatch({ type: ActionType.ADD_NODE, payload });
};

export const addLink = (payload) => {
  return (dispatch) => dispatch({ type: ActionType.ADD_LINK, payload });
};

export const changeLanguage = (payload) => {
  return (dispatch) => dispatch({ type: ActionType.CHANGE_LANGUAGE, payload });
};
