import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Dialog,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
// utils
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import AlertShop from 'src/components/Alert';
import {
  deleteProduct,
  getProductById,
  updateProduct,
  UploadFile,
} from 'src/services/products';
import * as yup from 'yup';
import { fCurrency } from '../../../utils/formatNumber';
import AddSize from './addSize';

//
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
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const navigate = useNavigate();

  const { name, image, price, id, description, manufacturer } = product;
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupMessage, setOpenPopupMessage] = useState(false);
  const [branch, setBranch] = useState('NIKE');
  const [metarial, setMetarial] = useState('LEATHER');
  const [style, setStyle] = useState('SLIPONS');
  const [technology, setTechnology] = useState('BIOBEVEL');
  const [color, setColor] = useState('BLACK');
  const [gender, setGender] = useState('Male');
  const [listSize, setListSize] = useState([]);
  const [linkImg, setLinkImage] = useState(image);
  const [openAlertAdd, setOpenAlertAdd] = useState(false);
  const [listProduct, setListProduct] = useState();
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
  const [typeDelete, setTypeDelete] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const schema = yup.object().shape({
    name: yup.string().required('This fiedl is required'),
    facturer: yup.string().required('This field is required'),
    price: yup
      .number()
      .required('This field is required')
      .typeError('This fiedl must Number'),
    description: yup.string().required('This field is required'),
  });

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

  console.log(listSize);

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: async () => {
      const data = {
        branch: branch,
        color: color,
        description: getFieldProps('description').value,
        gender: gender,
        image: linkImg,
        listSize: listSize.map(x => ({
          quantity: Number(x.quantity),
          name: x.name,
          productId: id,
          id: x.id,
        })),
        manufacturer: getFieldProps('facturer').value,
        material: metarial,
        name: getFieldProps('name').value,
        price: getFieldProps('price').value,
        style: style,
        technology: technology,
      };

      const params = { data, id };
      await updateProduct(params);
      setOpenAlertAdd(true);
      setOpenPopup(false);
      setOpenPopupMessage(true);
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  const handleSelectFile = async e => {
    setIsLoadingImg(true);
    let data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('Content-Type', 'multipart/form-data');
    const uploadFiled = await UploadFile(data);
    setLinkImage(uploadFiled.data);
    setIsLoadingImg(false);
  };

  const handleAddSize = () => {
    setListSize(params => params.concat({ size: 0, quantity: 0 }));
  };

  const handleSetData = data => {
    setListSize(data);
  };

  const handleOpenPopupEdit = async () => {
    setFieldValue('name', name);
    setFieldValue('description', description);
    setFieldValue('facturer', manufacturer);
    setFieldValue('price', price);
    const data = await getProductById(id);
    setBranch(data.data.branch);
    setMetarial(data.data.material);
    setStyle(data.data.style);
    setTechnology(data.data.technology);
    setColor(data.data.color);
    setGender(data.data.gender);
    setListSize(data.data.listSize);
    setOpenPopup(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id);
      setIsOpenAlertDelete(true);
      setTypeDelete(true);
    } catch (error) {
      setIsOpenAlertDelete(true);
      setTypeDelete(false);
    }
  };

  const goDetail = () => {
    navigate(`/dashboard/products/${id}`, {
      state: { id: id, name: 'id' },
    });
  };
  return (
    <Box>
      <AlertShop
        type="success"
        isOpen={openPopupMessage}
        textAlert="Update product successfully!"
        onClose={() => setOpenPopupMessage(false)}
        handle={() => window.location.reload()}
      />
      <AlertShop
        type={typeDelete ? 'success' : 'error'}
        isOpen={isOpenAlertDelete}
        textAlert={
          typeDelete
            ? 'Delete product successfully!'
            : 'Ops! Product is currently being purchased!'
        }
        onClose={() => setIsOpenAlertDelete(false)}
        handle={() => (typeDelete ? window.location.reload() : '')}
      />
      <Card
        sx={{
          ':hover': { transform: 'translateY(-10px)' },
          transition: '0.25s',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <ProductImgStyle alt={name} src={image} onClick={goDetail} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link to="#" color="inherit" underline="hover" component={RouterLink}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">
              &nbsp;
              {fCurrency(price)}
            </Typography>
            <Box>
              <EditIcon
                sx={{ ':hover': { color: 'Highlight' } }}
                onClick={handleOpenPopupEdit}
              />
              <DeleteIcon
                sx={{ ':hover': { color: 'Highlight' } }}
                onClick={handleDeleteProduct}
              />
            </Box>
          </Stack>
        </Stack>
      </Card>
      <Dialog open={openPopup} onClose={handleClosePopup} maxWidth="lg">
        <Box width="800px" minHeight="500px" padding="30px" position="relative">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Update Product
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
                    value={branch}
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
                    value={metarial}
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
                    value={style}
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
                    value={technology}
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
                    value={color}
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
                    value={gender}
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  <Box
                    width="200px"
                    height="200px"
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                  >
                    {isLoadingImg ? (
                      <CircularProgress size={30} />
                    ) : (
                      <img
                        src={linkImg}
                        width="100%"
                        height="100%"
                        style={{ borderRadius: '20px', objectFit: 'cover' }}
                        alt="This is image"
                      />
                    )}
                  </Box>
                  <TextField type="file" onChange={handleSelectFile} />
                </Stack>
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
                Update Product
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </Dialog>
    </Box>
  );
}
