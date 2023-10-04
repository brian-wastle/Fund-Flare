import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"

import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Link to="/"><h1
        className='text-5xl text-gray-400 text-center pt-8'
      >Home</h1></Link>

      <h1 className='absolute top-5 right-5 text-2xl text-gray-400 inline p-4' onClick={() => setMenuOpen(true)}>menu</h1>
      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)}
            className='absolute top-0 w-full h-full bg-black opacity-50 z-20' />

          <div className='absolute top-20 right-20 z-30'>
            <Link to="/signup"><h1
              className='text-2xl text-gray-400 inline p-4'
            >signup</h1></Link>
            <Link to="/search"><h1
              className='text-2xl text-gray-400 inline p-4'
            >search</h1></Link>
            <Link to="/tags"><h1
              className='text-2xl text-gray-400 inline p-4'
            >tags</h1></Link>

            <h1 className='text-2xl text-gray-400 inline p-4' onClick={() => setLoginOpen(true)}>login</h1>
          </div>

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
      )}
    </>
  );
};

export default AppNavbar;
