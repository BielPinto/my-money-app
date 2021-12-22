const UserOnly = require('../user/user')
const errorHandler = require('../common/errorHandler')
const passwordRegex = /((?=.*[a-z]).{3,20})/
const nodemailer = require("nodemailer");
const _ = require('lodash')
const env = require('../../.env')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

UserOnly.methods(['get', 'post', 'put', 'delete'])
UserOnly.updateOptions({new: true, runValidators: true})
UserOnly.after('post', errorHandler).after('put', errorHandler)

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:"gabr13lp.roch@gmail.com",
        pass:"lrpmawgskcggfsip"
    },
    
}); 

UserOnly.route('count', (req, res, next) => {
    UserOnly.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           // console.log(value)
            res.json({value})
        }
    }) 
})

UserOnly.route('lista', (req, res, next) => {

    const _id = req.userId || ''
    

    UserOnly.findOne({ _id }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
           
            res.send(result || {})
        }
})
 

})


UserOnly.route('updadePassword', (req, res, next) => {

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
       

    UserOnly.findOne({ email: email }, (err, user) => {
       
    
        
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user && password === user.password) {
           
            const old_password = {password:user.password}
        

            UserOnly.update(old_password,{$set:{password : passwordHash}}, err => {
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
                
                const { name, email ,_id , adm , password} = user
                // console.log("password  "+password)
                // console.log("token  "+token)
                res.send({ user, token })
                   
                }
            })
    
        } else {


            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
 

})



module.exports = UserOnly