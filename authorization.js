const express = require('express');

const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.status(401).json("You do  not have permission to access this page, please log in")
    }
}

module.exports  = authenticated;