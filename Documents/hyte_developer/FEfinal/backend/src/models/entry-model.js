import promisePool from '../utils/database.js';

/**
 * Insert a new diary entry
 * @param {object} entry Diary entry object
 * @returns {number} ID of the inserted entry
 */
const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [entry.user_id, entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes],
    );
    console.log('insertEntry', result);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * Select all diary entries for a specific user
 * @param {number} userId ID of the user
 * @returns {Array} Array of diary entries
 */
const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * Delete a diary entry by its ID
 * @param {number} entryId ID of the entry to delete
 * @returns {boolean} Success status
 */
const deleteEntryById = async (entryId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id=?',
      [entryId],
    );
    console.log('deleteEntryById', result);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertEntry, selectEntriesByUserId, deleteEntryById};