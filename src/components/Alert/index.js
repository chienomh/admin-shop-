import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import success from './assets/Success.svg';
import error from './assets/Error.svg';
import { Box } from '@mui/system';
import { ModalAlert } from './style';

export default function AlertShop(props) {
  const handleClose = () => {
    props.onClose();
    return props.handle();
  };

  function createMarkup() {
    return { __html: props.alertText };
  }
  return (
    <>
      <ModalAlert
        open={props.isOpen}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 9999 }}
      >
        <DialogTitle>
          {props.type === 'success' ? (
            <img src={success} alt="" />
          ) : props.type === 'error' ? (
            <img src={error} alt="" />
          ) : (
            'Oopps...!'
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: '#000' }}
          >
            {props.textAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </ModalAlert>
    </>
  );
}
