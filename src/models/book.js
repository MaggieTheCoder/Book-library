module.exports = (connection, DataTypes) => {
  const schema = {
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define("BookModel", schema);
  return BookModel;
};
