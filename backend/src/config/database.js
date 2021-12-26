const mongoose = require('mongoose')
console.log(" 3 basedados")
//mongoose.Promise = global.Promise
//module.exports = mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true })     
module.exports =    mongoose.connect(
  //  'mongodb://meulogin:Minhasenha@cluster0-shard-00-00-el8so.mongodb.net:27017,cluster0-shard-00-01-el8so.mongodb.net:27017,cluster0-shard-00-02-el8so.mongodb.net:27017/mymoney?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
      'mongodb://meulogin:Minhasenha@cluster0-shard-00-00-el8so.mongodb.net:27017,cluster0-shard-00-01-el8so.mongodb.net:27017,cluster0-shard-00-02-el8so.mongodb.net:27017/mymoney?ssl=true&replicaSet=cluster0-shard-00-02-el8so.mongodb.net:27017&authSource=admin&retryWrites=true&w=majority',
      { useUnifiedTopology: true , useNewUrlParser: true}
 

  )
.then(()=> console.log('MongDB    connected')) 
.catch(err => console.log(err));

// var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb://meulogin:Minhasenha@cluster0-shard-00-00-el8so.mongodb.net:27017,cluster0-shard-00-01-el8so.mongodb.net:27017,cluster0-shard-00-02-el8so.mongodb.net:27017/mymoney?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
// module.exports =   MongoClient.connect(uri) 

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = 
    "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = 
    "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = 
    "'{VALUE}' não é válido para o atributo '{PATH}'."

