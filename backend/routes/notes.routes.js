const express = require('express');
const db = require('../db/init');

const notesRouter = express.Router();


const dbGetQuery = "SELECT * FROM notes"
const dbPostQuery = "INSERT INTO notes (title, content) VALUES (?, ?)"
const dbUpdateQuery = "UPDATE notes SET title = ?, content = ? WHERE id = ?"
const dbDeleteQuery = "DELETE FROM notes WHERE id = ?"


// GET all notes
notesRouter.get("/", (req,res) => {
    db.all(dbGetQuery, [], (err, rows) => {
        res.json(rows);
    });
});

// CREATE a note
notesRouter.post("/", (req,res) => {
    const { title, content } = req.body;
    db.run(
        dbPostQuery,
        [title, content],
        function () {
            res.json({ id: this.lastID });
        }
    );
});

// UPDATE a note
notesRouter.put("/:id", (req, res) => {
    const { title, content } = req.body;
    db.run(
        dbUpdateQuery,
        [ title, content, req.params.id],
        () => res.json({ success: true })
    );
});

// DELETE a note
notesRouter.delete("/:id", (req, res) => {
    db.run(
        dbDeleteQuery,
        [req.params.id],
        () => res.json({ success: true })
    );
});


module.exports = notesRouter;