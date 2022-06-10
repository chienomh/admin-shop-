import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
// material
import {
  Button,
  Card,
  Container,
  Dialog,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
// components
import USERLIST from '../../_mocks_/user';
//
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import SearchNotFound from 'src/components/SearchNotFound';
import { UserListHead, UserListToolbar } from 'src/sections/@dashboard/user';
import {
  deleteMessage,
  getListMessage,
  sendMessage,
} from 'src/services/message';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AlertShop from 'src/components/Alert';
import { Box } from '@mui/system';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'lname', label: 'Last Name', alignRight: false },
  { id: 'subject', label: 'Subject', alignRight: false },
  { id: 'message', label: 'Message', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user => _user.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map(el => el[0]);
}

export default function MessagePage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [type, setType] = useState(false);
  const [openPopupMess, setOpenPopupMess] = useState(false);
  const [id, setId] = useState(0);
  const [mess, setMess] = useState('');
  const [openAlertSend, setOpenAlertSend] = useState(false);

  const RegisterSchema = Yup.object().shape({
    mess: Yup.string().required('This is required'),
  });

  const formik = useFormik({
    initialValues: {
      mess: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const params = {
        id,
        data: {
          message: mess,
        },
      };
      try {
        await sendMessage(params);
        setOpenAlertSend(true);
        setType(true);
      } catch (error) {
        setOpenAlertSend(true);
        setType(true);
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setValues,
    setFieldValue,
  } = formik;

  const [listBill, setListBill] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  console.log(listBill);

  const filteredUsers = applySortFilter(
    listBill,
    getComparator(order, orderBy),
    filterName,
  );

  useEffect(() => {
    (async () => {
      const data = await getListMessage();
      setListBill(data.data.rows);
    })();
  }, [openAlertDelete]);

  const isUserNotFound = filteredUsers.length === 0;

  const handlDelete = async id => {
    try {
      await deleteMessage(id);
      setOpenAlertDelete(true);
      setType(true);
    } catch (error) {
      setOpenAlertDelete(true);
      setType(true);
    }
  };

  const handleOpenPopupSend = id => {
    setOpenPopupMess(true);
    setId(id);
  };

  const handleCloseMess = () => {
    setOpenPopupMess(false);
  };

  const handlChangeMess = e => {
    setMess(e.target.value);
    setFieldValue('mess', e.target.value);
  };
  return (
    <Page title="Bill">
      <AlertShop
        isOpen={openAlertDelete}
        type={type ? 'success' : 'error'}
        textAlert={
          type ? 'Delete message Successfully!' : 'Delete message Faild!'
        }
        handle={() => {
          setOpenAlertDelete(false);
        }}
        onClose={() => setOpenAlertDelete(false)}
      />
      <AlertShop
        isOpen={openAlertSend}
        type={type ? 'success' : 'error'}
        textAlert={type ? 'Send message Successfully!' : 'Send message Faild!'}
        handle={() => {
          setOpenAlertSend(false);
        }}
        onClose={() => {
          setOpenAlertSend(false);
          setOpenPopupMess(false);
          if (type) {
            window.location.reload();
          }
        }}
      />
      <Dialog open={openPopupMess} onClose={handleCloseMess}>
        <Box width="600px" padding="20px 20px">
          <CloseIcon
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
            onClick={handleCloseMess}
          />
          <Box fontSize="25px" fontWeight="700">
            Detail Message
          </Box>
          <Box margin="20px">
            <Box display="flex">
              <Box fontWeight="bold" width="100px">
                Name:
              </Box>
              <Box>{id.lastName}</Box>
            </Box>
            <Box display="flex">
              <Box fontWeight="bold" width="100px">
                Subject:
              </Box>
              <Box>{id.subject}</Box>
            </Box>
            <Box display="flex">
              <Box fontWeight="bold" width="100px">
                Message:
              </Box>
              <Box>{id.message}</Box>
            </Box>
            <Box display="flex">
              <Box fontWeight="bold" width="100px">
                Create at:
              </Box>
              <Box>{id.createdAt ? id.createdAt.slice(0, 10) : ''}</Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Bill
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table aria-label="customized table">
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listBill.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const {
                        id,
                        firstName,
                        lastName,
                        subject,
                        createdAt,
                        message,
                        response,
                      } = row;
                      const isItemSelected = selected.indexOf(firstName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          sx={{ cursor: 'poiter' }}
                        >
                          <TableCell align="center">{id}</TableCell>
                          <TableCell align="center">{lastName}</TableCell>
                          <TableCell align="center">{subject}</TableCell>
                          <TableCell align="center">{message}</TableCell>
                          <TableCell align="center">
                            {createdAt.slice(0, 10)}
                          </TableCell>
                          <TableCell align="center">
                            <DeleteIcon
                              sx={{ cursor: 'pointer', marginRight: '20px' }}
                              onClick={() => handlDelete(id)}
                            />
                            <SendIcon
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleOpenPopupSend(row)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
