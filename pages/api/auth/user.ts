import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';


// Define the secret key for JWT verification
const SECRET_KEY = 'your_secret_key';

// Default export function for the API route
export default (req: NextApiRequest, res: NextApiResponse) => {

  // Check if the request method is GET
  if (req.method === 'GET') {

    // Extract the Authorization header from the request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (authHeader) {

      // Extract the token from the Authorization header
      const token = authHeader.split(' ')[1];

      // Verify the token using the secret key
      jwt.verify(token, SECRET_KEY, (err, user) => {

        // If there is an error (e.g., invalid token), send a 403 response
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        
         // If the token is valid, send a 200 response with the user data
        res.status(200).json(user);
      });
    } else {
      // If the Authorization header is missing, send a 401 response
      res.status(401).json({ message: 'Authorization header missing' });
    }
  } else {
    // If the request method is not GET, send a 405 response
    res.status(405).json({ message: 'Method not allowed' });
  }
};
