const mongoose = require("mongoose");

const nestedObj = new mongoose.Schema({
  field1: String,
});

const ToDoSchema = new mongoose.Schema(
  {
    record: { type: String, required: true },
    date: { type: Number, default: () => Date.now() },
    obj: nestedObj,
  },
  { collection: "to-do-list" }
);

const model = mongoose.model("ToDoModel", ToDoSchema);

module.exports = model;