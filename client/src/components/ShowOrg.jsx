import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_ORGANIZATION } from "../utils/queries";

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
      <p>Organization Name:</p>
      <p>{orgData.name}</p>
      <p>Tag:</p>
      <p>{orgData.tag}</p>
    </>
  );
}

export default ShowOrg;
