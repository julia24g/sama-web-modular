const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("Location", {
        longitude: {
            type: Sequelize.DOUBLE
        },
        latitude: {
            type: Sequelize.DOUBLE
        }, 
    });
    return Location;
};