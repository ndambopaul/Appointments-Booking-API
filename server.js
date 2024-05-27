const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Database Configuration
const { connect_database } = require("./db/connect_db");
connect_database();

// Authenticate Middleware
const { verifyToken } = require("./middleware/Authenticate");

// Routes
const authRoutes = require("./routes/auth");
const slotRoutes = require("./routes/slots");

app.get("/", (req, res) => {
    res.send({ message: "Server is running" }).status(200)
});


app.use("/auth", authRoutes);
app.use("/slots", verifyToken, slotRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on: http://127.0.0.1:${PORT}`)
})