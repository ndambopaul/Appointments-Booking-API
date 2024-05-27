const mongoose = require("mongoose");
//const connectionString = "mongodb://localhost:27017/codingdb";
const connectionString = "mongodb+srv://kadabo:1234@nodeexpressprojects.oghfjs8.mongodb.net/codingdb?retryWrites=true&w=majority"


const connect_database = async () => {
  await mongoose
    .connect(connectionString)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

module.exports = {
    connect_database
}