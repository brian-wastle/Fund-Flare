import { useState, useEffect } from 'react';
import { GET_SINGLE_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const ForMe = () => {
  
  const {loading, data} = useQuery(GET_SINGLE_USER);
  const userData = data?.getSingleUser||{};
  console.log(userData)
  if (loading) {
    return <p>Still Loading...</p>
  }

  return (
    <>
      
    </>
  );
};

export default ForMe;
