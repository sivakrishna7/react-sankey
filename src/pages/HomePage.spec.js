import HomePage from "./HomePage";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../test/setup";
import userEvent from "@testing-library/user-event";
import "../locale/i18n";
import en from "../locale/en.json";
import es from "../locale/es.json";

describe("Home Page", () => {
  describe("Interactions", () => {
    it("has Language selection", () => {
      render(<HomePage />);
      const language = screen.queryByLabelText("Language");
      expect(language).toBeInTheDocument();
    });
  });
});
