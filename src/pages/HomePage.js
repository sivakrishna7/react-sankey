import { useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { SankeyChart } from "../components";
import { useActions, useDimension } from "../hooks";
import { AddNode, AddLink } from "../components";

const styles = {
  homeContainer: { width: "100%", margin: "1em", borderBox: "none" },
  modal: {
    content: {
      top: "275px",
      left: "37%",
      right: "auto",
      bottom: "auto",
      border: "0px solid #333",
      width: "300px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0 , 0.35)",
    },
  },
  closeButtonStyle: {
    background: "transparent",
  },
  modalDiv: { display: "flex", justifyContent: "flex-end" },
};

const HomePage = () => {
  const { t } = useTranslation();
  const { transactions, modalState } = useSelector((store) => store);
  const { nodes, links, error, loading } = transactions;
  const { activeItem, showUpdateModal, activeItemValue, itemType } = modalState;

  const divRef = useRef(null);
  const { height, width } = useDimension(divRef);

  const {
    updateLinkAndCloseModal,
    openModalAndSetActiveItem,
    closeModalAndRemoveActiveItem,
    updateActiveItemValue,
    updateNodeAndCloseModal,
  } = useActions();
  const openModal = (item) => {
    openModalAndSetActiveItem({ item });
  };
  const closeModal = () => {
    closeModalAndRemoveActiveItem();
  };
  const closeAndSaveModal = () => {
    if (itemType === "node") {
      updateNodeAndCloseModal({
        id: activeItem.index,
        name: activeItemValue,
      });
    } else {
      updateLinkAndCloseModal({
        source: activeItem.source,
        target: activeItem.target,
        value: activeItemValue,
      });
    }
  };
  const handleMouseOver = () => {};
  const handleMouseOut = () => {};
  const handleInputChange = (event) => {
    if (itemType === "node") {
      updateActiveItemValue({ value: event.target.value });
    } else if (itemType === "link") {
      const linkWeight = parseInt(event.target.value);
      if (!isNaN(linkWeight) && linkWeight >= 0) {
        updateActiveItemValue({ value: linkWeight });
      } else if (event.target.value === "") {
        updateActiveItemValue({ value: event.target.value });
      }
    }
  };

  const isDataAvailable =
    !loading && !error && nodes.length > 0 && links.length > 0;

  return (
    <div ref={divRef} style={styles.homeContainer}>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        {t("cashFlow")}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <AddNode />
        </Grid>
        <Grid item xs={8}>
          <AddLink />
        </Grid>
      </Grid>

      {isDataAvailable && (
        <SankeyChart
          nodes={nodes}
          links={links}
          width={width * 0.9}
          height={height * 0.8}
          openModal={openModal}
          onLinkMouseOver={handleMouseOver}
          onLinkMouseOut={handleMouseOut}
        />
      )}
      <Modal
        data-testid="update-modal"
        isOpen={showUpdateModal}
        onRequestClose={closeModal}
        style={styles.modal}
      >
        <Grid paddingBottom="1em">
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {itemType === "node" ? "Update Node Name" : "Update Link Weight"}
          </Typography>
        </Grid>
        <TextField
          autoFocus
          margin="dense"
          value={activeItemValue}
          fullWidth
          onChange={handleInputChange}
          variant="standard"
          inputProps={{
            "data-testid": "active-item-update",
          }}
        />
        <Grid xs={12} item container justifyContent="space-between">
          <Button onClick={closeModal}>Cancel</Button>
          <Button data-testid="save-on-modal" onClick={closeAndSaveModal}>
            Apply Changes
          </Button>
        </Grid>
      </Modal>
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
