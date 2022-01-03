const { Reader } = require("../models");

exports.create = async (req, res) => {
  Reader.create(req.body).then((reader) => {
    if (reader) {
      res.status(201).json(reader);
    } else {
      res.status(500).json({ error: "The reader could not be created" });
    }
  }).catch;
};
