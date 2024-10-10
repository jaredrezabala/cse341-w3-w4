const express = require('express')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send(req.session.profile !== undefined ? `Welcome to my API ${req.session.profile.username} visit /logout to sign out!` : `Welcome to my API, please visit /login to get full access to the endpoints!`)
    console.log(req.session.profile)
})

router.use("/movies", require('./movies'))
router.use("/superheroes", require('./superheroes')//#swagger.tags=['Superheroes']
)

router.get('/login', passport.authenticate('github', { 
    scope: ['user:email'] })//#swagger.ignore = true
);

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        req.session.profile  = req.user;
        res.redirect('/api-docs'); 
    }
//#swagger.ignore = true
);
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            return res.status(400).json({ message: err.message });
        }else{
            res.redirect('/')
        }
    });
}//#swagger.ignore = true
)
module.exports = router
