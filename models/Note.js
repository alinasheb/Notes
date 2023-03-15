const { Schema, model } = require("mongoose");

const schema = new Schema({
  text: { type: String },
  index: { type: Number, unique: true, required: true },
});

module.exports = model("Note", schema);
