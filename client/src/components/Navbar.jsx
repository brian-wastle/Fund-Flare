import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {

  return (
    <>
    <Link to="/"><h1
    className='text-5xl text-gray-400 text-center pt-8'
    >Home</h1></Link>
    <Link to="/signup"><h1
    className='text-2xl text-gray-400 inline p-4'
    >signup</h1></Link>
    <Link to="/search"><h1
    className='text-2xl text-gray-400 inline p-4'
    >search</h1></Link>
    <Link to="/tags"><h1
    className='text-2xl text-gray-400 inline p-4'
    >tags</h1></Link>

    </>
  );
};

export default AppNavbar;
