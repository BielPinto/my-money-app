const jwt = require('jsonwebtoken')
const env = require('../.env')


module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    }  else {
        let token =  req.headers.authorization

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
          }
       //console.log("token   "+token)
      
        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] })
        }
        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
               
            
                // console.log(decoded.$__)
                req.userId = decoded.$__._id
                

                next()
            }
        })
    }
}
