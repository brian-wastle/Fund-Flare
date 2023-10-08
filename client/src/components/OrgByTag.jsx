import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ORGS_BY_TAGID, GET_SINGLE_TAG } from "../utils/queries";
import { Link } from 'react-router-dom';
var orgsRetrieved = false;

function OrgByTag({property}) {
    console.log("property: ", property)
    const { loading:orgLoading, data:orgData } = useQuery(
        GET_ORGS_BY_TAGID, 
        {
        variables: { tagId: property }
        }
      )
      const { loading:tagLoading, data:tagData } = useQuery(
        GET_SINGLE_TAG, 
        {
        variables: { tagId: property }
        }
      )
    orgsRetrieved = orgData?.getOrgsByTagId.length || false;

  return (
    <>
    
    <p>Showing all organizations with the tag "{tagData?.getSingleTag.name}"</p>
      {orgsRetrieved
            ? 
            <div className='md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
              {orgData.getOrgsByTagId.map((organization) => (
                <Link className="m-4 md:m-6 w-80 bg-primary rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl" to={`/organization/${organization._id}`} key={organization._id}>
                <h3 className='font-secondary text-text-light text-center p-2'>{organization.name}</h3>
                </Link>
              ))}
            </div>
            : 
            <div>
                <p>Nothing here yet...</p>
            </div>
          }
    </>
  );
}

export default OrgByTag;
