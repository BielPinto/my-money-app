const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true },
    adm: { type: String, required: true, uppercase: true, enum: ['SIM', 'NAO'] }
   // level: { type: Number, min: 0, max: 2, required: true }
})
module.exports = restful.model('User', userSchema)
