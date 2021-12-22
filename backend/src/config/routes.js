const express = require('express')
const auth = require('./auth')
const isAdmin = require('./isAdmin')


module.exports = function (server) {
    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    

    server.use('/api', protectedApi)
    protectedApi.use([auth,isAdmin])

    
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    const Goals = require('../api/goals/goalsService')
    Goals.register(protectedApi, '/goals')
    
    const Admin = require('../api/admin/adminService')
    Admin.register(protectedApi, '/admin')

    const MessageAdmin = require('../api/admin/messageAdmin')
    MessageAdmin.register(protectedApi, '/messageAdmin')

    const Message = require('../api/message/messageService')
    Message.register(protectedApi, '/messageUser')


    const UserOnly = require('../api/userOnly/userOnlyService')
    UserOnly.register(protectedApi, '/userOnly')
   // console.log("UserOnly "+UserOnly)

    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)
    const AuthService = require('../api/user/AuthService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/forgotpassword', AuthService.forgotpassword)
    openApi.post('/updadePassword', AuthService.updadePassword)
    openApi.post('/validateToken', AuthService.validateToken)

}
