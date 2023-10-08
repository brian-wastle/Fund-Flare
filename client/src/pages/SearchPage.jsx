import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import ProgressBar from '../components/ProgressBar';
import { GET_SEARCH } from '../utils/queries';
var searchQuery;

const SearchPage = () => {
const [skip, setSkip] = useState(false);
var inputRef = useRef(null);

function handleInputEntry(event) {
  inputRef = event.target.value
  searchQuery = inputRef;
}

const { loading:searchLoading, data:searchData } = useQuery(
  GET_SEARCH, 
  {
  variables: { searchParams: searchQuery }
  }
)


const orgData = searchData?.getSearch||{};

  return (
    <>
      <input
        type="text"
        placeholder="search"
        name="search"
        onChange={() => handleInputEntry(event)}
      />
      <button onClick={() => setSkip(false)}>Search</button>

      {
        (orgData.length) ?
        <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
              {orgData?.map((organization) => {
                return (
                  <div key={organization._id}>
                    <Link to={`/organization/${organization._id}`}>
                      <div className="m-4 md:m-6 w-80 bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                        <img
                          className="w-full rounded-t-lg"
                          src={organization.image}
                          alt="organization profile image"
                        />

                        <h2 className="font-secondary text-text-light text-center p-2">
                          {organization.name}
                        </h2>
                        <div className="flex justify-center items-center">
                          <ProgressBar
                            instance={organization._id}
                            goal={organization.fundraisingGoal}
                            amount={organization.fundraisingAmount}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })} </div> 
              :
               ''
      }
    </>
  );
};

export default SearchPage;
