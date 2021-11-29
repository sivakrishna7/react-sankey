import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ open, node, onCloseModal }) {
  console.log({ open, node });
  const [linkWeight, setLinkWeight] = useState(node?.value);
  const handleLinkWeightUpdate = () => {
    onCloseModal({ showUpdateModal: false });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (typeof value === "number" && value >= 0) {
      setLinkWeight(value);
    }
    setLinkWeight(0);
  };

  return (
    <Dialog open={open} onClose={onCloseModal({ showUpdateModal: false })}>
      <DialogTitle>Update Link Weight</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="link-update"
          fullWidth
          value={linkWeight}
          onChange={handleInputChange}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal({ showUpdateModal: false })}>
          Cancel
        </Button>
        <Button onClick={handleLinkWeightUpdate}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
