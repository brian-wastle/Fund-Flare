import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_TAGS, GET_ORGANIZATIONS } from '../utils/queries'
import ForMe from '../components/ForMe'
import OrgByTag from '../components/OrgByTag';
import { motion, AnimatePresence } from "framer-motion"

var tagSelection;


const Tags = () => {
  const [orgDisplay, setOrgDisplay] = useState(false);
  const { loading, data } = useQuery(GET_ALL_TAGS);
  const tags = data?.getAllTags || {};
  console.log("tags: ", tags)

  const { loading: organizationLoading, data: organizationData } = useQuery(GET_ORGANIZATIONS);
  const organizations = organizationData?.getOrganizations || {};
  console.log("organizations: ", organizations)

  if (loading) {
    return <p>Still Loading...</p>
  }


  const handleTagSelection = (event) => {
    event.preventDefault();
    tagSelection = event.target.id;
    console.log("tagSelection: ", event.target)
    setOrgDisplay(true)
  };


  if (orgDisplay) {

    return (
      <>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.6 } }}
            exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.6 } }}>

            <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center md:justify-start items-center mb-4'>
              <button onClick={() => setOrgDisplay(false)} className='mx-8 py-2 px-6 bg-primary font-secondary text-text-light rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl'
              >Back to Tags</button>
            </div>

            <OrgByTag property={tagSelection} />
          </motion.div>
        </AnimatePresence>
      </>

    )
  };

  if (organizations.length) {




    return (
      <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.6 } }}
            exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.6 } }}>


            {orgDisplay
              ?
              ""
              :
              <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
                {tags.map((tag) => (
                  <button key={tag._id} id={tag._id} onClick={() => handleTagSelection(event)} className='m-4 md:m-6 w-80 bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl'>
                    <h2 value={tag._id} id={tag._id} className='font-secondary text-text-light text-center p-2'>{tag.name}</h2>
                  </button>
                ))}
              </div>
            }
          </motion.div>
      </>
    );
  }
};

export default Tags;
