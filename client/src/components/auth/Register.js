import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikMuiField from './FormikMuiField';
import { Button, Container } from '@mui/material';
import { registerReq } from '../services/auth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router';
import LoginWithGoogle from './LoginWithGoogle';

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [message, setMessage] = useState('');
  const initialValues = {
    name: 'test',
    email: 'yest@gmail.com',
    password: 'j,b,jbkbkkuggu',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Minimum 2 letters.')
      .max(20, 'Maximum 20 letters.')
      .required('Required'),
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
    response = await registerReq(submitValues);
    if (response.status == 200) {
      setMessage('Logged In Successfully');
    }
    // Saving the response data in local storage and redux
    window.localStorage.setItem('auth', JSON.stringify(response.data));
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: response.data,
    });
    history.push('/dashboard');
  };

  useEffect(() => {
    if (window.localStorage.getItem('auth')) {
      console.log(window.localStorage.getItem('auth'));
      console.log('Use effect in Register ran');
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: JSON.parse(window.localStorage.getItem('auth')),
      });
    }
    return () => {
      //cleanup
    };
  }, []);

  const loggedInMsg = <Alert severity="success">Successfully Logged In</Alert>;

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
            <FormikMuiField name="name" label="Name" />
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
            {message && loggedInMsg}
          </Form>
          <LoginWithGoogle />
        </Container>
      </Formik>
    </div>
  );
}

export default Register;
