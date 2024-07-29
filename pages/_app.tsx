
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from '@/redux/provider'; // Adjust the import path if necessary

// Define the MyApp component which wraps the entire application
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    // Wrap the application with ReduxProvider to provide the Redux store to all components
    <ReduxProvider>

         {/* Render the current page component with its props */}
      <Component {...pageProps} />
      
      {/* Include the ToastContainer to display toast notifications */}
      <ToastContainer />
    </ReduxProvider>
  );
};

export default MyApp;
