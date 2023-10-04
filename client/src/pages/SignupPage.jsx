import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';


const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [isOrg, setIsOrg] = useState(false);

  const toggleOrg = () => {
    setIsOrg(!isOrg);
  };

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

      Auth.login(data.addUser.token);


    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className='md:container 2xl:w-1/2 xl:w-3/4 p-8 m-8 mx-auto bg-light-2 drop-shadow-sm md:rounded-lg'>
          <label>
            Are you an organization?
            <input
              type="checkbox"
              checked={isOrg}
              onChange={toggleOrg}
            />
          </label>

          <form noValidate validated={validated} onSubmit={handleFormSubmit}>

            <input
              type='text'
              placeholder='Your organization'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />

            <input
              type='email'
              placeholder='Your email address'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />

            <input
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />

            <button
              disabled={!(userFormData.username && userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </button>

          </form>

        </div>

      </motion.div>
    </>
  );
};

export default SignupForm;
