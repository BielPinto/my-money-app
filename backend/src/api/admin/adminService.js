const Admin = require('../user/user')
const BillingCycle = require('../billingCycle/billingCycle')
const goals = require('../goals/goals')
const Message = require('../message/message')
const errorHandler = require('../common/errorHandler')

Admin.methods(['get', 'post', 'put', 'delete'])
Admin.updateOptions({new: true, runValidators: true})
Admin.after('post', errorHandler).after('put', errorHandler)

Admin.route('count', (req, res, next) => {
    Admin.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
           
            const users  = {userCount:value} 
               // console.log(users)
            res.json(users)
        }
    }) 
})


Admin.route('clearUser', (req, res, next) => {
    
    const _id = req.body._id || ''
    console.log("clearUser "+_id)

    BillingCycle.remove({matricula:_id},(error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
           
            //const users  = {userCount:value} 
                console.log("billing  "+value)
         //   res.json(users)
        }
    }) 

    goals.remove({matricula:_id},(error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
           
            //const users  = {userCount:value} 
                console.log("goals  "+value)
         //   res.json(users)
        }
    }) 

    Message.remove({matricula:_id},(error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
           
            //const users  = {userCount:value} 
                console.log("Message  "+value)
         //   res.json(users)
        }
    }) 

    Admin.remove({_id:_id},(error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
           
            //const users  = {userCount:value} 
            res.status(200).send(value)
         //   res.json(users)
        }
    }) 
   
})

Admin.route('lista', (req, res, next) => {

    const adm = 'NAO' // req.userId || ''
    Admin.find( (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
            res.send(result || {})
        }
})
 

})

module.exports = Admin