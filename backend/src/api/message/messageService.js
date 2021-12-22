

const Message = require('./message')
const errorHandler = require('../common/errorHandler')

const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

Message.methods(['get', 'post', 'put', 'delete'])
Message.updateOptions({new: true, runValidators: true})
Message.after('post', errorHandler).after('put', errorHandler)

// Message.route('count', (req, res, next) => {
//     Message.count((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//            // console.log(value)
//             res.json({value})
//         }
//     }) 
// })

Message.route('messageCount', (req, res, next) => {
    const UserId = req.userId || ''
    Message.aggregate([{
        $match: {
            matricula: UserId
        }
    }, {
        $count: 'messageUser'
    }], (error, result) => {
            if(error) {
                res.status(500).json({errors: [error]})
            } else {
               
                const resultado =  result[0] != undefined ? result[0]: {messageUser:0}
                
                const { messageUser} =   {messageUser:resultado}
             
                res.json(messageUser)
            }
    })
})



Message.route('lista', (req, res, next) => {
    const UserId = req.userId || ''
    Message.aggregate([
        {
            $match: {
            matricula: UserId
            }
        }, {
            $project: {
                titulo: "$titulo",
                name: "$name",
                matricula: "$matricula",
                dateMessage: "$dateMessage",
                comments: "$comments",
                userSend: "$userSend",
                dateResp: "$dateResp",
                nomeAdmin: "$nomeAdmin",
                matriAdmin: "$matriAdmin",
                respAdmin: "$respAdmin",
                adminSend: "$adminSend"
                
            
            }
        },
        {
            $sort: {
                  'dateMessage' : -1
              }
          }
        ], (error, result) => {
            if(error) {
                res.status(500).json({errors: [error]})
            } else {
                
                res.send(result)
            }
    })
})



module.exports = Message



