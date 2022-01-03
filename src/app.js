const express = require("express");
const ReaderController = require("./controllers/reader");
const { Reader } = require("./models");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("You've hit root!");
});

app.post("/readers", ReaderController.create);

app.get("/reader", ReaderController.allReaders);

app.get("/reader/:id", ReaderController.SingleReaderId);

app.patch("/reader/:id", ReaderController.Update);

app.delete("/reader/:id", ReaderController.Delete);

module.exports = app;
