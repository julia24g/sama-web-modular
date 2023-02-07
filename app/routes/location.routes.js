module.exports = app => {
    const locations = require("../controllers/location.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Location
    router.post("/", locations.create);
  
    // Retrieve all Locations
    router.get("/", locations.findAll);
  
    app.use('/api', router);
  };