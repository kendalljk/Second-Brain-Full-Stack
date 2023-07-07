const Note = require("../models/note");

exports.addNote = async (req, res, next) => {
    try {
        console.log(req.body);
        const { bookTitle, bookAuthor, bookSummary, bookGenre, bookFinished } =
            req.body;
        const bookQuotes = Array.isArray(req.body.bookQuotes)
            ? req.body.bookQuotes
            : [req.body.bookQuotes];
        const bookNotes = Array.isArray(req.body.bookNotes)
            ? req.body.bookNotes
            : [req.body.bookNotes];
        const coverPath = req.body.coverPath;

        const newNote = new Note({
            title: bookTitle,
            author: bookAuthor,
            cover: coverPath,
            genre: bookGenre,
            summary: bookSummary,
            quotes: bookQuotes,
            notes: bookNotes,
            finished: bookFinished,
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
