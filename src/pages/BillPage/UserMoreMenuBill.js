import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
// component
// import Iconify from '../../../components/Iconify';
import Iconify from '../../components/Iconify';
import { banUser } from 'src/services/userAPI';

// ----------------------------------------------------------------------

export default function UserMoreMenuBill(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // const handleOpenUser = () => {
  //   const params = {
  //     banEnum: 0,
  //     userId: props.id,
  //   };

  //   setIsOpen(false);

  //   (async () => {
  //     await banUser(params);
  //     window.location.reload();
  //   })();
  // };

  // const handleLockUser = () => {
  //   const params = {
  //     banEnum: 1,
  //     userId: props.id,
  //   };

  //   setIsOpen(false);
  //   (async () => {
  //     await banUser(params);
  //     window.location.reload();
  //   })();
  // };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          // disabled={props.enabled}
          onClick={() => {}}
        >
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText
            primary="Open"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
          // disabled={!props.enabled}
          onClick={() => {}}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText
            primary="Block"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
