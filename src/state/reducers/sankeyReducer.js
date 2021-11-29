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
        if (link.source === source.index && link.target === target.index) {
          link.value = value;
        }
        return link;
      });
      return {
        ...state,
        links: updatedLinks,
      };
    case ActionType.ADD_NODE:
      let { name } = action.payload;
      const id = state.nodes.length;
      const updatedNodes = state.nodes.map((node) => node);
      name = name || "Node" + id;
      updatedNodes.push({ node: id, name });
      return { ...state, nodes: updatedNodes };
    case ActionType.ADD_LINK:
      const { payload } = action;
      if (
        state.nodes.length > 1 &&
        !isNaN(payload.value) &&
        !isNaN(payload.source) &&
        !isNaN(payload.target)
      ) {
        const updatedLinks = state.links.map((link) => link);
        const linkIndex = updatedLinks.findIndex(
          ({ source, target }) =>
            source === payload.source && target === payload.target
        );
        if (linkIndex === -1) {
          updatedLinks.push({
            source: payload.source,
            target: payload.target,
            value: payload.value,
          });
        } else {
          updatedLinks[linkIndex]["value"] = payload.value;
        }
        return { ...state, links: updatedLinks };
      }
      return state;
    // case ActionType.UPDATE_NODE:
    //   const { id, name } = action.payload;
    //   state.nodes[id]["name"] = name;
    //   return deepCopy(state);
    default:
      return state;
  }
};

export default reducer;
