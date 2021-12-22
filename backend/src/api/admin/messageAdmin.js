

const MessageAdmin = require('../message/message')
const errorHandler = require('../common/errorHandler')

const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

MessageAdmin.methods(['get', 'post', 'put', 'delete'])
MessageAdmin.updateOptions({new: true, runValidators: true})
MessageAdmin.after('post', errorHandler).after('put', errorHandler)

MessageAdmin.route('count', (req, res, next) => {
    MessageAdmin.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           // console.log(value)
            res.json({value})
        }
    }) 
})

 MessageAdmin.route('answered', (req, res, next) => {
    const UserId = req.userId || ''
    const respondido = {}
   
     MessageAdmin.aggregate([{
        $match: {
            adminSend: "SIM"
        }
    }, {
        $count: 'answered'
    }], (error, result) => {
                if(error) {
                    res.status(500).json({errors: [error]})
                } else {
     
                    res.json(result[0].answered || 0)
                }
        }


    )

})

MessageAdmin.route('notAnswered', (req, res, next) => {
    const UserId = req.userId || ''
    const respondido = {}
   
     MessageAdmin.aggregate([{
        $match: {
            adminSend: "NAO"
        }
    }, {
        $count: 'notAnswered'
    }], (error, result) => {
                if(error) {
                    res.status(500).json({errors: [error]})
                } else {


                    
                    res.json(result[0].notAnswered || 0)
                }
        }


    )

})



MessageAdmin.route('lista', (req, res, next) => {

    const adm = 'NAO' // req.userId || ''
    MessageAdmin.find( (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
            res.send(result || {})
        }
})
 

})





module.exports = MessageAdmin



