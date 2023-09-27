
const Sequelize = require('sequelize');


const sequelize = require('../utill/database');

const ForgetPassword = sequelize.define('forgetpasswordreqs',{

    id : {
        type:Sequelize.STRING,
        primaryKey : true
    },
    userId : Sequelize.STRING,
    isActive : Sequelize.BOOLEAN

})

module.exports = ForgetPassword;