import {
  Button,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { changeStatusAPI, getDetailBill } from 'src/services/bill';
import moment from 'moment';
import AlertShop from 'src/components/Alert';

const valuesStatus = [
  {
    value: 0,
    label: 'Unprocessed',
  },
  {
    value: 1,
    label: 'Processed',
  },
  {
    value: 2,
    label: 'Delivering',
  },
  {
    value: 3,
    label: 'delivered',
  },
  {
    value: 4,
    label: 'Cannceled',
  },
];

export default function PopupBill(props) {
  const { open, handleClose, id } = props;

  const [dataBill, setDataBill] = useState();

  const [openAlert, setOpenAlert] = useState(false);
  const [type, setType] = useState(false);

  const handleClosePopup = () => {
    handleClose();
  };

  useEffect(() => {
    (async () => {
      const data = await getDetailBill(id);
      setDataBill(data.data);
    })();
  }, [id, openAlert]);

  const handleChangeStatus = status => {
    const params = {
      idBill: dataBill.id,
      status: status,
    };
    (async () => {
      try {
        await changeStatusAPI(params);
        setOpenAlert(true);
        setType(true);
      } catch (error) {
        setOpenAlert(true);
        setType(false);
      }
    })();
  };
  return (
    <Dialog open={open} onClose={handleClosePopup} maxWidth="lg">
      <AlertShop
        isOpen={openAlert}
        textAlert={
          type ? 'Change status successfully!' : 'Change status failure!'
        }
        type={type ? 'success' : 'error'}
        onClose={() => setOpenAlert(false)}
        handl={() => setOpenAlert(false)}
      />
      <Box position="relative" padding="50px" width="800px" minHeight="300px">
        <CloseIcon
          sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            cursor: 'pointer',
          }}
          onClick={handleClosePopup}
        />
        {dataBill && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Customer's Name:
                </Grid>
                <Grid item xs={6}>
                  {dataBill.userName}
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Date Buy:
                </Grid>
                <Grid item xs={6}>
                  {moment(dataBill).format('DD/MM/YYYY')}
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Coupon Name:
                </Grid>
                <Grid item xs={6}>
                  {dataBill.couponName}
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Discount Percent:
                </Grid>
                <Grid item xs={6}>
                  {dataBill.discountPercent ? dataBill.discountPercent : 0}
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Total price:
                </Grid>
                <Grid item xs={6}>
                  {dataBill.priceTotal} $
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6} sx={{ fontWeight: 600 }}>
                  Status:
                </Grid>
                <Grid item xs={6} sx={{ color: 'red' }}>
                  {
                    valuesStatus.filter(x => x.value === dataBill.status)[0]
                      .label
                  }{' '}
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={3} sx={{ fontWeight: 600 }}>
                  Action:
                </Grid>
                <Grid item xs={9} sx={{ color: 'red' }}>
                  {valuesStatus.map(x => (
                    <Button
                      variant={
                        x.value === dataBill.status ? 'contained' : 'outlined'
                      }
                      sx={{ marginRight: '5px', fontSize: '13px' }}
                      onClick={() => handleChangeStatus(x.value)}
                    >
                      {x.label}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              xs={12}
              container
              sx={{
                border: '1px solid #ccc',
                marginTop: '20px',
                borderRadius: '20px',
                padding: '20px',
              }}
            >
              <Grid item xs={12}>
                <Box fontWeight={700}>List Product</Box>
                <Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableCell align="center">Index</TableCell>
                        <TableCell align="center">Product's Name</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                      </TableHead>
                      <TableBody>
                        {dataBill.rows.map((x, index) => (
                          <TableRow>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell>{x.productName}</TableCell>
                            <TableCell align="center">{x.quantity}</TableCell>
                            <TableCell align="right">{x.unitPrice}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
