// const jwt = require('jsonwebtoken');

// const sinUp = require('../models/userSinup');
const jwt = require('jsonwebtoken');
const User = require('../models/userSinup');


exports.authenticateAddExpense = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        // console.log(" >>>>>>>>"+token)

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // console.log('user >>>>>'+JSON.stringify(user))
        User.findById(user.userId).then(user =>{
            req.user = user;
            // console.log('autothe')
            // console.log('user >>>>'+(req.user));
            next();
        }).catch(err => {throw new Error(err)})
    }catch(err) {console.log(err)}
} 

// try {
//     const token = req.header("Authorization");
//     console.log(token);
//     const user = jwt.verify(token, "secretkey"); //decrypt token
//     console.log(user.userId);
//     User.findById(user.userId).then((user) => {
//       req.user = user; //imp
//       next();
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(401).json({ success: false });
//   }
// };


module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');//coming from frontend
        // console.log("Token >>>>>>>>", token);

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY); // Make sure the secret matches the one used for signing

        // console.log('User ID >>>>>', user.userId);
        try {
            const foundUser = await sinUp.findByPk(user.userId);
            if (foundUser) {
                req.user = foundUser;
                // console.log('Authenticated User:', JSON.stringify(req.user));
                next();
            } else {
                throw new Error('User not found');
            }
        } catch (err) {
            throw new Error(err);
        }
    } catch (err) {
        console.log(err);
    }
};
