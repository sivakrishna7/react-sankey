import { ActionType } from "../action-types";

const initialState = {
  activeLink: {},
  showUpdateLinkModal: false,
  activeLinkValue: null,
};

const sankeyUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_ITEM:
      const { item } = action.payload;
      let activeItem, itemType, activeItemValue;
      if (item.name !== undefined) {
        itemType = "node";
        activeItemValue = item.name;
        activeItem = item;
      } else if (item.value !== undefined) {
        itemType = "link";
        activeItemValue = item.value;
        activeItem = item;
      }
      return { showUpdateModal: true, activeItem, itemType, activeItemValue };
    case ActionType.UNSET_ACTIVE_ITEM:
      return {
        activeItem: {},
        showUpdateModal: false,
        itemType: "",
        itemValue: null,
      };
    case ActionType.UPDATE_ACTIVE_ITEM_VALUE:
      return { ...state, activeItemValue: action.payload.value };
    default:
      return state;
  }
};

export default sankeyUpdateReducer;
