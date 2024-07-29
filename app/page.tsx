'use client';

import { useState } from 'react';
import { clearAuth, setToken, setUser } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define validation schema
const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const HomePage = () => {
  const dispatch = useAppDispatch();
  const user = useAuthSession();

//   const handleLogin = async () => {
//  // Implement the logic to authenticate the user
//     try {

//       // Send a POST request to the login endpoint with the user credentials
//       const response = await axios.post('/api/auth/login', { username, password });

//       // Extract the token from the response
//       const token = response.data.token;

//       // Store the token in local storage
//       localStorage.setItem('token', token);

//       // Dispatch the setToken action to update the Redux state with the token
//       dispatch(setToken(token));

//       // Send a GET request to fetch the authenticated user data, including the token in the Authorization header
//       const userResponse = await axios.get('/api/auth/user', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Dispatch the setUser action to update the Redux state with the user data
//       dispatch(setUser({ username: userResponse.data.username }));
//     } catch (error) {
//       // Log the error to the console if login fails
//       console.error('Login failed:', error);
//     }
//   };


  // Setup react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Define the async onSubmit function, which accepts an object with username and password
  const onSubmit = async (data: { username: string; password: string }) => {
    try {
       // Send a POST request to the login endpoint with the user credentials
      const response = await axios.post('/api/auth/login', data);

      // Extract the token from the response
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);

      // Dispatch the setToken action to update the Redux state with the token
      dispatch(setToken(token));

      // Send a GET request to fetch the authenticated user data, including the token in the Authorization header
      const userResponse = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatch the setUser action to update the Redux state with the user data
      dispatch(setUser({ username: userResponse.data.username }));

      // Show a success toast notification
      toast.success('Login successful!');
    } catch (error) {
      // Show an error toast notification if login fails
      toast.error('Login failed. Please check your credentials.');

      // Log the error to the console for debugging
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register('username')}
                  placeholder="Username"
                  className={`w-full text-black px-4 py-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
              <div>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  className={`w-full px-4 py-2 text-black border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this:</h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
