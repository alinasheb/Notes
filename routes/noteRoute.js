const { Router } = require("express");
const Note = require("../models/Note");
const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { text } = req.body;

    const notes = await Note.find({});
    const maxIndex = notes.reduce((max, note) => {
      return note.index > max ? note.index : max;
    }, 0);

    const note = await new Note({
      text,
      index: maxIndex + 1,
    });

    await note.save();

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { text } = req.query; //а надо?

    const notes = await Note.find({ text }); //ДОБАВИЛА метод find

    res.json(notes); //исправила на notes
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const index = req.query.index;

    const note = await Note.findOneAndDelete({ index });
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { index, newText } = req.body;

    const note = await Note.findOneAndUpdate(
      { index },
      { $set: { text: newText } },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
