import { useState } from 'react';
import { motion } from "framer-motion"
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';


const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const [isOrg, setIsOrg] = useState(false);

  const toggleOrg = () => {
    setIsOrg(!isOrg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
      isAdmin: isOrg,
      image: null,
    });
  };
  console.log(userFormData);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { input: { ...userFormData } },
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
