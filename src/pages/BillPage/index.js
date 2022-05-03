import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Container,
  MenuItem,
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
import { getListBill } from 'src/services/bill';
import Label from 'src/components/Label';
import moment from 'moment';
import PopupBill from './PopupBill';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'coupon', label: 'Coupon', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'percent', label: 'Discount percent', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  // { id: 'action', label: 'Action', alignRight: false },
  { id: '' },
];

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
      _user => _user.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map(el => el[0]);
}

export default function Bill() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [idBill, setIdBill] = useState(0);

  // const [action, setAction] = useState(0);

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

  const filteredUsers = applySortFilter(
    listBill,
    getComparator(order, orderBy),
    filterName,
  );

  useEffect(() => {
    (async () => {
      const param = {};
      const data = await getListBill();

      console.log(data.data.rows);
      setListBill(data.data.rows);
    })();
  }, [isOpenPopup]);

  const isUserNotFound = filteredUsers.length === 0;

  const handleClickRow = id => {
    setIdBill(id);
    setIsOpenPopup(true);
  };

  const onClosePopup = () => {
    setIsOpenPopup(false);
  };
  return (
    <Page title="Bill">
      <PopupBill open={isOpenPopup} handleClose={onClosePopup} id={idBill} />
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
                        userName,
                        buyDate,
                        couponName,
                        discountPercent,
                        priceTotal,
                        status,
                      } = row;
                      const isItemSelected = selected.indexOf(userName) !== -1;

                      let colorStatus = valuesStatus.filter(
                        x => x.value === status,
                      )[0].value;

                      let color;
                      switch (colorStatus) {
                        case 0: {
                          color = 'default';
                          break;
                        }
                        case 1: {
                          color = 'primary';
                          break;
                        }
                        case 2: {
                          color = 'secondary';
                          break;
                        }
                        case 3: {
                          color = 'success';
                          break;
                        }
                        case 4: {
                          color = 'error';
                          break;
                        }
                        default: {
                          color = 'default';
                          break;
                        }
                      }
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClickRow(id)}
                          sx={{ cursor: 'poiter' }}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {userName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            {moment(buyDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="left">{couponName}</TableCell>
                          <TableCell align="left">{priceTotal} $</TableCell>
                          <TableCell align="right">{discountPercent}</TableCell>
                          <TableCell align="center">
                            <Label variant="ghost" color={color}>
                              {
                                valuesStatus.filter(x => x.value === status)[0]
                                  .label
                              }
                            </Label>
                          </TableCell>

                          {/* <TableCell align="right">
                            <TextField select value={status}>
                              {valuesStatus.map(x => (
                                <MenuItem key={x.value} value={x.value}>
                                  {x.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </TableCell> */}
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
