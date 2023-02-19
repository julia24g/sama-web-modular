module.exports = app => {
    // For saving user locations
    const locations = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Location
    router.post("/", locations.create);
  
    // Retrieve all Locations
    router.get("/", locations.findAll);

    // For calculating pso
    const pso = require("../controllers/pso.controller.js");
    router.get("/pso", pso.calculate);
  
    app.use('/api', router);
  };