const express = require("express");
const bookController = require("../controllers/book");

const bookRouter = express.Router();

bookRouter.post("/books", bookController.create);
bookRouter.get("/book", bookController.getAllRecords);
bookRouter.get("/book/:id", bookController.BooksbyID);
bookRouter.patch("/book/:id", bookController.UpdateBook);
bookRouter.delete("/book/:id", bookController.DeleteBook);

module.exports = bookRouter;
