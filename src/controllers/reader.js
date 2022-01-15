const { Reader } = require("../models");

exports.create = async (req, res) => {
  try {
    const newReader = await Reader.create(req.body);
    if (newReader) {
      res.status(201).json(newReader);
    } else {
      res.status(404).json({ error: "The reader could not be created" });
    }
  } catch (error) {
    res.sendStatus(400).json(err);
  }
};

exports.allReaders = async (req, res) => {
  try {
    const readers = await Reader.findAll({});
    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ err });
  }
};

exports.SingleReaderId = async (req, res) => {
  const reader = await Reader.findByPk(req.params.id);

  try {
    if (reader) {
      res.status(200).json(reader);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.Update = async (req, res) => {
  const readerId = req.params.id;
  const updateData = req.body;
  const [updatedRows] = await Reader.update(updateData, {
    where: { id: readerId },
  });
  try {
    if (updatedRows) {
      res.status(200).json(updatedRows);
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.Delete = async (req, res) => {
  const readerId = req.params.id;
  const deletedRows = await Reader.destroy({ where: { id: readerId } });

  try {
    if (deletedRows) {
      res.status(204).send("Reader deleted");
    } else {
      res.status(404).json({ error: "The reader could not be found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
