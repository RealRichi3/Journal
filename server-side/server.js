
// const {MongoClient} = require('mongodb')
const express = require("express")
const morgan = require("morgan")
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoutes')

// Initialize database
const uri = 'mongodb://localhost:27017/journalX'
mongoose.connect(uri)
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log(`Successfully connected to ${db.name} database....`)
})

// async function main(){
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log(`Successfully connected to ${client.db().databaseName} database....`)
//     }
//     catch(error) {
//         console.log(error);
//     }
//     finally {
//         await client.close();
//     }
// }

// main().catch(console.error)

// Express
const app = express();
const jsonParser = express.json();
const PORT = process.env.PORT || 5000;

app.use(jsonParser);
app.use(morgan('dev'));

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}....`)
});
