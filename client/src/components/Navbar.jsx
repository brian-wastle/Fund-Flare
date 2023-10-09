import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_USER } from '../utils/queries';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { loading, data } = useQuery(GET_SINGLE_USER);
  const userData = data?.getSingleUser || {};
  console.log(userData)
  return (
    <>
      <h1 className='font-main text-4xl md:text-6xl text-center py-8 text-primary'
      ><Link to="/">FundFlare</Link></h1>

      <button className='absolute top-8 right-5 md:top-10 md:right-10 text-2xl text-text-dark transition-all duration-200 hover:scale-110'
        onClick={() => setMenuOpen(true)}>menu</button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.4 } }}
            exit={{ opacity: 0, x: 300, transition: { ease: "easeIn", duration: 0.4 } }}
            className='absolute top-0 right-0 w-full h-full z-50'>
            <div onClick={() => setMenuOpen(false)}
              className='absolute top-0 w-full h-full z-20' />

            <div className='absolute right-0 top-32 z-30 container w-full sm:w-64'>

              {Auth.loggedIn() ? (
                <>
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: 0 }}
                    transition={{ duration: 0.4 }}>
                    <button className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                      onClick={() => { Auth.logout(), setMenuOpen(false) }}>logout</button>
                  </motion.div>

                  <motion.div
                    initial={{ x: 30 }}
                    animate={{ x: 0 }}
                    exit={{ x: 30 }}
                    transition={{ duration: 0.4 }}>
                    <Link to={`/profile/${Auth.getProfile().data._id}`}><button
                      className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                      onClick={() => setMenuOpen(false)}>profile</button></Link>
                  </motion.div>

                  {userData.isAdmin && userData.myOrganizationId && (
                    <motion.div
                      initial={{ x: 60 }}
                      animate={{ x: 0 }}
                      exit={{ x: 60 }}
                      transition={{ duration: 0.4 }}>
                      <Link to={`/organization/${userData.myOrganizationId}`}><button
                        className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                        onClick={() => setMenuOpen(false)}>my organization</button></Link>
                    </motion.div>
                  )}
                </>
              ) : (
                <button className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                  onClick={() => { setLoginOpen(true), setMenuOpen(false) }}>login</button>
              )}


              <motion.div
                initial={{ x: 90 }}
                animate={{ x: 0 }}
                exit={{ x: 90 }}
                transition={{ duration: 0.4 }}>
                <Link to="/search"><button
                  className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                  onClick={() => setMenuOpen(false)}>search</button></Link>
              </motion.div>

              <motion.div
                initial={{ x: 120 }}
                animate={{ x: 0 }}
                exit={{ x: 120 }}
                transition={{ duration: 0.4 }}>
                <Link to="/tags"><button
                  className='font-main text-2xl text-text-dark hover:text-primary w-full p-4 bg-light-2 border-l-8 border-secondary hover:border-primary transition-all duration-300 hover:md:scale-110'
                  onClick={() => setMenuOpen(false)}>browse</button></Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.2 } }}
            exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.2 } }}
            className='absolute top-0 w-full h-full z-10'>


            <div onClick={() => setLoginOpen(false)}
              className='absolute top-0 w-full h-full bg-black opacity-50' />

            <motion.div
              initial={{ scale: 0.75 }}
              animate={{ scale: 1, transition: { ease: "easeOut", duration: 0.2 } }}
              exit={{ scale: 0.75, transition: { ease: "easeIn", duration: 0.2 } }}>
              <LoginForm />
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppNavbar;
