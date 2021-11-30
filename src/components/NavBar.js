import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ReactComponent as CentimeLogo } from "../assets/centime.svg";
import { LanguageSelector } from "./LanguageSelector";

const styles = {
  appBar: { backgroundColor: "#ccc" },
  toolbar: {
    display: "flex",
  },
  container: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-end",
  },
};
const NavBar = () => {
  return (
    <AppBar position="static" style={styles.appBar} data-testid="nav-bar">
      <Toolbar style={styles.toolbar}>
        <div xs={6} style={styles.container}>
          <a href="https://www.centime.com" target="_blank" rel="noreferrer">
            <CentimeLogo />
          </a>
        </div>
        <div xs={6} style={styles.container}>
          <LanguageSelector />
        </div>
      </Toolbar>
    </AppBar>
  );
};

NavBar.displayName = "NavBar";
export { NavBar };
