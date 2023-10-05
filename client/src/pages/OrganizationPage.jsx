import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_ORGANIZATION, GET_SINGLE_USER } from '../utils/queries';
import { SAVE_ORGANIZATION } from '../utils/mutations';
import { saveOrganizations} from '../utils/orgFunctions';

const OrganizationPage = () => {

  const getSavedOrganizations = async () => {
    const {loading, data} = await useQuery(GET_SINGLE_USER);
    const savedOrganizations = data?.getSingleUser.savedOrganizations||{};
    console.log(savedOrganizations)
  
    return savedOrganizations;
  };



  const [savedOrganizations, setSavedOrganizations] = useState(getSavedOrganizations());
  const [saveOrganization, { organizations, orgLoading, error }] = useMutation(SAVE_ORGANIZATION);

  const { organizationId } = useParams();
  const {loading, data} = useQuery(
    GET_SINGLE_ORGANIZATION,
    {
      variables: { organizationId: organizationId },
    }
  );
  const organizationData = data?.getSingleOrganization||{};
  console.log(organizationData)
  if (loading) {
    return <p>Still Loading...</p>
  }

  


  const handleSaveOrganization = async (orgId) => {
    // find the book in `searchedBooks` state by the matching id
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const saveOrganizationInput = {
        _id: organizationData._id,
        name: organizationData.name,
        description: organizationData.description ,
        image: organizationData.image ,
        link: organizationData.link
      }
      
      const {data} = await saveOrganization({
        variables: { input: {...saveOrganizationInput} },
      });

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
    <button></button>
      <div>
        <p>{organizationData.name}</p>
        <p>
          {organizationData.tags.length
            ? 
            organizationData.tags.map((tag) => {
            return ('test')
            })
            : 'Tags:'}
        </p>
        <p><img src={organizationData.image} alt="organization profile image" /></p>
        <p>{organizationData.description}</p>
        <a href={organizationData.link} target="_blank" rel="noopener noreferrer">{organizationData.link}</a>
      </div>
      {Auth.loggedIn() && (
        <button

          className='btn-block btn-info'
          onClick={() => handleSaveOrganization(organizationData.id)}>
          {/* {savedOrganizations?.some((savedOrganizations) => savedOrganizations === organizationData.id)
            ? 'Saved to your Profile'
            : 'Save this Organization'} */}
        </button>
      )}
      
        
        </>
  );
};

export default OrganizationPage;
