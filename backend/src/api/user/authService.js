const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')
const emailRegex = /\S+@\S+\.\S+/
//const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
const passwordRegex = /((?=.*[a-z]).{3,20})/
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:"gabr13lp.roch@gmail.com",
        pass:"lrpmawgskcggfsip"
    },
    
});  


const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).send({ errors })
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    // const emailOptions = req.body.email || ''
    const password = req.body.password || ''
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } 
        else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const { name, _id} = user
            res.send({ user, token })
                     
            
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
  
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err })
    })
}

const signup = (req, res, next) => {
    
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    const adm = req.body.adm || ''
 console.log()
  
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informa está inválido'] })
    }
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20."
    ]})
    }

  
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            const newUser = new User({ email, email, password: passwordHash ,adm ,name })
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    login(req, res, next)
                }
            })
        }
    })
  }
  

  const forgotpassword = (req, res, next) => {
    const email = req.body.email || ''

    // if (!email.match(emailRegex)) {
    //     return res.status(400).send({ errors: ['login está inválido'] })
    // }

User.findOne({ email }, (err, user) => {
    if (err) {
        return sendErrorsFromDB(res, err)
    } else if (user) {
        const old_password = {password:user.password}
        const new_password = Math.random().toString(36).slice(-10);
        const salt = bcrypt.genSaltSync()
        const passwordHash = bcrypt.hashSync(new_password, salt)
        User.update(old_password,{$set:{password : passwordHash}}, err => {
            if (err) {
                return sendErrorsFromDB(res, err)
            } else {
               console.log("Nova senha "+new_password )  
               const texto =`Olá, ${user.name}</br> Uma nova Senha foi gerada:    ${new_password}  </br> Atenciosamente</br> Mymoney.`
               const emailOptions = {
                           
                   from: "gabr13lp.roch@gmail.com",
                   to: user.email,
                   subject: 'E-mail enviado usando Node!',
                   text:"olá Caro",
                   html:texto
               }
               transporter.sendMail(emailOptions, function(errors,info){
                if(errors){
                    return res.status(400).send({errors})
                    console.log(error);
                }else {
                    console.log("Email enviado"+user.email);
                   return res.status(200).send({ success: ['Operação Realizada com sucesso ! Verificar e-mail cadastrado'] })
                    
                }
            });
            }
        })

    } else {
        return res.status(400).send({ errors: ['Login não cadastrado'] })
    }
})
  }

  
  const updadePassword = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''
    const new_password = req.body.password_new || ''
    const confirmPassword = req.body.confirm_password || ''


    if (!new_password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6 - 20."
    ]})
    }
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(new_password, salt)
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const old_password = {password:user.password}
        

            User.update(old_password,{$set:{password : passwordHash}}, err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                 
                  const token = jwt.sign(user, env.authSecret, {
                    expiresIn: "1 day"
                })

                const texto =`Olá, ${user.name}</br> Senha Alterada:!</br> Atenciosamente</br> Mymoney.`
                const emailOptions = {
                            
                    from: "gabr13lp.roch@gmail.com",
                    to: user.email,
                    subject: 'E-mail enviado usando Node!',
                    text:"olá Caro",
                    html:texto
                }
                transporter.sendMail(emailOptions, function(errors,info){
                 if(errors){
                     return res.status(400).send({errors})
                     console.log(error);
                 }else {
                     console.log("Email enviado"+user.email);

                     
                 }
             });
                
                const { name, email ,_id} = user
                res.send({ user, token })
                   
                }
            })
    
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
  }


  module.exports = { login, signup, validateToken , forgotpassword , updadePassword } 

