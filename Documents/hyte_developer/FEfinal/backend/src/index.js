import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import entryRouter from './routes/entry-router.js';
import {errorHandler, notFoundHandler} from './middlewares/error-handler.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// CORS middleware to allow frontend requests
app.use(cors());

// Serve static files from public directory
app.use('/', express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// API root endpoint
app.get('/api/', (req, res) => {
  console.log('GET request to API root detected');
  res.send('Welcome to Health Diary API!');
});

// Routes for different resources
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/entries', entryRouter);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
