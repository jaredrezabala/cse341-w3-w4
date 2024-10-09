const express = require('express')
const app = express()
require('dotenv').config()
const mongodb = require('./modules/mongodb')
const cors = require('cors')
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('./swagger.json')
const passport = require('passport')
const session = require('express-session')
const github = require('passport-github2')

app.use(new github({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}))
passport.serializeUser((user ,done) =>{
    done(null,user)
})
passport.deserializeUser((user ,done) =>{
    done(null,user)
})
app.use(cors());
app.use(express.json());
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swagggerDocument))
app.use("/", require("./routes"), (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`:`Logged Out`)
})
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