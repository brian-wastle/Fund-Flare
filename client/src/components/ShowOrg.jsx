import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_ORGANIZATION, GET_SINGLE_TAG } from "../utils/queries";
import ProgressBar from '../components/ProgressBar'
import images from '../utils/importPhotos'

function ShowOrg(props) {
  const { loading: orgLoading, data: organizationData } = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: props.property },
    }
  );
  const orgData = organizationData?.getSingleOrganization || {};
  console.log(orgData)

  const { loading: tagLoading, data: tagData } = useQuery(
    GET_SINGLE_TAG,
    {
      variables: { tagId: orgData.tag },
    }
  );
  console.log("tagData: ", tagData)
  return (
    <>
      <div className="md:container 2xl:w-2/3 mx-auto flex flex-col justify-center items-center">

        <img
          src={orgData.image} style={{ width: '300px' }} alt={orgData.name + "profile image"} />

        <h3 className="font-main text-xl text-center my-2"
        >{orgData.name}</h3>

        <img className=""
          src={images[tagData?.getSingleTag?.image]} alt="" />

        <h3 className="font-main text-lg mt-2"
        >FundraisingGoal</h3>

        <h3 className="font-main text-lg"
        >${orgData.fundraisingAmount} / ${orgData.fundraisingGoal}</h3>

        <ProgressBar goal={orgData.fundraisingGoal} amount={orgData.fundraisingAmount} />
      </div>
    </>
  );
}

export default ShowOrg;
