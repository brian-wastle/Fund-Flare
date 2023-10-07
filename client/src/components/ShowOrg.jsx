import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_ORGANIZATION } from "../utils/queries";
import ProgressBar from '../components/ProgressBar'

function ShowOrg(props) {
  const {loading:orgLoading, data:organizationData} = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: props.property },
    }
  );
  const orgData = organizationData?.getSingleOrganization||{};
  console.log(orgData)
  
  

  return (
    <>
      <p>{orgData.name}</p>
      <p>Tag:</p>
      <img src={orgData.image} style={{ width: '300px'}} alt={orgData.name + "profile image"} />
      <p>{orgData.tag}</p>
      <p>FundraisingGoal:</p>
      <p>${orgData.fundraisingAmount} / ${orgData.fundraisingGoal}</p> 
      <p></p>
      
      <ProgressBar goal={orgData.fundraisingGoal} amount={orgData.fundraisingAmount} />
      
    </>
  );
}

export default ShowOrg;
