import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import ProgressBar from '../components/ProgressBar';
import { GET_SEARCH } from '../utils/queries';
import { motion, AnimatePresence } from "framer-motion"
var searchQuery;

const SearchPage = () => {
  const [skip, setSkip] = useState(false);
  var inputRef = useRef(null);

  function handleInputEntry(event) {
    inputRef = event.target.value
    searchQuery = inputRef;
  }

  const { loading: searchLoading, data: searchData } = useQuery(
    GET_SEARCH,
    {
      variables: { searchParams: searchQuery }
    }
  )


  const orgData = searchData?.getSearch || {};
  console.log("orgData: ", orgData)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.6 } }}
        exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.6 } }}>

        <div className='md:container 2xl:w-2/3 mx-auto flex flex-row justify-center items-center'>

          <input className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-2'
            type="text"
            placeholder="search"
            name="search"
            onChange={() => handleInputEntry(event)}
          />
          <button className='font-secondary py-2 px-6 m-2 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all'
            onClick={() => setSkip(false)}>Search</button>
        </div>

        {
          (orgData.length) ?
            <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
              {orgData?.map((organization) => {
                return (
                  <div key={organization._id}>
                    <Link to={`/organization/${organization._id}`}>
                      <div className="relative m-4 md:m-6 w-80 bg-light-1 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-2xl">
                        <img
                          className="w-full rounded-t-lg"
                          src={organization.image}
                          alt="organization profile image"
                        />

                        <div className="absolute bottom-12 w-full">
                          <ProgressBar
                            instance={organization._id}
                            goal={organization.fundraisingGoal}
                            amount={organization.fundraisingAmount}
                          />
                        </div>

                        <h2 className="font-main text-text-dark text-center pt-4">
                          {organization.name}
                        </h2>

                        <h3 className='font-secondary text-text-dark text-center pb-1'
                    ><span className='font-main text-xl text-secondary'
                    >${organization.fundraisingAmount}</span> Raised of <span className='font-main text-xl text-secondary'
                    >${organization.fundraisingGoal}</span> Goal</h3>

                      </div>
                    </Link>
                  </div>
                );
              })} </div>
            :
            ''
        }
      </motion.div>
    </>
  );
};

export default SearchPage;
