const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
// const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose');
// const morgan = require('morgan')



const sequelize = require('./utill/database');
const SinUp = require('./models/userSinup')
const ExpenseData = require('./models/expenseData');
const expenseRouter = require('./router/expenseDataRout')
const userRouter = require('./router/userDataRout')
const Order = require('./models/order')
const purchaseRouter = require('./router/purchase')
const premiumRouter = require('./router/premium')
const passwordRouter = require('./router/forgetPassword')
const Forgetpassword = require('./models/forgetPassRequest')
const Download = require('./models/downloadData')

// const logData = fs.createWriteStream(
//     path.join(__dirname , 'access.log'),
//     {flags : "a"}
// );

const app = express();

// app.use(function(req, res, next){
//     res.header("Content-Security-Policy", "default-src * 'unsafe-inline'  'unsafe-eval' data: blob:;")
//     next();
//  })

//http://3.80.172.222:3000/login.html new
//http://35.173.199.140:3000/login.html

//  app.use(function(req, res, next){ 
//     res.header("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; form-action 'self';") 
//     next(); 
// })

//app.use(helmet()) // this is use for increasing Security  after deploying
app.use(compression()) // it is use to decrease the file size we sending to the client
//app.use(morgan('combined',{stream : logData})) // it is use to collect log details .
app.use(cors()); // this is use to connect frontend to backend and vice-verse
app.use(bodyParser.json()); //this is use to convert the data into json

// Association


// creating expense
app.use('/logIn', expenseRouter)


//sinup and login data
app.use('/user', userRouter)


//primum route
app.use('/purchase', purchaseRouter)

//Premium Feature
app.use('/premium', premiumRouter)

// forget password
app.use('/password', passwordRouter)


// this is dynamic rout for frontend
// app.use((req,res)=>{

//     res.sendFile(path.join(__dirname, `views/${req.url}`))
// })

// http://localhost:4000/password/resetpassword

mongoose
    .connect(
        // 'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
        // KD9EIW1WdPSpiG1n
        'mongodb+srv://ravikeshri2910:KD9EIW1WdPSpiG1n@cluster0.nqcwyrc.mongodb.net/expenseTraker?retryWrites=true&w=majority'

    )
    .then(result => {
        app.listen(4000);
        console.log('Connected')
    })
    .catch(err => {
        console.log(err);
    });