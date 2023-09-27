const express = require('express');
const premiumControl = require('../controls/premiumControl')
const authorization = require('../middleWare/auth')

const router = express.Router();

router.get('/leadBoardDetails',authorization.authenticateAddExpense ,premiumControl.leadboardDetails)



module.exports= router;