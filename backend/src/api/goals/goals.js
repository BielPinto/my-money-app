const restful = require('node-restful')
const mongoose = restful.mongoose

const depositeSchema = new mongoose.Schema({
    date: { type: String, required: true },
    value: { type: Number, min: 0, required: true },
    description: { type: String ,required: false}
})


const goalSchema = new mongoose.Schema({
    matricula:  { type: String, required: true },
    nameGoal: { type: String, required:  [true, 'Informe nome da Meta!']  },
    dateInit:  { type: String,required:  [true, 'Informe a Data Inicial!']  },
    dateEnd: { type: String,required:  [true, 'Informe a Data Final'] },
    valueGoal: { type: Number, min: 0, required:  [true, 'Informe a o valor da Meta!']  },
    deposited: [depositeSchema]
})

module.exports = restful.model('Goals', goalSchema)