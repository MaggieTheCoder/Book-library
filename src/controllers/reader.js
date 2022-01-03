const { Reader } = require("../models");

exports.create = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newReader = await Reader.create({ name, email });
    res.status(201).json(newReader);
  } catch (error) {
    res.status(500).json({ error: "The reader could not be created" });
  }
};

//   Reader.create(req.body).then((reader) => {
//     if (reader) {
//       res.status(201).json(reader);
//     } else {
//       res.status(500).json({ error: "The reader could not be created" });
//     }
//   }).catch;

// exports.read = async (req, res) => {
//   Reader.read();
// };
