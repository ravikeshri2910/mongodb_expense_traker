const express = require('express');
const passwordCon = require('../controls/passwordCon')
// const authorization = require('../middleWare/auth')

const router = express.Router();

router.post('/forgotpassword',passwordCon.forgotpassword)

// /password/resetpassword/${id}

router.get('/resetpassword/:id',passwordCon.resetpassword)

///password/updatePassword/${id}

router.post('/updatePassword/:id', passwordCon.updatepassword)
module.exports = router;

// /password/resetpassword