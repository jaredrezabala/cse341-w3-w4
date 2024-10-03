const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Welcome to my web!')
})

router.use("/movies", require('./movies'))

module.exports = router