 
const User = require('../api/user/user')


module.exports = (req, res, next) => {
   // console.log("chegou no isAdmin   "+req.userId  + "           req.url"+ req.url)
 

    if(req.userId != undefined){
       
            const sendErrorsFromDB = (res, dbErrors) => {
                const errors = []
                _.forIn(dbErrors.errors, error => errors.push(error.message))
                return res.status(400).send({ errors })
            }
            // CORS preflight request


        const _id = {_id : req.userId  }
        const urlAll =  req.url.split("/")[1].split("/")[0]
        
     
       

        if( urlAll =='admin' || urlAll =='messageAdmin' ){

        User.findOne({ _id }, (err, user) => {
            if (err) {
                return sendErrorsFromDB(res, err)
            } else if (user.adm =='SIM' ) {
             
                req.userId = req.userId
                    next()   
                
            } else {
               
                res.status(401).send({ errors: ['Usuário Não Autorizado'] })
            }
        })
        } else{
           
  
           // res.userId = req.userId
            next() 
        }
    }else{
           
        next() 
    }
}

    

