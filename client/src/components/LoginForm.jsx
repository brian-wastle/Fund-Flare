import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


const LoginForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
      <div className='md:container 2xl:w-1/2 xl:w-3/4 p-8 my-40 mx-auto bg-light-2 drop-shadow-2xl md:rounded-lg'>

        <form onSubmit={handleFormSubmit} className='form login-form flex flex-col justify-center items-center'>

          <input
            className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
            type='email'
            placeholder='email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />

          <input
            className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
            type='password'
            placeholder='password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />

          <button
            className='font-secondary py-2 px-6 m-2 rounded-lg bg-secondary hover:bg-primary text-light-1 transition-all disabled:bg-black'
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </button>

        </form>

        <Link to="/signup" onClick={() => setIsOpen(false)}><h1
          className='text-lg text-gray-400 text-center pt-2'
        >Don't have an account?</h1></Link>

      </div>
    </>
  );
};

export default LoginForm;
