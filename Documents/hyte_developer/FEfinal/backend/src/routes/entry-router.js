import express from 'express';
import {getEntries, postEntry, deleteEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

// Routes for /api/entries
entryRouter
  .route('/')
  // POST /api/entries - Add new diary entry (requires authentication)
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('weight').isFloat({min: 2, max: 200}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('notes').trim().escape().custom((value, {req}) => {
      // Custom validation example
      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  // GET /api/entries - Get all entries for logged in user (requires authentication)
  .get(authenticateToken, getEntries);

// Add route for /api/entries/:id for DELETE operation
entryRouter
  .route('/:id')
  // DELETE /api/entries/:id - Delete a specific entry (requires authentication)
  .delete(authenticateToken, deleteEntry);

export default entryRouter;