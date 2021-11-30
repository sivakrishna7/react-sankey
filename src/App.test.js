import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { Provider } from "react-redux";
import createAppStore from "./state/store";

const RootWrapper = () => {
  return (
    <Provider store={createAppStore()}>
      <App />
    </Provider>
  );
};

describe("Language Selection", () => {
  describe("Internationalization", () => {
    it("has Language selection", () => {
      render(<RootWrapper />);
      const language = screen.queryByLabelText("Language");
      expect(language).toBeInTheDocument();
    });

    it("should initially display english labels", async () => {
      render(<RootWrapper />);
      expect(screen.queryByText("Cash Flow")).toBeInTheDocument();
    });

    it("should display spanish labels after changing language to it", async () => {
      render(<RootWrapper />);
      const selectLabel = /language/i;
      const selectEl = await screen.findByLabelText(selectLabel);

      userEvent.click(selectEl);
      const optionsPopupEl = await screen.findByRole("listbox", {
        name: selectLabel,
      });

      userEvent.click(within(optionsPopupEl).getByText(/spanish/i));
      expect(screen.queryByText("Wolf Hsac")).toBeInTheDocument();
    });
  });
});

console.error = () => {};
