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
      <h2 className='font-main text-text-dark text-3xl text-center opacity-50'
      >Welcome back {userData.username}!</h2>

      {/*conditional rendering based on whether profile is an admin or a user */}
      {userData.isAdmin === false ? (
        // is user profile
        <>

          <div className='bg-light-2 mt-4'>

            <h3 className='font-main text-primary text-2xl py-4 text-center'
            >Saved Organizations</h3>

            <Carousel orgs={userData.savedOrganizations} />

          </div>

          <h3 className='font-main text-primary text-2xl pt-8 md:pt-12 text-center'
          >Order History</h3>

          <div className='md:container 2xl:w-2/3 mx-auto flex flex-col-reverse justify-center items-center'>
            {userData.orderHistory.map((order) => {
              return (
                <>
                  <div className='bg-light-1 m-2 p-4 rounded-lg w-2/3 shadow-2xl'>

                    <h3 className='text-center text-2xl py-1'
                    >{order.organizationName}</h3>

                    <h3 className='text-center text-xl py-1 text-green-600'
                    >${order.orderTotal}</h3>

                    <h3 className='text-center py-1'
                    >Completed on: {order.orderDate}</h3>

                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        // is admin profile
        <div>

          {userData.myOrganizationId
            ?
            <div className='bg-light-2 pb-8 mt-4'>
              <h2 className='font-main text-primary text-3xl py-4 text-center'
              >My Organization</h2>
              <ShowOrg property={userData.myOrganizationId} />
            </div>
            :
            <div className="createOrgButton mt-8">
              <div className='md:container 2xl:w-2/3 mx-auto flex flex-col justify-center items-center mb-4'>

                <h3 className='font-secondary text-text-dark text-xl py-1 text-center'
                >It doesn't look like you've set up an organization yet...</h3>

                <h3 className='font-secondary text-text-dark text-xl py-1 text-center'
                >Click the button below to get started on your fundraising project!</h3>

                <button className='font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all'
                  onClick={() => setOrgSetupOpen(true)}>Setup Organization</button>

              </div>
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