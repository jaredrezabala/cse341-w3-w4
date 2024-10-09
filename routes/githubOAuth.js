const express = require('express')
const res = require('express/lib/response')
const passport = require('passport')
const router = express.Router()

router.get('github/callback', passport.authenticate('github', { 
    failureRedirect: '/api-docs' , 
    session: false}),
    (req, res) => {
        req.session.user = req.user
        res.redirect('/')
    } )

module.exports = router