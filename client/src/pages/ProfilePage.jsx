import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_USER, GET_SINGLE_ORGANIZATION } from '../utils/queries';
import  CreateOrgForm  from '../components/CreateOrg'
import  ShowOrg  from '../components/ShowOrg'

const ProfilePage = () => {
  const [show, setShow] = useState(true);
  const {loading, data} = useQuery(GET_SINGLE_USER);

  const userData = data?.getSingleUser||{};
  console.log(userData)
  if (loading) {
    return <p>Still Loading...</p> 
  }

  return (
    <>
    <p>{userData.username}'s profile</p>
    {/*conditional rendering based on whether profile is an admin or a user */}
      {userData.isAdmin === false ? (
        // is user profile
        <>
          <p>Saved Organizations</p>
          {userData.savedOrganizations.map((organization) => {
            return (
              <div key={organization.id}>
                <Link to={`/organization/${organization._id}`}>{organization.name}</Link>
                <p>{organization.description}</p>
                <p><img src={organization.image} alt="organization profile image" /></p>
                <a href={organization.link}>{organization.link}</a>

              </div>
            );
          })}
        <br />
          Order History
          {userData.orderHistory.map((order) => {
            return (
              <p>test</p>
            );
          })}
        </>
      ) : (
        // is admin profile
        <div>
          <p>My Organization</p>

          {userData.myOrganizationId
            ? 
            <ShowOrg property={userData.myOrganizationId}/>
            : 
            <div className="createOrgButton">
              {   
                show
                  ? <button onClick={() => setShow(!show)}>
                  Set up your Organization
                </button> 
                  : <CreateOrgForm /> 
              }
              

            </div>
          }



        </div>
      )}

    </>
  );
};

export default ProfilePage;