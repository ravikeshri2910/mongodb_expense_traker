const express = require('express');
const userControl = require('../controls/userControl')
const authorization = require('../middleWare/auth')

const router = express.Router();

//sinup data
router.post('/expense-sinup-data', userControl.sinUpRoute)

// login 
router.post('/expense-login-data', userControl.loginRoute)


router.get('/download'  ,authorization.authenticateAddExpense, userControl.download)



module.exports = router;