const express = require('express');
const purchaseControl = require('../controls/purchaseControl')
const authorization = require('../middleWare/auth')

const router = express.Router();

router.get('/premiummembership',authorization.authenticateAddExpense , purchaseControl.purchasepremium)

router.post('/updatetransactionstatus',authorization.authenticateAddExpense ,purchaseControl.primiumUpdate)

router.post('/failed/updatetransactionstatus',authorization.authenticateAddExpense ,purchaseControl.failedprimiumUpdate)




module.exports= router;