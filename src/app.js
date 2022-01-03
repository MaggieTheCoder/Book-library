const express = require("express");
const ReaderController = require("./controllers/reader");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("You've hit root!");
});

app.post("/readers", ReaderController.create);

module.exports = app;
