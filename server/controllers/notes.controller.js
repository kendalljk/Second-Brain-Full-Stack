const Note = require("../models/note");

exports.addNote = async (req, res, next) => {
  try {
    console.log(req.body);
    const { bookTitle, bookAuthor, bookSummary, bookGenre, bookQuotes, bookNotes, bookFinished } = req.body;

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
