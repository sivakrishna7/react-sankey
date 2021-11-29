import { Provider } from "react-redux";

import createAppStore from "./state/store";
import { NavBar } from "./components";
import HomePage from "./pages/HomePage";

const styles = {
  appContainer: {
    display: "flex",
    width: "100%",
    height: "500px",
  },
};
function App() {
  return (
    <Provider store={createAppStore()}>
      <NavBar />
      <div style={styles.appContainer}>
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;
