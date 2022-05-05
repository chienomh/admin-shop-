import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, TextField } from '@mui/material';
import * as Yup from 'yup';

import { Box } from '@mui/system';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import { addCoupon } from 'src/services/coupon';
import AlertShop from 'src/components/Alert';

export default function PopupAdd(props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [percent, setPersent] = useState(0);
  const [openMess, setOpenMess] = useState(false);
  const [type, setType] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('This is required'),
    code: Yup.string().required('This is required'),
    percent: Yup.number().required('This is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      percent: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      const params = {
        name,
        code,
        percent,
      };
      try {
        await addCoupon(params);
        setOpenMess(true);
        setType(true);
      } catch (error) {
        setOpenMess(true);
        setType(false);
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

  const handlChangeName = e => {
    setName(e.target.value);
    setFieldValue('name', e.target.value);
  };
  const handlChangeCode = e => {
    setCode(e.target.value);
    setFieldValue('code', e.target.value);
  };
  const handlChangePercent = e => {
    setPersent(e.target.value);
    setFieldValue('percent', e.target.value);
  };
  return (
    <Dialog open={props.open} maxWidth="lg" onClose={props.handlClose}>
      <AlertShop
        isOpen={openMess}
        type={type ? 'success' : 'error'}
        textAlert={type ? 'Add coupon Successfully!' : 'Add coupon Faild!'}
        handle={() => {
          setOpenMess(false);
          props.handlClose();
        }}
        onClose={() => setOpenMess(false)}
      />
      <FormikProvider value={formik}>
        <Form>
          <Box
            minWidth="500px"
            minHeight="300px"
            position="relative"
            padding="50px 20px"
          >
            <CloseIcon
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: '20px',
                right: '20px',
              }}
              onClick={props.handlClose}
            />
            <Box marginBottom="20px">
              <TextField
                fullWidth
                label="Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                value={name}
                onChange={handlChangeName}
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                fullWidth
                label="Code"
                {...getFieldProps('code')}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
                value={code}
                onChange={handlChangeCode}
              />
            </Box>
            <Box marginBottom="20px">
              <TextField
                fullWidth
                label="Percent"
                {...getFieldProps('percent')}
                error={Boolean(touched.percent && errors.percent)}
                helperText={touched.percent && errors.percent}
                value={percent}
                onChange={handlChangePercent}
              />
            </Box>
            <Box>
              <Button variant="contained" fullWidth type="submit">
                Add
              </Button>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </Dialog>
  );
}
