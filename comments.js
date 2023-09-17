// Create web server
//

var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('lodash');
var auth = require('../auth');

// GET /comments
// Return all comments
router.get('/', function(req, res, next) {
  db.get().query('SELECT * FROM comments', function(err, rows) {
    if (err) return next(err);
    res.send(rows);
  });
});

// GET /comments/:id
// Return a comment by id
router.get('/:id', function(req, res, next) {
  db.get().query('SELECT * FROM comments WHERE id = ?', req.params.id, function(err, rows) {
    if (err) return next(err);
    res.send(rows);
  });
});

// GET /comments/:id
// Return a comment by id
router.get('/posts/:id', function(req, res, next) {
  db.get().query('SELECT * FROM comments WHERE post_id = ?', req.params.id, function(err, rows) {
    if (err) return next(err);
    res.send(rows);
  });
});

// POST /comments
// Create a new comment
router.post('/', auth, function(req, res, next) {
  db.get().query('INSERT INTO comments SET ?', req.body, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
});

// PUT /comments/:id
// Update a comment by id
router.put('/:id', auth, function(req, res, next) {
  db.get().query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.id], function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
});

// DELETE /comments/:id
// Delete a comment by id
router.delete('/:id', auth, function(req, res, next) {
  db.get().query('DELETE FROM comments WHERE id = ?', req.params.id, function(err, result) {
    if (err) return next(err);
    res.send(result);
  });
});

module.exports = router;