import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// Define the secret key for JWT signing
const SECRET_KEY = 'your_secret_key';

// Dummy user for demonstration
const dummyUser = {
  username: 'test',
  password: 'test', // In a real application, use hashed passwords and compare with bcrypt
};

// Default export function for the API route
export default (req: NextApiRequest, res: NextApiResponse) => {

  // Check if the request method is POST
  if (req.method === 'POST') {

    // Extract username and password from the request body
    const { username, password } = req.body;
    
    // Check if the provided username and password match the dummy user's credentials
    if (username === dummyUser.username && password === dummyUser.password) {

       // Generate a JWT token with the username as payload, signed with the secret key, and set to expire in 1 hour
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      
      // Send a 200 OK response with the generated token
      res.status(200).json({ token });
    } else {
       // If the credentials are invalid, send a 401 Unauthorized response
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    // If the request method is not POST, send a 405 Method Not Allowed response
    res.status(405).json({ message: 'Method not allowed' });
  }
};
