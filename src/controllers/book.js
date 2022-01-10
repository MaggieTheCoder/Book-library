const { Book } = require("../models");

exports.create = async (req, res) => {
  const book = await Book.create(req.body);
  try {
    if (book) {
      res.status(201).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  } catch (error) {
    res.status(500).json({ error: "The book could not be created" });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const books = await Book.findAll({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send(err);
  }
};

exports.BooksbyID = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  try {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.UpdateBook = async (req, res) => {
  const bookID = req.params.id;
  const updateData = req.body;
  const [updatedRows] = await Book.update(updateData, {
    where: { id: bookID },
  });
  try {
    if (updatedRows) {
      res.status(200).json(updatedRows);
    } else {
      res
        .status(404)
        .json({ error: "This book could not be found in the database." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.DeleteBook = async (req, res) => {
  const bookID = req.params.id;
  const deletedRows = await Book.destroy({ where: { id: bookID } });

  try {
    if (deletedRows) {
      res.status(204).send("Book is deleted");
    } else {
      res.status(404).json({ error: "The book could not be found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
