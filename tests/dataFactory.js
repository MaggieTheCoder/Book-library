const faker = require("faker");

const bookData = () => ({
  title: faker.random.words(2),
  author: faker.name.findName(),
  genre: faker.random.word(),
  ISBN: faker.datatype.string(13),
});

const bookArray = [];
for (let i = 0; i < 3; i++) {
  bookArray.push(bookData());
}

module.exports = {
  bookData,
  bookArray,
};
