import promisePool from '../utils/database.js';

/**
 * Fetch all userdata except passwords from database
 * @returns Array of users
 */
const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
};

/**
 * Fetch user by id
 * @param {number} userId id of the user
 * @returns {object} user found or undefined if not
 */
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

/**
 * User registration
 * @param {object} user User data object
 * @returns {number} ID of the inserted user
 */
const insertUser = async (user) => {
  const [result] = await promisePool.query(
    'INSERT INTO Users (username, password, email) VALUES (?, ?, ?)',
    [user.username, user.password, user.email],
  );
  console.log('insertUser', result);
  return result.insertId;
};

/**
 * Fetch all user data based on user's username
 * @param {string} username Username
 * @returns {object} user data or undefined
 */
const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, created_at, user_level FROM Users WHERE username=?',
      [username],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {
  selectAllUsers,
  selectUserById,
  insertUser,
  selectUserByUsername,
};
