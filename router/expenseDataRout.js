const express = require('express');
const expenseDataCon = require('../controls/epenseDataCon')
const authorization = require('../middleWare/auth')

const router = express.Router();

// creating expense
router.post('/expense-data',authorization.authenticateAddExpense,expenseDataCon.creatingExpense)

//geting all data after login
router.get('/get-data/:page/:pageLimit',authorization.authenticateAddExpense,expenseDataCon.gettinAllData)

// deleting expense
router.get('/raat-data/:id',authorization.authenticateAddExpense, expenseDataCon.deleteData)

// editing expense
router.get('/edit-data/:id',authorization.authenticateAddExpense,expenseDataCon.editingData)

// updating data
router.post('/updated-data',authorization.authenticateAddExpense, expenseDataCon.updateData)



module.exports= router;