import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware to authenticate requests using JWT
const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('token', token);

  if (token == undefined) {
    return res.sendStatus(401);
  }

  try {
    // Verify the token and attach user data to the request
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};

export {authenticateToken};
