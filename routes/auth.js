const express = require('express');
const router = express.Router()
const passport = require('passport')

router.get('/login', passport.authenticate('github', { 
    //#swagger.tags=['Authorization']
    scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
         //#swagger.tags=['Authorization']
        res.redirect('/api-docs'); 
    }
);
router.get('/logout', (req, res) => {
     //#swagger.tags=['Authorization']
    req.logout((err) => {
        if(err) {
            return res.status(400).json({ message: err.message });
        }else{
            res.redirect('/')
        }
    });
})
module.exports = router
