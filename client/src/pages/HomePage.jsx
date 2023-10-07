import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORGANIZATIONS } from '../utils/queries'
import { Link } from 'react-router-dom';
import ForMe from '../components/ForMe'



const HomePage = () => {
  const { loading, data } = useQuery(GET_ORGANIZATIONS);
  const organizations = data?.getOrganizations || {};
  console.log(organizations)
  if (loading) {
    return <p>Still Loading...</p>
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const mutableOrganizations = [...organizations]
  shuffleArray(mutableOrganizations);
  const firstFewElements = mutableOrganizations.slice(0, 5);
  console.log(firstFewElements)

  return (
    <>
      {/* for you carousel */}
      <ForMe organizations= {organizations}/>

      <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
        {firstFewElements.map((organization) => {
          return (
            <div key={organization._id}>
              <Link to={`/organization/${organization._id}`}>
                <div className='m-4 md:m-6 w-80 bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl'>

                  <img className='w-full rounded-t-lg'
                    src={organization.image} alt="organization profile image" />

                  <h2 className='font-secondary text-text-light text-center p-2'
                  >{organization.name}</h2>

                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
