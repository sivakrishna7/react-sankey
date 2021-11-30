import HomePage from "./HomePage";
import { render as rtlRender, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../state/reducers";

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
  transactions: {
    nodes: [
      { name: "Salary" },
      { name: "Bills" },
      { name: "Electric Bill" },
      { name: "Mobile Bill" },
    ],
    links: [
      { source: 0, target: 1, value: 3000 },
      { source: 1, target: 2, value: 1000 },
      { source: 1, target: 3, value: 2000 },
    ],
  },
  modalState: {
    activeItem: {},
    showUpdateModal: false,
    activeItemValue: "",
    itemType: "",
  },
  i18nState: { language: languageOptions[0]["value"], languageOptions },
};

function render(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk)),
    ...rtlOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...rtlOptions }),
    store,
  };
}

describe("Home Page", () => {
  const setup = () => render(<HomePage />, { initialState });
  describe("Interactions", () => {
    it("has node input", () => {
      setup();
      const nodeInputEl = screen.queryByTestId("node-input");
      expect(nodeInputEl).toBeInTheDocument();
    });
    it("has add node button", () => {
      setup();
      const nodeButtonEl = screen.queryByRole("button", { name: "Add Node" });
      expect(nodeButtonEl).toBeInTheDocument();
    });
    it("adds node to chart", async () => {
      setup();
      const nodeInputEl = screen.queryByTestId("node-input");
      userEvent.clear(nodeInputEl);
      userEvent.type(nodeInputEl, "Sample Node");
      const nodeButtonEl = screen.queryByRole("button", { name: "Add Node" });
      userEvent.click(nodeButtonEl);
      expect(screen.queryAllByText(/sample node/i).length).toBe(4);
    });
    it("has link input", () => {
      setup();
      const linkInputEl = screen.queryByTestId("link-input");
      expect(linkInputEl).toBeInTheDocument();
    });
    it("has add link button", () => {
      setup();
      const linkButtonEl = screen.queryByRole("button", { name: "Add Link" });
      expect(linkButtonEl).toBeInTheDocument();
    });
    it("has link select source dropdown", () => {
      setup();
      const linkSelectSourceEl = screen.queryByTestId("link-source-select");
      expect(linkSelectSourceEl).toBeInTheDocument();
    });
    it("has link select target dropdown", () => {
      setup();
      const linkSelectTargetEl = screen.queryByTestId("link-target-select");
      expect(linkSelectTargetEl).toBeInTheDocument();
    });
    it("adds a link to chart", async () => {
      setup();
      const linkInputEl = screen.queryByTestId("link-input");
      userEvent.selectOptions(screen.getByTestId("link-source-select"), ["0"]);
      userEvent.selectOptions(screen.getByTestId("link-target-select"), ["1"]);
      userEvent.type(linkInputEl, "10000");
      const linkButtonEl = screen.queryByRole("button", { name: "Add Link" });
      userEvent.click(linkButtonEl);
      const updatedLink = screen.queryByTestId(/salary-to-bills-is-10000/i);
      expect(updatedLink).toBeInTheDocument();
    });
    it("opens modal upon clicking link", async () => {
      setup();
      const linkPathList = screen.queryAllByTestId("sankey-link-path");
      userEvent.click(linkPathList[0]);
      const modalEl = await screen.findByRole("dialog");
      expect(modalEl).toBeInTheDocument();
    });
    it("closes modal upon clicking cancel without any update", async () => {
      setup();
      const linkPathList = screen.queryAllByTestId("sankey-link-path");
      userEvent.click(linkPathList[0]);
      const modalEl = await screen.findByRole("dialog");
      expect(modalEl).toBeInTheDocument();
      const cancelButtonEl = screen.queryByTestId("close-modal");
      userEvent.click(cancelButtonEl);
      expect(modalEl).not.toBeInTheDocument();
    });
    it("updates link weight from modal upon clicking link", async () => {
      setup();
      const linkPathList = screen.queryAllByTestId("sankey-link-path");
      userEvent.click(linkPathList[0]);
      const modalEl = await screen.findByRole("dialog");
      expect(modalEl).toBeInTheDocument();
      const activeItemInputEl = screen.queryByTestId("active-item-update");
      userEvent.clear(activeItemInputEl);
      userEvent.type(activeItemInputEl, "55000");
      const saveButtonEl = screen.queryByTestId("save-on-modal");
      userEvent.click(saveButtonEl);
      expect(modalEl).not.toBeInTheDocument();
      const updatedLink = screen.queryByTestId(/55000/i);
      expect(updatedLink).toBeInTheDocument();
    });
    it("deletes a link", async () => {
      setup();
      const linkPathList = screen.queryAllByTestId("sankey-link-path");
      const linkTitle = within(linkPathList[0]).getByText(/weight/i);
      const linkId = within(linkTitle)
        .getByText(/weight/i)
        .getAttribute("data-testid");
      userEvent.click(linkPathList[0]);
      const modalEl = await screen.findByRole("dialog");
      expect(modalEl).toBeInTheDocument();
      const activeItemInputEl = screen.queryByTestId("active-item-update");
      userEvent.clear(activeItemInputEl);
      const saveButtonEl = screen.queryByTestId("save-on-modal");
      userEvent.click(saveButtonEl);
      expect(modalEl).not.toBeInTheDocument();
      const updatedLink = screen.queryByTestId(linkId);
      expect(updatedLink).not.toBeInTheDocument();
    });
    it("updates node name from modal upon clicking node", async () => {
      setup();
      const nodeRectList = screen.queryAllByTestId("sankey-node-rect");
      userEvent.click(nodeRectList[0]);
      const modalEl = await screen.findByRole("dialog");
      expect(modalEl).toBeInTheDocument();
      const activeItemInputEl = screen.queryByTestId("active-item-update");
      userEvent.clear(activeItemInputEl);
      userEvent.type(activeItemInputEl, "Annual Salary");
      const saveButtonEl = screen.queryByTestId("save-on-modal");
      userEvent.click(saveButtonEl);
      expect(modalEl).not.toBeInTheDocument();
      expect(screen.queryAllByText(/annual salary/i).length).not.toBe(0);
    });
    it("renders nodes and links", async () => {
      setup();
      const linkPathList = screen.queryAllByTestId("sankey-link-path");
      const nodeRectList = screen.queryAllByTestId("sankey-node-rect");
      expect(linkPathList).toHaveLength(3);
      expect(nodeRectList).toHaveLength(4);
    });
  });

  describe("Layout", () => {
    it("renders header", () => {
      render(<HomePage />, { initialState });
      expect(screen.queryByTestId("cashflow-header")).toBeInTheDocument();
    });

    it("renders sankeychart", async () => {
      render(<HomePage />, { initialState });
      expect(screen.queryByTestId("sankey-chart")).toBeInTheDocument();
    });
  });
});

console.error = () => {};
