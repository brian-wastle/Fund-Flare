import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_USER, GET_SINGLE_ORGANIZATION } from '../utils/queries';
import CreateOrgForm from '../components/CreateOrg'
import ShowOrg from '../components/ShowOrg'
import Carousel from '../components/Carousel';
import { motion, AnimatePresence } from "framer-motion"
import images from '../utils/importPhotos'

const ProfilePage = () => {
  const [orgSetupOpen, setOrgSetupOpen] = useState(false);
  const [show, setShow] = useState(true);
  const { loading, data } = useQuery(GET_SINGLE_USER);

  const userData = data?.getSingleUser || {};
  console.log(userData)
  if (loading) {
    return <p>Still Loading...</p>
  }
  return (
    <>
      <h2 className='text-3xl'
      >{userData.username}'s profile</h2>

      {/*conditional rendering based on whether profile is an admin or a user */}
      {userData.isAdmin === false ? (
        // is user profile
        <>
          <h3 className='text-2xl'
          >Saved Organizations</h3>
          <Carousel orgs={userData.savedOrganizations} />
          <br />
          Order History
          {userData.orderHistory.map((order) => {
            return (
              <>
                <p>{order.organizationName}</p>
                <p>Completed on: {order.orderDate}</p>
                <p>${order.orderTotal}</p>
              </>
            );
          })}
        </>
      ) : (
        // is admin profile
        <div>

          <h2 className='text-2xl'>My Organization</h2>

          {userData.myOrganizationId
            ?
            <ShowOrg property={userData.myOrganizationId} />
            :
            <div className="createOrgButton">
              <p>It doesn't look like you've set up an organization yet...</p>
              <p>Click the button below to get started on your fundraising project!</p>
              <button className='font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all'
                onClick={() => setOrgSetupOpen(true)}>Setup Organization</button>
            </div>
          }

        </div>
      )}

      <AnimatePresence>
        {orgSetupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.2 } }}
            exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.2 } }}
            className='absolute top-0 w-full h-full z-10'>

            <div onClick={() => setOrgSetupOpen(false)}
              className='absolute top-0 w-full h-full bg-black opacity-50' />

            <motion.div
              initial={{ scale: 0.75 }}
              animate={{ scale: 1, transition: { ease: "easeOut", duration: 0.2 } }}
              exit={{ scale: 0.75, transition: { ease: "easeIn", duration: 0.2 } }}>
              <CreateOrgForm />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default ProfilePage;