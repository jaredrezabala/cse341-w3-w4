const express = require('express')
const app = express()
require('dotenv').config()
const mongodb = require('./modules/mongodb')
const cors = require('cors')
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('./swagger.json')

app.use(cors());
app.use(express.json());
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))
app.use("/", require("./routes"))
mongodb.initDB((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(3000, () => {
            console.log('Server and Database running on http://localhost:3000')
        })
    }
})