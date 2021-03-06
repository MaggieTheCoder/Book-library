const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const { beforeEach } = require("mocha");
const app = require("../src/app");
const { getMaxListeners } = require("../src/app");

describe("/readers", () => {
  before(async () => Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /readers", () => {
      it("creates a new reader in the database", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "password",
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
        expect(newReaderRecord.password).to.equal("password");
      });
      it("should not allow an empty name field", async () => {
        const reader = {
          name: "",
          email: "joker@gmail.com",
          password: "21SilverRings!",
        };

        const response = await request(app).post("/readers").send(reader);

        expect(response.status).to.equal(400);
      });

      it("should throw error if an incorrect email address has been provided", async () => {
        const reader = {
          name: "Magic Maggie",
          email: "jokeratgmail.com",
          password: "21SilverRings!",
        };

        const response = await request(app).post("/readers").send(reader);

        expect(response.status).to.equal(400);
      });

      it("should error if email field is empty", async () => {
        const reader = {
          name: "Magic Maggie",
          email: "",
          password: "21SilverRingsGleam!",
        };

        const response = await request(app).post("/readers").send(reader);

        expect(response.status).to.equal(400);
      });

      it("should throw an error if password length is less than 8 characters", async () => {
        const reader = {
          name: "Emily Blunt",
          email: "bluntEdge@gmail.com",
          password: "Emily",
        };

        const response = await request(app).post("/readers").send(reader);

        expect(response.status).to.equal(400);
      });

      it("should error if password field is empty", async () => {
        const reader = {
          name: "Emily Blunt",
          email: "bluntEdge@gmail.com",
          password: "",
        };
        const response = await request(app).post("/readers").send(reader);

        expect(response.status).to.equal(400);
      });
    });
  });

  describe("with records in the database", () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "password",
        }),
        Reader.create({
          name: "Arya Stark",
          email: "vmorgul@me.com",
          password: "password",
        }),
        Reader.create({
          name: "Lyra Belacqua",
          email: "darknorth123@msn.org",
          password: "password",
        }),
      ]);
    });

    describe("GET /readers", () => {
      it("gets all readers records", async () => {
        const response = await request(app).get("/reader");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
          expect(reader.password).to.equal(expected.password);
        });
      });
    });

    describe("GET /reader/:id", () => {
      it("gets readers record by id", async () => {
        const reader = readers[0];
        const response = await request(app).get(`/reader/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(reader.password);
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).get("/reader/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });

    describe("PATCH /reader/:id", () => {
      it("updates readers email by id", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/reader/${reader.id}`)
          .send({ email: "miss_e_bennet@gmail.com" });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal("miss_e_bennet@gmail.com");
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app)
          .patch("/reader/12345")
          .send({ email: "some_new_email@gmail.com" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });

    describe("DELETE /reader/:id", () => {
      it("deletes reader record by id", async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/reader/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).delete("/reader/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });
  });
});
