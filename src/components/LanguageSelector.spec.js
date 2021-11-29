import { LanguageSelector } from "./LanguageSelector";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import createAppStore from "../state/store";

const RootWrapper = () => {
  return (
    <Provider store={createAppStore()}>
      <LanguageSelector />
    </Provider>
  );
};

describe("Language Selection", () => {
  describe("Interactions", () => {
    it("has Language selection", () => {
      render(<RootWrapper />);
      const language = screen.queryByLabelText("Language");
      expect(language).toBeInTheDocument();
    });

    it("should list langugages", async () => {
      render(<RootWrapper />);
      const selectLabel = /language/i;
      const selectEl = await screen.findByLabelText(selectLabel);

      expect(selectEl).toBeInTheDocument();

      userEvent.click(selectEl);
      const selectOptions = screen.getAllByTestId("select-option");
      expect(selectOptions.length).toBe(2);
      expect(
        within(selectOptions[0]).queryByText(/english/i)
      ).toBeInTheDocument();
      expect(
        within(selectOptions[1]).queryByText(/spanish/i)
      ).toBeInTheDocument();
    });

    it("should initially defaults to english as language selection", async () => {
      render(<RootWrapper />);
      expect(await screen.findByText(/english/i)).toBeInTheDocument();
    });

    it("should change language to spanish after selecting it", async () => {
      render(<RootWrapper />);
      const selectLabel = /language/i;
      const selectEl = await screen.findByLabelText(selectLabel);

      userEvent.click(selectEl);
      const optionsPopupEl = await screen.findByRole("listbox", {
        name: selectLabel,
      });

      userEvent.click(within(optionsPopupEl).getByText(/spanish/i));
      expect(await screen.findByText(/spanish/i)).toBeInTheDocument();
    });
  });
});
