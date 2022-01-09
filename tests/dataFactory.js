const faker = require("faker");

const bookData = () => ({
  title: faker.random.words(2),
  author: faker.name.findName(),
  genre: faker.random.word(),
  ISBN: faker.datatype.string(13),
});

module.exports = {
  bookData,
};
