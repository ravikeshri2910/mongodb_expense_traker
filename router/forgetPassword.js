const express = require('express');
const passwordCon = require('../controls/passwordCon')
const authorization = require('../middleWare/auth')

const router = express.Router();

router.post('/forgotpassword',passwordCon.forgetPassword)

// /password/resetpassword/${id}

router.get('/resetpassword/:id',passwordCon.resetPassword)

///password/updatePassword/${id}

router.post('/updatePassword/:id', passwordCon.updatePassword)
module.exports = router;

// /password/resetpassword