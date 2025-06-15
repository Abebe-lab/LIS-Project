import { useContext } from 'react';
import {UserContext} from '../contexts/UserContext'; // Replace with the actual path to your context

const useDecodedUser = () => {
  const { decodedUser } = useContext(UserContext); // Assuming your context provides a `user` object
  return decodedUser;
};

export default useDecodedUser;
