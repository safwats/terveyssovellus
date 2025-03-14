import {insertEntry, selectEntriesByUserId, deleteEntryById} from '../models/entry-model.js';
import {customError} from '../middlewares/error-handler.js';

// Add new diary entry
const postEntry = async (req, res, next) => {
  // Create new entry with user_id from authenticated user
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;

  try {
    await insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(error);
  }
};

// Get all entries for the logged in user
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

// Delete an entry by ID
const deleteEntry = async (req, res, next) => {
  try {
    const entryId = req.params.id;
    // Make sure the entry belongs to the authenticated user
    const entries = await selectEntriesByUserId(req.user.user_id);
    const entryBelongsToUser = entries.some(entry => entry.entry_id == entryId);
    
    if (!entryBelongsToUser) {
      return next(customError('Entry not found or unauthorized', 403));
    }
    
    await deleteEntryById(entryId);
    res.json({message: "Entry deleted successfully"});
  } catch (error) {
    next(error);
  }
};

export {postEntry, getEntries, deleteEntry};