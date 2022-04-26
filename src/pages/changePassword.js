import { LoadingButton } from '@mui/lab';
import { Alert, Container, Stack, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useFormik, Form, FormikProvider } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Page from 'src/components/Page';
import { ChangePasswordAPI } from 'src/services/userAPI';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AlertShop from 'src/components/Alert';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

//------------------------------------------------------------

export default function ChangePassword() {
  const schema = yup.object().shape({
    oldPassword: yup.string().required('This fiedl is required'),
    newPassword: yup.string().required('This field is required'),
    confirmNewPassword: yup.string().required('This field is required'),
  });

  const { user } = useSelector(state => state);

  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },

    validationSchema: schema,
    onSubmit: async () => {
      const params = {
        newPassword: getFieldProps('newPassword').value,
        oldPassword: getFieldProps('oldPassword').value,
        username: user.data.user_name,
      };
      await ChangePasswordAPI(params);
      setOpenAlert(true);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    form;

  //----------------------------------------------------
  return (
    <>
      <RootStyle title="Change Password">
        <Container>
          <AlertShop
            isOpen={openAlert}
            textAlert="Change Password successfully!"
            type="success"
            onClose={() => setOpenAlert(false)}
            handle={() => {
              navigate('/dashboard/app', { replace: true });
            }}
          />
          <FormikProvider value={form}>
            <Box
              minHeight="100vh"
              padding="50px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width="500px">
                <Box fontWeight="700" fontSize="26px" marginBottom="20px">
                  Change Password
                </Box>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Old Password"
                      {...getFieldProps('oldPassword')}
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                      helperText={touched.oldPassword && errors.oldPassword}
                    />
                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="New Password"
                      {...getFieldProps('newPassword')}
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      helperText={touched.newPassword && errors.newPassword}
                    />
                    <TextField
                      fullWidth
                      autoComplete="username"
                      type="text"
                      label="Confirm New Password"
                      {...getFieldProps('confirmNewPassword')}
                      error={Boolean(
                        touched.confirmNewPassword && errors.confirmNewPassword,
                      )}
                      helperText={
                        touched.confirmNewPassword && errors.confirmNewPassword
                      }
                    />
                  </Stack>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ marginTop: '20px' }}
                  >
                    Change Password
                  </LoadingButton>
                </Form>
              </Box>
            </Box>
          </FormikProvider>
        </Container>
      </RootStyle>
    </>
  );
}
