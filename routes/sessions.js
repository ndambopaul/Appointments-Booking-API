const express = require("express");
const { getStudentsInSession, joinSession, leaveSession } = require("../controllers/sessions");

const router = express.Router();
router.get("/students-in-session/:id", getStudentsInSession);
router.post("/join-session/:id", joinSession);
router.post("/leave-session/:id", leaveSession);

module.exports = router;