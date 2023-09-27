const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
const mongodb = require('mongodb')

require('dotenv').config();



const User = require('../models/userSinup');
const Expenses = require('../models/expenseData');
const Download = require('../models/downloadData')

exports.sinUpRoute = async (req, res, next) => {

    try {
    
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // encryption
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            console.log(err)

            const user = new User({
                name: name,
                email: email,
                password: hash
              });
            await user.save()
            res.status(201).json({ msg: 'Regitered' })
        })


    } catch (err) {
       
        if (err == 'SequelizeUniqueConstraintError: Validation error') {

            res.status(400).json(err);
        }
    }


}


function generateWebToken(id,name) {
    return jwt.sign({ userId: id,name : name }, process.env.JWT_SECRET_KEY)

}

exports.loginRoute = async (req, res) => {
    try {
        const logInemail = req.body.email
        const logInPassword = req.body.password

        const user = await User.findOne({ email: logInemail  })

        console.log('id+' + user)

        bcrypt.compare(logInPassword, user.password, (err, result) => {
            if (err) {
                res.status(500).json({ msg: 'Something is wrong' })
            }
            if (result == true) {
               
                res.status(201).json({ userdetails: user, token: generateWebToken(user._id,user.name) })
             
             } else {
            res.status(401).json({ msg: 'Incorrect Password' })
            }
        })

    } catch (err) {
        console.log(' err msg -'+ err)
       
    }
}


exports.download = async (req, res) => {
    try {
        const id = req.user.id

        const expenses = await Expenses.findAll({
            where: { sinupId: id },
            attributes: ['expense', 'description']
        });

        const stringyFiedExpense = JSON.stringify(expenses);

        let today = new Date();
        let date = today.getDate()
        let sec = today.getSeconds()

        const fileName = `Expense${req.user.id}.txt/${date}/${sec}`;

        const fileUrl = await uploadToS3(stringyFiedExpense, fileName)

        await Download.create({
            filename: fileName,
            url: fileUrl.Location,
            sinupId: id
        })

        let down = await Download.findAll({
            where: { sinupId: id },
            attributes: ['filename', 'url']
        })


        res.status(201).json({ msg: 'File downloaded', fileUrl, down, succes: true })
    }catch (err) { console.log(err) }
    }

function uploadToS3(data, fileName) {



    const BUCKET_NAME = process.env.S3_BUCKET_NAME; // bucket name

    const IAM_USER_KEY = process.env.S3_USER_KEY; //id created in Security credentilas


    const IAM_USER_SECRET = process.env.S3_USER_SECRET; //Password created in Security credentilas


    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,

    })

    let params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {

        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log('Success', s3response)
                resolve(s3response)
            }
        })
    })


}

