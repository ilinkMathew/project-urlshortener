
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pwd}@cluster0.sl9ry5y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.on('connectionReady',()=>console.log('Db connected!'))
client.on('connectionClosed',()=>console.log('Db connection closed!'))
client.on('error',(e)=>console.log(e));
module.exports = client;


