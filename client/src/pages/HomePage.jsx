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
console.log(mutableOrganizations)

  return (
    <>
      {mutableOrganizations.map((organization) => {
        return (
          <div key={organization.id}>
            <Link to={`/organization/${organization._id}`}>{organization.name}</Link>
            <p>{organization.description}</p>
            <p><img src={organization.image} alt="organization profile image" /></p>
            <a href={organization.link}>{organization.link}</a>

          </div>
        );
      })}
    </>
  );
};

export default HomePage;
