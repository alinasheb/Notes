const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/api/note", require("./routes/noteRoute"));

async function start() {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/Notes", {
        useNewUrlParser: true,
      })
      .then(() => console.log("Connected to DB"));

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
