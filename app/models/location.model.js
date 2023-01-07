const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        longitude: {
            type: Sequelize.DOUBLE
        },
        latitude: {
            type: Sequelize.DOUBLE
        }, 
    });
    return Location;
};