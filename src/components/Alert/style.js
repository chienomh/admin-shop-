import { Dialog } from '@mui/material';
import { styled } from '@mui/system';

export const ModalAlert = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root': {
    borderRadius: '20px',
    maxWidth: '500px',
    width: '100%',
    minHeight: '367px',
    padding: '0px 0px 24px 0px',
    backgroundColor: '#fff',
    '.MuiTypography-root': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.MuiDialogActions-root': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.MuiDialogContent-root': {
      textAlign: 'center',
    },
  },
  '.MuiButton-root': {
    // backgroundImage: theme.palette.gradientGold.main,
    minWidth: '140px',
    minHeight: '48px',
    borderRadius: '1000px',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFF',
  },
}));
