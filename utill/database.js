const Sequelize = require('sequelize');
// const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const passWord = process.env.SEQUELIZE_PASSWORD
const database = process.env.SEQUELIZE_DATABASE
const host = process.env.DB_HOST
const userName = process.env.DB_USERNAME

const sequelize = new Sequelize(database,userName,passWord,{
    dialect : 'mysql',
    host : host
});

module.exports = sequelize;
