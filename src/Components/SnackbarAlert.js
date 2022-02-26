import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export const SnackbarAlert = ({ showSb, msg }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    showSb && setOpen(true);
  }, [showSb]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar open={open} onClose={handleClose} action={action}>
        <Alert severity="success">{msg}</Alert>
      </Snackbar>
    </div>
  );
};
