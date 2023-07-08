const Note = require("../models/note");

exports.getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Unable to find note" });
  }
};

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

exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) {
      return res.status(404).json({ error: "Unable to find note" });
    }
    res.json({message: "Successfully deleted note"})
  } catch (error) {
    res.status(500).json({error: "Unable to delete note"})
  }
}

exports.editNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
      return res.status(404).json({ error: "Unable to find note" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Unable to edit note" });

  }
}