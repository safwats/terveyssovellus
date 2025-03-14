import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
} from '../models/user-model.js';
import {customError} from '../middlewares/error-handler.js';

// Get all users
const getUsers = async (req, res) => {
  // In real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Get user by ID
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);
  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    next(error);
  }
};

// Add new user (registration)
const addUser = async (req, res, next) => {
  console.log('addUser request body', req.body);

  const {username, password, email} = req.body;

  // Generate password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user object
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };

  try {
    const result = await insertUser(newUser);
    res.status(201);
    return res.json({message: 'User added. id: ' + result});
  } catch (error) {
    return next(customError(error.message, 400));
  }
};

// Edit user by ID
const editUser = (req, res) => {
  // This is a placeholder - needs to be implemented with actual database operations
  console.log('editUser request body', req.body);
  res.status(501).json({message: 'Not implemented'});
};

// Delete user by ID
const deleteUser = (req, res) => {
  // This is a placeholder - needs to be implemented with actual database operations
  console.log('deleteUser', req.params.id);
  res.status(501).json({message: 'Not implemented'});
};

export {getUsers, getUserById, addUser, editUser, deleteUser};
