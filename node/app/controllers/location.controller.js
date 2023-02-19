const db = require("../models");
const Location = db.locations;
const Op = db.Sequelize.Op;

// Create and Save a new row in Locations table
exports.create = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.longitude && !req.body.latitude) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Location object
    const location = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    };

    // Save in Location db
    Location.create(location)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message + ". Some error occurred while saving the Location."
            });
        });
};

// Retrieve all Locations from the database
exports.findAll = (req, res) => {

    Location.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message + ". Error retrieving all locations"
            });
        });
};