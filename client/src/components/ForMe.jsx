import { useState, useEffect } from 'react';
import { GET_SINGLE_USER, GET_ALL_TAGS } from '../utils/queries';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const ForMe = () => {

  const { loading, data } = useQuery(GET_SINGLE_USER);

  const userData = data?.getSingleUser || {};
  // console.log(userData)

  const savedOrgs = userData.savedOrganizations
  const tagIdsArray = savedOrgs?.map((org) => org.tag).filter(Boolean);
  console.log(tagIdsArray);

  const { _, data: tagData } = useQuery(GET_ALL_TAGS);
  const allTagData = tagData?.getAllTags || {};
  console.log(allTagData);
  if (Array.isArray(allTagData)) {

    const userTagData = allTagData.filter(value => tagIdsArray?.includes(value._id))
    console.log(userTagData);
    
    const counts = {};
    
    // Step 2: Iterate through the array and count values
    userTagData.forEach(item => {
      const key = item.name; // Use the 'name' property as the key
      counts[key] = (counts[key] || 0) + 1;
    });
    
    // Step 3: Convert counting object to an array of objects
    const countedValues = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
    
    // Step 4: Sort the array by count in descending order
    countedValues.sort((a, b) => b.count - a.count);
    
    // Step 5: Extract sorted values into a new array
    const sortedNames = countedValues.map(item => item.name);
    
    console.log(sortedNames);
    
  }
    
    if (loading) {
      return <p>Still Loading...</p>
    }
    
    return (
      <>

    </>
  );
};

export default ForMe;
