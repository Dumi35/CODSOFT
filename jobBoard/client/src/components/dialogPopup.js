import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControlLabel, FormControl, FormLabel, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function ApplicationFormDialog(props) {
  const [open, setOpen] = React.useState(props.value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   setOpen(props.open);
  // }, [props.open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle variant="subtitle2" color={"primary"} textTransform={"uppercase"} fontWeight={"bold"}>Application Form</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent>
          <Box>
            <Box display={"flex"} flexWrap={"wrap"} gap={2}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="f_name"
                label="First Name"
                type="text"
                //fullWidth
                sx={{ flexGrow: 1 }}
                variant="outlined"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="l_name"
                name="l_name"
                label="Last Name"
                type="text"
                //fullWidth
                variant="outlined"
                sx={{ flexGrow: 1 }}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                //fullWidth
                sx={{ flexGrow: 1 }}
                variant="outlined"
              />

            </Box>
          </Box>


        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Apply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
