const express = require('express')
const app = express()
require('dotenv').config()
const mongodb = require('./modules/mongodb')
const cors = require('cors')
const SwaggerUI = require('swagger-ui-express')
const swagggerDocument = require('./swagger.json')
const session = require('express-session')
const  passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

app.use(cors());
app.use(express.json());
app.use(session({
    secret:  'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((obj, done) => {
    done(null, obj);
})
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