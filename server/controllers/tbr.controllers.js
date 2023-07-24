const TBR = require("../models/tbr");

exports.getTBR = async (req, res, next) => {
    try {
        const tbr = await TBR.findById(req.params.id);
        res.json(tbr);
    } catch (error) {
        res.status(500).json({ error: "Unable to find book from TBR list" });
    }
};

exports.addTBR = async (req, res, next) => {
    console.log(req.body);
    const { bookTitle, bookAuthor } =
        req.body;

    const newTBR = new TBR({
        title: bookTitle,
        author: bookAuthor,
    });

    try {
        const savedTBR = await newTBR.save();
        res.json(savedTBR);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.deleteTBR = async (req, res, next) => {
    try {
        const tbr = await TBR.findByIdAndDelete(req.params.id);
        if (!tbr) {
            return res.status(404).json({ error: "Unable to find note" });
        }
        res.json({ message: "Successfully deleted note" });
    } catch (error) {
        res.status(500).json({ error: "Unable to delete note" });
    }
};
