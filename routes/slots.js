const express = require("express");

const { getSlots, getSlotById, createSlot, updateSlot, deleteSlot  } = require("../controllers/slots");

const router = express.Router()
router.get("/", getSlots);
router.get("/:id", getSlotById);
router.post("/", createSlot);
router.put("/:id", updateSlot);
router.delete("/:id", deleteSlot);


module.exports = router;