const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const noteQueries = require('../db/queries/notes');
const { verifyToken } = require('../helpers/helpers');

// get all notes
router.get('/notes', verifyToken, (req, res) => {
  const username = req.session.username;

  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.getNotes(user.id);
    })
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// get note with specified ID
router.get('/notes/:id', verifyToken, (req, res) => {
  const username = req.session.username;
  const id = req.params.id;

  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.getNoteById(id, user.id);
    })
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// create a new note
router.post('/notes', verifyToken, (req, res) => {
  const username = req.session.username;
  const title = req.body.title;
  const description = req.body.description;
  
  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.createNote(user.id, title, description);
    })
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// update an existing note
router.put('/notes/:id', verifyToken, (req, res) => {
  const username = req.session.username;
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  
  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.updateNote(user.id, id, title, description);
    })
    .then(note => {
      res.json(note);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// delete note by ID
router.delete('/notes/:id', verifyToken, (req, res) => {
  const username = req.session.username;
  const id = req.params.id;

  userQueries.getUserByUsername(username)
    .then(user => {
      noteQueries.deleteNote(user.id, id);
      return res.status(200);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// share note with specified ID
router.post('/notes/:id/share', verifyToken, (req, res) => {
  const username = req.session.username;
  const id = req.params.id;

  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.getNoteById(id, user.id);
    })
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// search notes
router.get('/search', verifyToken, (req, res) => {
  const username = req.session.username;
  const query = req.query.q;

  userQueries.getUserByUsername(username)
    .then(user => {
      return noteQueries.searchNotes(query);
    })
    .then(notes => {
      res.json(notes);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
