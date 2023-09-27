const ExpenseData = require('../models/expenseData');
const User = require('../models/userSinup');
const sequelize = require('../utill/database');


exports.leadboardDetails = async (req, res) => {
 
    try {
        const users = await User.find({}, 'name totalExpense')
        .sort({ totalExpense: -1 }); // Sort in descending order

    res.status(201).json({ udata: users });

    } catch (err) { console.log(err) }
}

