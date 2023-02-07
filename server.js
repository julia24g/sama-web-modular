const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// request body-parsers
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// Define routes
require("./app/routes/location.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const db = require("./app/models");
db.sequelize.sync();

// TESTING ONLY - Deletes and re-creates table
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Kill server with ctrl-c
process.on("SIGINT", function () {
    //graceful shutdown
    console.log("Shutting down...");
    db.close();
    process.exit();
});