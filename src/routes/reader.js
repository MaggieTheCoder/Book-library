const express = require("express");
const ReaderController = require("../controllers/reader");

const router = express.Router();

router.post("/readers", ReaderController.create);

router.get("/reader", ReaderController.allReaders);

router.get("/reader/:id", ReaderController.SingleReaderId);

router.patch("/reader/:id", ReaderController.Update);

router.delete("/reader/:id", ReaderController.Delete);

module.exports = router;
