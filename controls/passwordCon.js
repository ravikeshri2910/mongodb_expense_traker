
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const SinUp = require('../models/userSinup')
const ForgetPasswordtable = require('../models/forgetPassRequest');
const { error } = require('console');


exports.forgetPassword = async (req, res) => {

    try {
        const email = req.body.email
        console.log(email)

        const user = await SinUp.findOne( { email: email  })

        if (user) {
            // console.log(user)

            const id = uuid.v4();

            const client = Sib.ApiClient.instance;

            var apiKey = client.authentications['api-key'];
            apiKey.apiKey = process.env.API_KEY

            const tranEmailApi = new Sib.TransactionalEmailsApi()

            const sender = {
              
                email: process.env.SIB_USER,
                name:  process.env.SIB_NAME
               
            }

            const recevers = [{
                email: email
            }]

            await tranEmailApi.sendTransacEmail({
                sender,
                to: recevers,
                subject: `Otp verification`,
                textContent: `Click on Reset`,
                htmlContent: `<a href = "http://localhost:4000/password/resetpassword/${id}">http://localhost:4000/password/resetpassword/${id}</a>`
            })

            await ForgetPasswordtable.create({
                id: id,
                isActive: true,
                sinupId: user.id
            })

           
            res.status(201).json({ msg: 'Email sent' })
        } else {
            throw new error('User not exist')
        }
    } catch (err) { console.log(err) }
}


exports.resetPassword = async (req, res) => {

    try {
        const id = req.params.id

        let forgetRequest = await ForgetPasswordtable.findOne({ where: { id: id } })

        if (forgetRequest) {
           

            res.status(200).send(

                `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset password</title>
            </head>
            <body>
                
            
                <foem action="/password/updatePassword/${id}" method="GET">
                    <label for="newPassword">Enter Your new Password</label>
                    <input id="newpassword" name="newPassword" type="text"></foem>
                    <button id="submit">Reset Password</button>
            
                </form>
            </body>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
            <script>
                const submit = document.getElementById('submit')
                submit.addEventListener('click',updatePassword)
            
                async function updatePassword(e){
                    e.preventDefault()
            
                    const npass = document.getElementById('newpassword').value
                    console.log(npass)
                    const obj = {
                        npassword : npass
                    }
            
                    const res = await axios.post("http://localhost:4000/password/updatePassword/${id}",obj)
            
                    // console.log(res)

                    alert(res.data.msg)
               
            
                }
            </script>
            </html>`
            )
        }
        res.end()




    } catch (err) { console.log(err) }
}


exports.updatePassword = async (req, res) => {
    try {
        const id = req.params.id

        const newPassword = req.body.npassword

        // console.log(newPassword, id)

        let forgetTable = await ForgetPasswordtable.findOne({ where: { id: id } })

        if (forgetTable.isActive === false) {
            return res.status(201).json({ msg: 'Link expired' })
        }

        let user = await SinUp.findOne({ where: { id: forgetTable.sinupId } })

        const saltrounds = 10;
        bcrypt.hash(newPassword, saltrounds, async (err, hash) => {
            console.log(err)
            await user.update({
                passWord: hash
            })
        })

        await forgetTable.update({ isActive: false })
        res.status(201).json({ msg: 'Updated new password' })

    } catch (err) { console.log(err) }


}