import { ActionType } from "../action-types";

const initialState = {
  activeLink: {},
  showUpdateLinkModal: false,
  activeLinkValue: null,
};

const sankeyUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_LINK:
      const newState = {
        showUpdateLinkModal: true,
        activeLink: action.payload.link,
        activeLinkWeight: action.payload.link.value,
      };
      return newState;
    case ActionType.UNSET_ACTIVE_LINK:
      state.activeLink = {};
      state.showUpdateLinkModal = false;
      return { activeLink: {}, showUpdateLinkModal: false };
    case ActionType.UPDATE_ACTIVE_LINK_WEIGHT:
      return { ...state, activeLinkWeight: action.payload.value };
    default:
      return state;
  }
};

export default sankeyUpdateReducer;
