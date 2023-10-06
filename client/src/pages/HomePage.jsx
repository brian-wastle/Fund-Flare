import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORGANIZATIONS } from '../utils/queries'
import { Link } from 'react-router-dom';



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
      <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
        {firstFewElements.map((organization) => {
          return (
            <div key={organization.id}>

              <div className='p-4 m-4 flex flex-col justify-center items-center bg-secondary rounded-lg'>

                <h2><Link to={`/organization/${organization._id}`}>{organization.name}</Link></h2>
                <p><img src={organization.image} alt="organization profile image" /></p>
                <h2><a href={organization.link} target="_blank" rel="noopener noreferrer">{organization.link}</a></h2>

              </div>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
