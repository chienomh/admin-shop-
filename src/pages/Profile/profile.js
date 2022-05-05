import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';
import { registerAPI } from 'src/services/register';
import { Box } from '@mui/system';
import AlertShop from 'src/components/Alert';
import { useSelector } from 'react-redux';
import { changeProfile } from 'src/services/userAPI';

// ----------------------------------------------------------------------

export default function Profile() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(0);
  const [address, setAddress] = useState('');

  const user = useSelector(state => state.user).data;

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name required'),
    age: Yup.number().required('Age required').min(10, 'Too young'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    // gender: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      age: '',
      phone: '',
      address: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const params = {
        name,
        age,
        address,
        phone,
        email,
        id: user.id,
        gender: gender === 0 ? 'Men' : 'Women',
      };

      try {
        const data = await changeProfile(params);
        setShowAlert(true);
      } catch (error) {
        alert('Đăng kí thất bại');
      }
    },
  });
  useEffect(() => {
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setPhone(user.phone);
    setGender(user.gender === 'Women' ? 1 : 0);
    setAddress(user.address);
    setFieldValue('name', user.name);
    setFieldValue('age', user.age);
    setFieldValue('email', user.email);
    setFieldValue('phone', user.phone);
    setFieldValue('address', user.address);
  }, [user]);
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setValues,
    setFieldValue,
  } = formik;

  const genders = [0, 1];

  const handleAfterSuccess = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeName = e => {
    setName(e.target.value);
    setFieldValue('name', e.target.value);
  };

  const handleChangeAge = e => {
    setAge(e.target.value);
    setFieldValue('age', e.target.value);
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
    setFieldValue('email', e.target.value);
  };

  const handlChangePhone = e => {
    setPhone(e.target.value);
    setFieldValue('phone', e.target.value);
  };

  const handlChangeGender = e => {
    setGender(e.target.value);
  };

  const handlChangeAddress = e => {
    setAddress(e.target.value);
  };
  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop="100px">
      <FormikProvider value={formik}>
        <AlertShop
          isOpen={showAlert}
          type="success"
          textAlert="Sign up Sucessec"
          handle={handleAfterSuccess}
          onClose={handleCloseAlert}
        />
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                value={name}
                onChange={handleChangeName}
              />

              <TextField
                fullWidth
                label="Age"
                type="number"
                {...getFieldProps('age')}
                error={Boolean(touched.age && errors.age)}
                helperText={touched.age && errors.age}
                value={age}
                onChange={handleChangeAge}
              />
            </Stack>

            <TextField
              fullWidth
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              value={email}
              onChange={handleChangeEmail}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                type="text"
                label="Phone"
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                value={phone}
                onChange={handlChangePhone}
              />

              <TextField
                select
                fullWidth
                label="Gender"
                onChange={handlChangeGender}
                value={gender}
              >
                {genders.map(option => (
                  <MenuItem key={option} value={option}>
                    {option === 1 ? 'Women' : 'Men'}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <TextField
              fullWidth
              autoComplete="Address"
              type="text"
              label="Address"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
              value={address}
              onChange={handlChangeAddress}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Update
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}
