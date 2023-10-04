import { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const ProfilePage = () => {



  return (
    <>
    {/* conditional rendering based on whether profile is an admin or a user */}
      {token ? (
        <div>
          
        </div>
      ) : (
        <div>

        </div>
      )}

    </>
  );
};

export default ProfilePage;