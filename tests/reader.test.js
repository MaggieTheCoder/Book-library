const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
  before(async () => Reader.sequelize.sync()); // connect to Reader table

  beforeEach(async () => {
    await Reader.destroy({ where: {} }); //cleans out the reader table so no interference from previous tests
  });

  describe("with no records in the database", () => {
    describe("POST /readers", () => {
      it("creates a new reader in the database", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "msdarcy@gmail.com",
        });
        expect(response.status).to.equal(201);

        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.body.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.email).to.equal("msdarcy@gmail.com");
      });
    });
  });

  describe("with records in the database", () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: "Elizabeth Bennet",
          email: "msdarcy@gmail.com",
        }),
        Reader.create({ name: "Arya Stark", email: "astark@gmail.com" }),
        Reader.create({ name: "Lyra Belacqua", email: "darknorth@gmail.com" }),
      ]);
    });

    describe("GET /readers", () => {
      xit("gets all readers records", async () => {
        const response = await request(app).get("/reader");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
        });
      });
    });

    describe("GET /readers/:id", () => {
      xit("gets readers record by id", async () => {
        const reader = readers[0];
        const response = await request(app).get(`/reader/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
      });

      xit("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).get("/reader/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });

    describe("PATCH /readers/:id", () => {
      xit("updates readers email by id", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/reader/${reader.id}`)
          .send({ email: "missBennet@gmail.com" });

        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal("missBennet@gmail.com");
      });

      xit("returns a 404 if the reader does not exist", async () => {
        const response = await request(app)
          .patch("/reader/12345")
          .send({ email: "noob@gmailm.com" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found");
      });
    });
    describe("DELETE /readers/:id", () => {
      xit("deletes reader record by id", async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/reader/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });
      xit("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).delete("/readers/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });
  });
});
