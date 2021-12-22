const restful = require('node-restful')
const mongoose = restful.mongoose


const messageSchema = new mongoose.Schema({
    titulo: { type: String, required: false, uppercase: true, enum: ['ELOGIOS',  'RECLAMACAO','OUTROS'] },
    name: { type: String, required: true },
    matricula:  { type: String, required: true },
    dateMessage: { type: String,  required: true },
    comments: { type: String,  required : true },
    userSend: { type: String, required: false, uppercase: true, enum: ['SIM',  'NAO'] },
    dateResp: { type: String,  required : false },
    nomeAdmin: { type: String,  required : false },
    matriAdmin: { type: String,  required: false },
    respAdmin: { type: String,  required: false },
    adminSend: { type: String, required: false, uppercase: true, enum: ['SIM',  'NAO'] }
    
})

module.exports = restful.model('Message', messageSchema)