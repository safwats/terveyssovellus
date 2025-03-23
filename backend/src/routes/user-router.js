import express from 'express';
import {body} from 'express-validator';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const userRouter = express.Router();

// Routes for /api/users
userRouter
  .route('/')
  // GET /api/users - Get all users (requires authentication)
  .get(authenticateToken, getUsers)
  // POST /api/users - Register a new user
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 120}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    addUser,
  );

// Routes for /api/users/:id
userRouter
  .route('/:id')
  // GET /api/users/:id - Get user by ID
  .get(getUserById)
  // PUT /api/users/:id - Update user (not implemented yet)
  .put(editUser)
  // DELETE /api/users/:id - Delete user (not implemented yet)
  .delete(deleteUser);

export default userRouter;
