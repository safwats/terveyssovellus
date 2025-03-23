import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const authRouter = express.Router();

// POST /api/auth/login - User login
authRouter.post('/login', login);

// GET /api/auth/me - Get current user (requires authentication)
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
