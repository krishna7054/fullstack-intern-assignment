import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {

    // Define an async function to fetch the user data
    const fetchUser = async () => {
      try {

        // Get the token from local storage
        const token = localStorage.getItem('token');

        // If a token exists, fetch the user data from the API
        if (token) {
          const response = await axios.get('/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          
          // Ensure the user data matches the expected structure and dispatch setUser action
          dispatch(setUser({ username: response.data.username }));
          
        } else {
          // If no token, clear the auth state
          dispatch(clearAuth());
        }
      } catch (error) {
         // In case of an error, clear the auth state
        dispatch(clearAuth());
      }
    };

    // Call the fetchUser function
    fetchUser();
  }, [dispatch]);

  return user;
};

export default useAuthSession;
