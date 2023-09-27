

const Order = require('../models/order');
const Razorpay = require('razorpay')


exports.purchasepremium = async (req,res)=>{
    try{
        console.log('here')
        const rzp = new Razorpay({
            
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
           
        })
        const amount = 2500;

        rzp.orders.create({amount , currency : "INR"}, (err, order) => {
            
            if(err){
                throw new Error(JSON.stringify(err))
            }
            const neworder = new Order({
                orderid : order.id,
                status : 'Pending'
              });
              neworder.save().then(()=>{
                return res.status(201).json({order,key_id : rzp.key_id})
            }).catch(err => {throw new Error (err)})
        }) 

    }catch(err){
        console.log(err)
        res.status(403).json({msg : 'Something wrong',error : err})
    }
}

exports.primiumUpdate = async(req,res)=>{
    try{
    const {order_id,payment_id} = req.body

    console.log("req.user")
    console.log(order_id,payment_id)
    // console.log(req.user)

    let data = await Order.findAll({_id : order_id})
    console.log('data'+ JSON.stringify(data))
    

    data[0].paymentid = payment_id,
    data[0].status = 'Success',
 
    await data[0].save()

    let udata = await Order.findAll({where : {orderid : order_id}})
    console.log('udata'+ JSON.stringify(udata))

    await req.user.update({isPremium : true})

    res.status(201).json({message : 'payment done'})

    }catch(err){console.log(err)}
}

exports.failedprimiumUpdate = async (req,res)=>{
    try{

    const {order_id,payment_id} = req.body

    // console.log(order_id,payment_id)

    let data = await Order.findAll({where : {orderid : order_id}})
    // console.log('data'+ JSON.stringify(data))
    

    data[0].paymentid = payment_id,
    data[0].status = 'Failed',
 
    await data[0].save()

    await req.user.update({isPremium : false})

    res.status(201).json({message : "Payment failed"})

    }catch(err){console.log(err)}
}