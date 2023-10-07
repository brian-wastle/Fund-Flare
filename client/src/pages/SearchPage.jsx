import { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';

const SearchPage = () => {

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

function fuzzySearch(req, res) {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      Organization.find({ name: regex }, function (err, foundjobs) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
    }
  };

  return (
    <>
      
    </>
  );
};

export default SearchPage;
