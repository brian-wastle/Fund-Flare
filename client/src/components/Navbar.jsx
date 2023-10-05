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

      <button className='absolute top-10 right-10 text-2xl text-text-dark inline'
        onClick={() => setMenuOpen(true)}>menu</button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.2 } }}
            exit={{ opacity: 0, x: 300, transition: { ease: "easeIn", duration: 0.2 } }}
            className='absolute top-0 right-0 w-full h-full'>
            <div onClick={() => setMenuOpen(false)}
              className='absolute top-0 w-full h-full z-20' />

            <div className='absolute right-0 top-32 z-30 container w-full sm:w-64'>

              <Link to="/signup"><button
                className='font-secondary text-2xl text-text-dark w-full p-4 bg-light-2 border-l-8 border-primary hover:border-secondary transition-all duration-300'
              >signup</button></Link>

              <br />

              <Link to="/search"><button
                className='font-secondary text-2xl text-text-dark w-full p-4 bg-light-2 border-l-8 border-primary hover:border-secondary transition-all duration-300'
              >search</button></Link>

              <br />

              <Link to="/tags"><button
                className='font-secondary text-2xl text-text-dark w-full p-4 bg-light-2 border-l-8 border-primary hover:border-secondary transition-all duration-300'
              >tags</button></Link>

              <br />

              <button className='font-secondary text-2xl text-text-dark w-full p-4 bg-light-2 border-l-8 border-primary hover:border-secondary transition-all duration-300'
                onClick={() => { setLoginOpen(true), setMenuOpen(false) }}>login</button>

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
