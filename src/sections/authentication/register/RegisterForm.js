import * as Yup from 'yup';
import { useState } from 'react';
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
import Iconify from '../../../components/Iconify';
import { registerAPI } from 'src/services/register';
import { Box } from '@mui/system';
import AlertShop from 'src/components/Alert';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Name required'),
    age: Yup.number().required('Age required').min(10, 'Too young'),
    userName: Yup.string().required('User name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      age: '',
      phone: '',
      address: '',
      userName: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const params = {
        name: getFieldProps('name').value,
        age: getFieldProps('age').value,
        roles: ['ROLE_ADMIN'],
        username: getFieldProps('userName').value,
        password: getFieldProps('password').value,
        address: getFieldProps('address').value,
        gender: getFieldProps('gender').value ? 'Woment' : 'Men',
        phone: getFieldProps('phone').value,
        email: getFieldProps('email').value,
      };

      try {
        const data = await registerAPI(params);
        setShowAlert(true);
      } catch (error) {
        alert('Đăng kí thất bại');
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const gender = [0, 1];

  const handleAfterSuccess = () => {
    navigate('/login', { replace: true });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
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
            />

            <TextField
              fullWidth
              label="Age"
              type="number"
              {...getFieldProps('age')}
              error={Boolean(touched.age && errors.age)}
              helperText={touched.age && errors.age}
            />
          </Stack>

          <TextField
            fullWidth
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="User Name"
            {...getFieldProps('userName')}
            error={Boolean(touched.userName && errors.userName)}
            helperText={touched.userName && errors.userName}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              type="number"
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <TextField
              select
              fullWidth
              label="Gender"
              {...getFieldProps('gender')}
            >
              {gender.map(option => (
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
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
