import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_TAGS, GET_ORGANIZATIONS } from '../utils/queries'
import { Link } from 'react-router-dom';
import ForMe from '../components/ForMe'



const Tags = () => {
    const { loading, data } = useQuery(GET_ALL_TAGS);
    const tags = data?.getAllTags || {};
    console.log(tags)

    const { loading: organizationLoading, data: organizationData } = useQuery(GET_ORGANIZATIONS);
    const organizations = organizationData?.getOrganizations || {};
    console.log(organizations)

    if (loading) {
        return <p>Still Loading...</p>
    }

    if (organizations.length){

   
    return (
        <>
          <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
            {tags.map((tag) => (
              <div key={tag._id} className='m-4 md:m-6 w-80 bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl'>
                <h2 className='font-secondary text-text-light text-center p-2'>{tag.name}</h2>
                <div className="organization-list">
                  {organizations
                    .filter((organization) => organization.tag === tag._id)
                    .map((organization) => (
                      <Link to={`/organization/${organization._id}`} key={organization._id}>
                        <h3 className='font-secondary text-text-light text-center p-2'>{organization.name}</h3>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
};

export default Tags;
