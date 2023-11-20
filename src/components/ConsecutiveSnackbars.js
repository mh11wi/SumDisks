import * as React from 'react';
import { Alert, AlertTitle, Snackbar, IconButton } from '@mui/material';

const ConsecutiveSnackbars = (props) => {
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (props.snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...props.snackPack[0] });
      props.setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (props.snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [props.snackPack, messageInfo, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ top: "0 !important", mt: "4rem" }}
    >
      <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: 'fit-content' }}>
        {messageInfo ? messageInfo.message : undefined}
      </Alert>
    </Snackbar>
  );
}

export default ConsecutiveSnackbars;
