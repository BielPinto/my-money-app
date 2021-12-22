const Goals = require('./goals')
const errorHandler = require('../common/errorHandler')
const User = require('../user/user')

Goals.methods(['get', 'post', 'put', 'delete'])
Goals.updateOptions({new: true, runValidators: true})
Goals.after('post', errorHandler).after('put', errorHandler)

// Goals.route('count', (req, res, next) => {
//     Goals.count((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//            // console.log(value)
//            const goalsCount  = {goalsCount:value} 
            
//             res.json(goalsCount)
//         }
//     })
// })



Goals.route('count', (req, res, next) => {
    const UserId = req.userId || ''
    Goals.aggregate([
        {
            $match: {
            matricula: UserId
            }
        }, {
            $count: 'goalsCount'
        }
        ], (error, result) => {
            if(error) {
                res.status(500).json({errors: [error]})
            } else {

                const resultado =  result[0] != undefined ? result[0]: {goalsCount:0}
                
                const { goalsCount} =   {goalsCount:resultado}
                
                res.json(goalsCount)
            }
    })
})


Goals.route('lista', (req, res, next) => {
    const UserId = req.userId || ''
    Goals.aggregate([
        {
            $match: {
            matricula: UserId
            }
        }, {
            $project: {
                valueGoal: "$valueGoal",
                matricula: "$matricula",
                nameGoal: "$nameGoal",
                dateInit: "$dateInit",
                dateEnd: "$dateEnd",
                deposited: "$deposited",
                depositedAll: { $sum: "$deposited.value" },
                difference: {$subtract: ["$valueGoal", {$sum: "$deposited.value"}] }
            
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


module.exports = Goals


