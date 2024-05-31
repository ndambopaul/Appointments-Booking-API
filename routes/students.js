const express = require("express");
const { getStudentSessions } = require("../controllers/students")

const router = express.Router()
router.get("/", getStudentSessions);

module.exports = router;