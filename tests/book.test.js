const request = require("supertest");
const { expect } = require("chai");
const { Book, Reader } = require("../src/models");
const { beforeEach } = require("mocha");
const app = require("../src/app");
const faker = require("faker");
const dataFactory = require("./dataFactory");

describe("/books", () => {
  before(async () => Book.sequelize.sync()); //connects to Book table

  beforeEach(async () => {
    await Book.destroy({ where: {} }); //cleans out the Book Table so no interference from previous tests
  });

  describe("with no records in the database", () => {
    describe("POST /book", () => {
      it("creates a new book in the database", async () => {
        const bookData = dataFactory.bookData();
        const response = await (
          await request(app).post("/book")
        ).send(bookData);

        const newBookRecord = await Book.findbyPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(newBookRecord.title).to.equal(bookData.title);
        expect(newBookRecord.author).to.equal(bookData.author);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      //creates an array of books before each test
      books = await Promise.all([
        Book.create(dataFactory.bookArray[0]),
        Book.create(dataFactory.bookArray[1]),
        Book.create(dataFactory.bookArray[3]),
      ]);
    });

    describe("GET /books", () => {
      it("gets all book records", async () => {
        const response = await request(app).get("/reader");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3); //number of books elements in book array

        response.body.forEach((book) => {
          //loops over array, sequelize function
          const expected = books.find((x) => x.id === book.id);

          expect(book.title).to.equal(expected.title);
        });
      });
    });

    describe("GET /book/:id", () => {
      it("gets book record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/book/1234569");

        expect(response.status).to.equal(404);
        expect(resonse.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /book/:id", () => {
      it("updates book with given id", async () => {
        const newBook = dataFactory.bookData();
        const book = books[0];
        const response = await request(app)
          .patch(`/book/${book.id}`)
          .send(newBook);

        expect(response.status).to.equal(200);
        const bookRecordUpdated = await Book.findbyPk(book.id);
        expect(bookRecordUpdated.title).to.equal(bookRecordUpdated.title);
      });

      it("returns a 404 if book from initial id does not exist", async () => {
        const newBook = dataFactory.bookData();
        const response = await request(app).patch("/book/12349").send(newBook);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(
          "This book could not be found in the database."
        );
      });
    });

    describe("DELETE /book/:id", () => {
      it("should delete book with id given", async () => {
        const book = books[0];
        const response = await request(app).delete(`/book/${book.id}`);
        const deletedBook = await Book.findbyPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).delete("/book/123459");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
