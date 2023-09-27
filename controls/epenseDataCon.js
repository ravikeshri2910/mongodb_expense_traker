const expenseData = require('../models/expenseData');
const User = require('../models/userSinup')

exports.creatingExpense = async (req, res) => {

    try {
        const userId = req.user.id

        const { expense, description, category } = req.body

        let data = await expenseData.create({
            expense: expense,
            description: description,
            category: category,
            userId: userId,
      
        })

        const tExpense = Number(req.user.totalExpense) + +expense
        console.log('totalexpense '+tExpense)


       let user =  await User.findOneAndUpdate({_id : req.user._id},{ totalExpense: tExpense })
        
        res.status(201).json({ userdetails: data, user: user })

    } catch (err) {
        console.log(err)
    }
}

exports.gettinAllData = async (req, res) => {
    try {
        console.log('here')
        const userId = req.user.id
        // console.log(userId)
        const page = +req.params.page || 1
        const pageLimit = +req.params.pageLimit || 2

        let limit = pageLimit;//2
        let skip = (page - 1) * limit;
        let totalItem;


        // First, count the total number of documents matching the query
        totalItem = await expenseData.countDocuments({ userId: userId });

        // Then, retrieve the data with pagination
        let data = await expenseData.find({
            userId: userId
        })
            .skip(skip)
            .limit(limit);

        console.log(data.length);

        let user = req.user;
        res.status(201).json({
            userdetails: data,
            user: user,
            currentPage: page,
            hasNextPage: limit * page < totalItem,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItem / limit),
        });

    } catch (err) { console.log(err) }
}

exports.deleteData = async (req, res) => {

    try {
        let deleteId = req.params.id;
        const userId = req.user._id


        let field = await expenseData.findOne({_id : deleteId})

        const tExpense = Number(req.user.totalExpense) - +(field.expense)
    

        await User.updateOne({_id : userId},{ totalExpense: tExpense })

         
        let data = await expenseData.findOneAndDelete({ _id: deleteId })

        res.status(201).json({ msg: 'deleted' })
        
    } catch (err) {

        console.log(err)
    }
}

exports.editingData = async (req, res) => {
    try {
        let dataId = req.params.id;
        let data = await expenseData.findOne({ _id: dataId })

        res.status(201).json({ userdetails: data })

    } catch (err) { console.log(err) }
}

exports.updateData = async (req, res) => {
 
    try {
        let dataId = req.body.id;
        let updatedExpense = req.body.updatedExpense;
        let updatedDescription = req.body.updatedDescription;
        let updatecatagory = req.body.updatecatagory;

        let update = {
            expense : updatedExpense,
            description : updatedDescription,
            category : updatecatagory
        }

        let oldData = await expenseData.findOne({ _id: dataId })
        let updatedData = await expenseData.findOneAndUpdate({ _id: dataId },update)
        let newData = await expenseData.findOne({ _id: dataId })

        console.log(newData)

        let value = Number(updatedExpense) - Number(oldData.expense)
console.log(updatedExpense,oldData.expense,value)
        const tExpense = Number(req.user.totalExpense) + Number(value)
        console.log('totalexpense '+ tExpense)

        await User.updateOne({_id : req.user._id},{ totalExpense: tExpense })

        res.status(201).json({ msg: 'Updated' })

    } catch (err) {

        console.log(err)
    }
}