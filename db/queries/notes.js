const db = require('../connection');

// get all notes for the authenticated user
const getNotes = function(userId) {
  const params = [userId];
  const query = `
    SELECT * FROM notes
    WHERE creator_id = $1;
  `;

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// get a note by ID
const getNoteById = function(id, userId) {
  const params = [id, userId];
  const query = `
    SELECT * FROM notes
    WHERE id = $1 AND creator_id = $2;
  `;

  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// create a new note
const createNote = function(creatorId, title, description) {
  const params = [creatorId, title, description];
  const query = `
    INSERT INTO notes (creator_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// update an existing note
const updateNote = function(creatorId, id, title, description) {
  const params = [creatorId, id, title, description];
  const query = `
    UPDATE notes
    SET title = $3, description = $4
    WHERE creator_id = $1 AND id = $2
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// search for notes
const searchNotes = function(searchQuery) {
  const params = [searchQuery];
  const query = `
    SELECT * FROM notes
    WHERE description LIKE '%' || $1 || '%';
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// delete note by ID
const deleteNote = function(creatorId, id) {
  const params = [creatorId, id];
  const query = `
    DELETE FROM notes
    WHERE creator_id = $1 AND id = $2;
  `;
  
  return db.query(query, params)
    .then(() => {
      return;
    });
};

module.exports = { 
  getNotes, 
  getNoteById, 
  createNote, 
  updateNote,
  searchNotes,
  deleteNote
};
