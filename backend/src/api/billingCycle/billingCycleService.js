const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')
const User = require('../user/user')
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           // console.log(value)
            res.json({value})
        }
    }) 
})

BillingCycle.route('countOnly', (req, res, next) => {
    const UserId = req.userId || ''
    BillingCycle.aggregate([
        {
            $match: {
            matricula: UserId
            }
        }, {
            $count: 'billingCyclesUser'
        }
        ], (error, result) => {
            if(error) {
                res.status(500).json({errors: [error]})
            } else {
                
                const resultado =  result[0] != undefined ? result[0]: {billingCyclesUser:0}
                
                const { billingCyclesUser} =   {billingCyclesUser:resultado}
                
                res.json(billingCyclesUser)
            }
    })
})

BillingCycle.route('allYears', (req, res, next) => {
    
    const UserId = req.userId || ''

    BillingCycle.distinct(
        'year', {matricula:UserId}, (error, result) => {
                    if(error) {
                        res.status(500).json({errors: [error]})
                    } else {
                        //console.log(result)
                        res.send(result || {})
                    }
            }
        )

})


BillingCycle.route('listaAnual', (req, res, next) => {
   
    const year = parseInt(req.body.year) 
    const UserId = req.userId || ''
    
    BillingCycle.aggregate([{
        $match: {
            matricula:UserId,
            year: year
        }
    }, {
        $project: {
            matricula: "$matricula",
            name: "$name",
            month: "$month",
            year: "$year",
            allDebits: {
                $sum: "$debts.value"
            },
            allCredits: {
                $sum: "$credits.value"
            }
        }
    },{
        $sort: {
              'month' : 1
          }
      }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           // console.log(result)
            res.send(result || {})
        }
})
 

})

BillingCycle.route('lista', (req, res, next) => {

    const UserId = req.userId || ''
    BillingCycle.aggregate([{
        $match: {
            matricula:UserId
        }
    }, {
        $project: {
            matricula: "$matricula",
            debts: "$debts",
            credits: "$credits",
            name: "$name",
            month: "$month",
            year: "$year",
            allDebits: {
                $sum: "$debts.value"
            },
            allCredits: {
                $sum: "$credits.value"
            },
            consolidated: {
                $subtract: [{
                    $sum: "$credits.value"
                }, {
                    $sum: "$debts.value"
                }]
            }
        }
    },
    {
        $sort: {
              'month' : -1
          }
      }
], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.send(result || {})
        }
})
 

})


BillingCycle.route('summary', (req, res, next) => { 
    const UserId = req.userId || ''

    BillingCycle.aggregate([
        {
            $match: { matricula:UserId }
        },
        { 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"} } 
    }, { 
        $group: {
                _id: null ,
                 credit: {$sum: "$credit"},
                debt: {$sum: "$debt"}
        }
    }, { 
        $project: {_id: 1, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle