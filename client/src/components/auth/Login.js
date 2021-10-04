import React from 'react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikMuiField from './FormikMuiField';
import { Button, Container } from '@mui/material';
import { loginReq } from '../services/auth';

// use 'react-toastify' to show toast notification
function Register() {
  const initialValues = {
    email: 'yest@gmail.com',
    password: 'j,b,jbkbkkuggu',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please Enter a Valid E-Mail Address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters long.')
      .required('Required'),
  });

  const onSubmit = async (values) => {
    // console.log(values);
    const submitValues = JSON.parse(JSON.stringify(values, null, 2));
    let response = { message: 'null' };
    response = await loginReq(submitValues);
    console.log(response, response.data);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '700px',
            mx: 'auto',
            mt: '50px',
          }}
        >
          <Form autoComplete="off" noValidate>
            <FormikMuiField name="email" label="E-Mail" />
            <FormikMuiField name="password" label="Password" type="password" />
            <Button
              type="submit"
              variant="outlined"
              sx={{ mt: '30px' }}
              size="large"
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Formik>
    </div>
  );
}

export default Register;
