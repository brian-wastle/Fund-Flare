import { GET_SINGLE_USER } from './queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';

export const useSavedOrganizations = () => {
  const {loading, data} = useQuery(GET_SINGLE_USER);
  const savedOrganizations = data?.getSingleUser.savedOrganizations||[];
  // console.log(savedOrganizations)
  return savedOrganizations;
};


// export const removeBookId = (bookId) => {
//   const savedBookIds = localStorage.getItem('saved_books')
//     ? JSON.parse(localStorage.getItem('saved_books'))
//     : null;

//   if (!savedBookIds) {
//     return false;
//   }

//   const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
//   localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

//   return true;
// };
