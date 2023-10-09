import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_ORGANIZATION, GET_SINGLE_USER, GET_SINGLE_TAG } from '../utils/queries';
import { SAVE_ORGANIZATION } from '../utils/mutations';
import { useSavedOrganizations } from '../utils/orgFunctions';
import DonateForm from '../components/DonateForm';
import ProgressBar from '../components/ProgressBar';
import images from '../utils/importPhotos'

const OrganizationPage = () => {
  console.log(Auth.getProfile())
  const { organizationId } = useParams();
  const [donateOpen, setDonateOpen] = useState(false);

  const { loading: userLoading, data: userData } = useQuery(GET_SINGLE_USER);
  const currentUser = userData?.getSingleUser || {};

  const { loading, data } = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: organizationId },
    }
  );
  const orgData = data?.getSingleOrganization || {};
  console.log("orgData:", orgData)
  const { loading: tagLoading, data: tagData } = useQuery(
    GET_SINGLE_TAG,
    {
      variables: { tagId: orgData.tag },
    }
  );
  const orgTag = tagData || {};

  const savedOrganizations = useSavedOrganizations();
  const [saveOrganization, { organizations, orgLoading, error }] = useMutation(SAVE_ORGANIZATION);

  const organizationData = data?.getSingleOrganization || {};
  if (loading || userLoading) {
    return <p>Still Loading...</p>
  }

  console.log(organizationData)
  var currentFunding = 0;
  if (organizationData.fundraisingAmount) {
    currentFunding = organizationData.fundraisingAmount;
  }


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
      <div className='md:container 2xl:w-1/3 mx-auto p-4'>

        <h2 className='font-main text-text-dark text-2xl md:text-3xl pb-4'
        >{organizationData.name}</h2>

        <img className='w-full mx-auto'
          src={organizationData.image} alt="organization profile image" />

        <p className='font-secondary text-center text-text-dark py-4 text-lg'
        >{organizationData.description}</p>

        <img className='mx-auto pb-4'
          src={images[orgTag?.getSingleTag?.image]} alt="" />

        <div className='bg-light-1 rounded-lg p-4 shadow-2xl'>

          <div className='flex flex-col justify-center items-center'>

            <p className='pb-2'
            >Currently Raised: ${currentFunding} / Our Goal: ${organizationData.fundraisingGoal}</p>

            <ProgressBar goal={organizationData.fundraisingGoal} amount={organizationData.fundraisingAmount} />

          </div>

          <div className='flex flex-col md:flex-row justify-center items-center'>

            <a className='w-full md:w-auto m-2'
            href={organizationData.link} target="_blank" rel="noopener noreferrer">
              <button className='font-secondary py-2 px-6 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all w-full md:w-auto hover:scale-105 hover:shadow-2xl'
              >Our site</button></a>

            {!currentUser.isAdmin && (
              <button
                disabled={savedOrganizations.some(organization => organization._id === organizationData._id)}
                className='btn-block btn-info font-secondary py-2 px-6 m-2 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all disabled:opacity-50 w-full md:w-auto hover:scale-105 hover:shadow-2xl'
                onClick={() => handleSaveOrganization(organizationData)}>
                {savedOrganizations?.some(organization => organization._id === organizationData._id)
                  ? 'Organization saved'
                  : 'Save Organization'}
              </button>
            )}

            <button className='font-secondary py-2 px-6 m-2 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all w-full md:w-auto hover:scale-105 hover:shadow-2xl'
              onClick={() => setDonateOpen(true)}>Donate</button>

          </div>
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
