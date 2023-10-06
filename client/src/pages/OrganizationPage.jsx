import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_ORGANIZATION, GET_SINGLE_USER } from '../utils/queries';
import { SAVE_ORGANIZATION } from '../utils/mutations';
import { useSavedOrganizations } from '../utils/orgFunctions';
import DonateForm from '../components/DonateForm';

const OrganizationPage = () => {
  console.log(Auth.getProfile())
  const { organizationId } = useParams();
  const [donateOpen, setDonateOpen] = useState(false);

  const { loading: userLoading, data: userData } = useQuery(GET_SINGLE_USER);
  const currentUser = userData?.getSingleUser || {};

  console.log(currentUser)

  const { loading, data } = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: organizationId },
    }
  );
  const savedOrganizations = useSavedOrganizations();
  const [saveOrganization, { organizations, orgLoading, error }] = useMutation(SAVE_ORGANIZATION);
 
  const organizationData = data?.getSingleOrganization || {};
  if (loading || userLoading) {
    return <p>Still Loading...</p>
  }

  console.log(organizationData)


  const handleSaveOrganization = async (orgData) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const saveOrganizationInput = {
        _id: orgData._id,
        name: orgData.name,
        description: orgData.description,
        image: orgData.image,
        link: orgData.link
      }

      const { data } = await saveOrganization({
        variables: { input: { ...saveOrganizationInput } },
      });

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
      <div className='md:container 2xl:w-1/2 p-8 my-8 mx-auto bg-light-2 drop-shadow-sm md:rounded-md'>
        <div className='flex flex-col justify-center items-center'>

          <h2>{organizationData.name}</h2>

          <h4>{organizationData.tag}</h4>

          <img src={organizationData.image} alt="organization profile image" />

          <p>{organizationData.description}</p>

          <a href={organizationData.link} target="_blank" rel="noopener noreferrer">
            <button className='font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all'
            >Our site</button></a>

          {!currentUser.isAdmin && (
            <button
              disabled={savedOrganizations.some(organization => organization._id === organizationData._id)}
              className='btn-block btn-info font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all disabled:opacity-50'
              onClick={() => handleSaveOrganization(organizationData)}>
              {savedOrganizations?.some(organization => organization._id === organizationData._id)
                ? 'Organization is Saved in your Profile'
                : 'Save Organization to Profile!'}
            </button>
          )}

          <button className='font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all'
            onClick={() => setDonateOpen(true)}>Donate</button>
        </div>
      </div>

      <AnimatePresence>
        {donateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.2 } }}
            exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.2 } }}
            className='absolute top-0 w-full h-full z-10'>


            <div onClick={() => setDonateOpen(false)}
              className='absolute top-0 w-full h-full bg-black opacity-50' />

            <motion.div
              initial={{ scale: 0.75 }}
              animate={{ scale: 1, transition: { ease: "easeOut", duration: 0.2 } }}
              exit={{ scale: 0.75, transition: { ease: "easeIn", duration: 0.2 } }}>
              <DonateForm organizationName={organizationData.name}></DonateForm>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default OrganizationPage;
