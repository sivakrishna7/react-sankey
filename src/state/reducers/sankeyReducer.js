import { ActionType } from "../action-types";
import transactions from "../data/transactions.json";

const initialState = {
  loading: false,
  error: null,
  nodes: transactions.nodes,
  links: transactions.links,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_SANKEY_DATA:
      return {
        loading: true,
        error: null,
        nodes: [],
        links: [],
        activeLink: {},
        showUpdateLinkModal: false,
      };
    case ActionType.LOAD_SANKEY_SUCCESS:
      const { nodes, links } = action.payload;
      return {
        loading: false,
        error: null,
        nodes,
        links,
        activeLink: {},
        showUpdateLinkModal: false,
      };
    case ActionType.LOAD_SANKEY_ERROR:
      return {
        loading: false,
        error: action.payload,
        nodes: [],
        links: [],
        activeLink: {},
        showUpdateLinkModal: false,
      };
    case ActionType.UPDATE_LINK:
      const { source, target, value } = action.payload;
      const updatedLinks = state.links.map((link) => {
        if (link.source === source && link.target === target) {
          link.value = value;
        }
        return link;
      });
      return {
        ...state,
        links: updatedLinks,
      };
    // case ActionType.UPDATE_NODE:
    //   const { id, name } = action.payload;
    //   state.nodes[id]["name"] = name;
    //   return deepCopy(state);
    default:
      return state;
  }
};

export default reducer;
