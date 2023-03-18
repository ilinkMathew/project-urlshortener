

require('dotenv').config();
const app = require(".");
const client = require('./mongo');


// Basic Configuration
const port = process.env.PORT || 3000;


app.listen(port, async function() {
    console.log(`Listening on port ${port}`);
    try {
    await client.connect()
    }catch(e){
        console.log(e.message);
        console.log(`Mongo Instance failed to connect`)
    }

  });