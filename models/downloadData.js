const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const Download = sequelize.define('downloaddata',{

    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    filename : Sequelize.STRING,
    url : Sequelize.STRING,
  
});

module.exports = Download;