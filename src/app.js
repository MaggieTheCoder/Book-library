const express = require("express");
const ReaderRouter = require("./routes/reader");
const BookRouter = require("./routes/book");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("You've hit root!");
});

app.use(ReaderRouter, BookRouter);

module.exports = app;
