import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { motion } from "framer-motion"

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


const LoginForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0}}
        transition={{ duration: 0.5 }}
      >

        <div className='md:container 2xl:w-1/2 xl:w-3/4 p-8 m-8 mx-auto bg-light-2 drop-shadow-sm md:rounded-lg'>

          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your signup!
            </Alert>

            <Form.Group className='mb-3'>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email address'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
              disabled={!(userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
          </Form>
          <Link to="/signup"><h1
            className='text-lg text-gray-400 text-center pt-2'
          >Don't have an account?</h1></Link>
        </div>

      </motion.div>
    </>
  );
};

export default LoginForm;
