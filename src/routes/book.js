const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/books", bookController.create);
bookRouter.get("/books", bookController.getAllRecords);
bookRouter.get("/book/:id", bookController.BooksbyID);
bookRouter.patch("/book/:id", bookController.UpdateBook);

module.exports = bookRouter;
