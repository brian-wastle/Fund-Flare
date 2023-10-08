import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_ORGANIZATION, GET_SINGLE_TAG } from "../utils/queries";
import ProgressBar from '../components/ProgressBar'
import images from '../utils/importPhotos'

function ShowOrg(props) {
  const {loading:orgLoading, data:organizationData} = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: props.property },
    }
  );
  const orgData = organizationData?.getSingleOrganization||{};
  console.log(orgData)
  
  const {loading:tagLoading, data:tagData} = useQuery(
    GET_SINGLE_TAG,
    {
      variables: { tagId: orgData.tag },
    }
  );
console.log("tagData: ",tagData)
  return (
    <>
      <p>{orgData.name}</p>
      <img src={orgData.image} style={{ width: '300px'}} alt={orgData.name + "profile image"} />

      <img src={images[tagData?.getSingleTag?.image]} alt="" />
      <p>FundraisingGoal:</p>
      <p>${orgData.fundraisingAmount} / ${orgData.fundraisingGoal}</p> 
      <p></p>
      
      <ProgressBar goal={orgData.fundraisingGoal} amount={orgData.fundraisingAmount} />
      
    </>
  );
}

export default ShowOrg;
