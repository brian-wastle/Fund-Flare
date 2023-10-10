import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORGS_BY_TAGID, GET_SINGLE_TAG } from "../utils/queries";
import { Link } from 'react-router-dom';
var orgsRetrieved = false;

function OrgByTag({ property }) {
  console.log("property: ", property)
  const { loading: orgLoading, data: orgData } = useQuery(
    GET_ORGS_BY_TAGID,
    {
      variables: { tagId: property }
    }
  )
  const { loading: tagLoading, data: tagData } = useQuery(
    GET_SINGLE_TAG,
    {
      variables: { tagId: property }
    }
  )
  orgsRetrieved = orgData?.getOrgsByTagId.length || false;

  return (
    <>

      <h2 className="font-main text-center text-primary text-2xl"
      >Showing all organizations with the tag "{tagData?.getSingleTag.name}"</h2>
      {orgsRetrieved
        ?
        <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
          {orgData.getOrgsByTagId.map((organization) => (
            <Link to={`/organization/${organization._id}`} key={organization._id}>
              <div className="m-4 md:m-6 w-80 bg-light-1 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-2xl">
                <img
                  className="w-full rounded-t-lg"
                  src={organization.image}
                  alt="organization profile image" />

                <h2 className='font-main text-text-dark text-center pt-2'
                >{organization.name}</h2>

                <h3 className='font-secondary text-text-dark text-center pb-1'
                ><span className='font-main text-xl text-secondary'
                >${organization.fundraisingAmount}</span> Raised of <span className='font-main text-xl text-secondary'
                >${organization.fundraisingGoal}</span> Goal</h3>

              </div>
            </Link>
          ))}
        </div>
        :
        <div>
          <h3 className="font-secondary text-xl text-center text-text-dark my-8">Nothing here yet...</h3>
        </div>
      }
    </>
  );
}

export default OrgByTag;
