const express = require('express');
const expenseDataCon = require('../controls/epenseDataControl')
const authorization = require('../middleWare/auth')

const router = express.Router();

// creating expense
router.post('/expense-data',authorization.authenticateAddExpense,expenseDataCon.creatingExpense)

//geting all data after login
router.post('/get-data',authorization.authenticateAddExpense,expenseDataCon.gettingAllData)

// deleting expense
router.delete('/delete-data/:id',authorization.authenticateAddExpense, expenseDataCon.deleteData)

// editing expense
router.get('/edit-data/:id',authorization.authenticateAddExpense,expenseDataCon.editingData)

// updating data
router.put('/updated-data',authorization.authenticateAddExpense, expenseDataCon.updateData)



module.exports= router;