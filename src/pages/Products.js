import { useFormik, FormikProvider, Form } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
// material
import {
  Button,
  Container,
  Dialog,
  Typography,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

// components
import AddIcon from '@mui/icons-material/Add';
import Page from '../components/Page';
import { ProductList } from '../sections/@dashboard/products';
import AddSize from '../sections/@dashboard/products/addSize';
//
import { Box } from '@mui/system';
import PRODUCTS from '../_mocks_/products';
import { AddProduct, getListProduct, UploadFile } from '../services/products';
import AlertShop from 'src/components/Alert';

// ----------------------------------------------------------------------

const listBranch = [
  { value: 0, label: 'NIKE' },
  { value: 1, label: 'ADIDAS' },
  { value: 2, label: 'MERREL' },
  { value: 3, label: 'GUCCI' },
  { value: 4, label: 'SKECHERS' },
];

const listMeterial = [
  { value: 0, label: 'LEATHER' },
  { value: 1, label: 'SUEDE' },
];

const listStyle = [
  { value: 0, label: 'SLIPONS' },
  { value: 1, label: 'BOOTS' },
  { value: 2, label: 'SANDALS' },
  { value: 3, label: 'LACEUPS' },
  { value: 4, label: 'OXFORDS' },
];

const listTechnology = [
  { value: 0, label: 'BIOBEVEL' },
  { value: 1, label: 'GROOVE' },
  { value: 2, label: 'FLEXBEVEL' },
];

const listColor = [
  { value: 0, label: 'BLACK' },
  { value: 1, label: 'WHITE' },
  { value: 2, label: 'BLUE' },
  { value: 3, label: 'RED' },
  { value: 4, label: 'GREEN' },
  { value: 5, label: 'GREY' },
  { value: 6, label: 'ORANGE' },
  { value: 7, label: 'CREAM' },
  { value: 7, label: 'BROWN' },
];

const listGender = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
];

export default function EcommerceShop() {
  const [openPopup, setOpenPopup] = useState(false);
  const [branch, setBranch] = useState('NIKE');
  const [metarial, setMetarial] = useState('LEATHER');
  const [style, setStyle] = useState('SLIPONS');
  const [technology, setTechnology] = useState('BIOBEVEL');
  const [color, setColor] = useState('BLACK');
  const [gender, setGender] = useState('Male');
  const [listSize, setListSize] = useState([]);
  const [linkImg, setLinkImage] = useState('');
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [listProduct, setListProduct] = useState();

  const schema = yup.object().shape({
    name: yup.string().required('This fiedl is required'),
    facturer: yup.string().required('This field is required'),
    price: yup
      .number()
      .required('This field is required')
      .typeError('This fiedl must Number'),
    description: yup.string().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: async () => {
      const params = {
        branch: branch,
        color: color,
        description: getFieldProps('description').value,
        gender: gender,
        image: linkImg,
        listSize: listSize.map(x => ({ quantity: x.quantity, name: x.name })),
        manufacturer: getFieldProps('facturer').value,
        material: metarial,
        name: getFieldProps('name').value,
        price: getFieldProps('price').value,
        style: style,
        technology: technology,
      };

      await AddProduct(params);
      setOpenAlertAdd(true);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleChangebranch = e => {
    setBranch(e.target.value);
  };

  const handleChangeMeterial = e => {
    setMetarial(e.target.value);
  };

  const handleChangeStyle = e => {
    setStyle(e.target.value);
  };

  const handleChangeTechnology = e => {
    setTechnology(e.target.value);
  };

  const handleChangeColor = e => {
    setColor(e.target.value);
  };

  const handleChangeGender = e => {
    setGender(e.target.value);
  };

  const handleSelectFile = async e => {
    let data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('Content-Type', 'multipart/form-data');
    const uploadFiled = await UploadFile(data);
    setLinkImage(uploadFiled.data);
  };

  const handleAddSize = () => {
    setListSize(params => params.concat({ size: 0, quantity: 0 }));
  };

  const handleSetData = data => {
    setListSize(data);
  };

  useEffect(() => {
    (async () => {
      const data = await getListProduct();
      setListProduct(data.data.rows);
    })();
  }, []);
  //---------------------------------------------------
  return (
    <Page title="Dashboard: Products">
      <AlertShop
        isOpen={openAlertAdd}
        textAlert="Add product successfully!"
        type="success"
        onClose={() => {
          setOpenAlertAdd(false);
          window.location.reload();
        }}
        handle={() => setOpenPopup(false)}
      />
      <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="lg">
        <Box width="800px" minHeight="500px" padding="30px" position="relative">
          <Typography variant="h4" sx={{ mb: 5 }}>
            New Product
          </Typography>
          <CloseIcon
            sx={{
              position: 'absolute',
              right: '30px',
              top: '30px',
              cursor: 'pointer',
            }}
            onClick={handleClosePopup}
          />
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="name"
                  type="text"
                  label="Name Product"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  <TextField
                    select
                    label="Branch"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangebranch}
                  >
                    {listBranch.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Material"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangeMeterial}
                  >
                    {listMeterial.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Style"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangeStyle}
                  >
                    {listStyle.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Technology"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangeTechnology}
                  >
                    {listTechnology.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Color"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangeColor}
                  >
                    {listColor.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                  <TextField
                    autoComplete="facturer"
                    type="text"
                    label="Manu facturer"
                    {...getFieldProps('facturer')}
                    error={Boolean(touched.facturer && errors.facturer)}
                    helperText={touched.facturer && errors.facturer}
                  />
                  <TextField
                    select
                    label="Gender"
                    sx={{ minWidth: '129px' }}
                    onChange={handleChangeGender}
                  >
                    {listGender.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    autoComplete="facturer"
                    type="text"
                    label="Price"
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>
                <TextField
                  autoComplete="description"
                  type="text"
                  label="Description"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField type="file" onChange={handleSelectFile} />
                <Button onClick={handleAddSize}>Add Size</Button>
                {listSize.length > 0 &&
                  listSize.map((x, index) => {
                    return (
                      <AddSize
                        setData={handleSetData}
                        key={index}
                        data={x}
                        listdata={listSize}
                        id={index}
                      />
                    );
                  })}
              </Stack>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ marginTop: '20px' }}
              >
                Add Product
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </Dialog>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>

          <Button
            variant="contained"
            sx={{ fontSize: '16px' }}
            onClick={() => setOpenPopup(true)}
          >
            <AddIcon /> Add Product
          </Button>
        </Box>

        {listProduct && <ProductList products={listProduct} />}
      </Container>
    </Page>
  );
}
