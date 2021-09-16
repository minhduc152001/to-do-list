const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const toDo = require("./models/todo");

mongoose.connect("mongodb://localhost:27017/firstmongo", { useNewUrlParser: true, useUnifiedTopology: true});

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(bodyParser.json());
// CREATE
app.post("/api/create", async (req, res) => {
  const record = req.body;
  const response = await toDo.create(record);
  console.log(response);
  // res.json({ status: "ok" });
});

//READ
app.get("/api/get", async (req, res) => {
  const records = await toDo.find({});
  res.json(records);
});

//UPDATE
app.post('/api/modify', async (req, res) => {
  const { old: oldTitle, new: newTitle } = req.body;
  console.log(req.body);
  const response = await toDo.updateOne(
    {
      "record": oldTitle,
    },
    {
      $set: {
        "record": newTitle,
      }
    }
  );

  console.log(response);

  // res.json({ status: "ok" });
});

//DELETE
app.post("/api/delete", async (req, res) => {
  const { record } = req.body;
  console.log(record, "/api/delete");

  const response = await toDo.deleteOne({ record });
  console.log(response, "/api/delete response");
  // res.json({ status: "ok" });
});

app.listen(5000, () => console.log("Server is listening on port 5000...."));
