const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Welcome to my web!')
})

router.get('login', passport.authenticate('github'), (req, res) =>{})
router.get('logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    })
})
router.use("/github/callback", require('./githubOAuth'))
router.use("/movies", require('./movies'))

module.exports = router