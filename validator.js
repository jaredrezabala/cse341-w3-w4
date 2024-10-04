const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return[
        body('title').notEmpty().withMessage("Please enter a title"),
        body('genre').notEmpty().withMessage("Please enter a genre"),
        body('director').notEmpty().withMessage("Please enter a director name"),
        body('releaseYear').isInt().withMessage("Please enter a whole number"),
        body('duration').isInt().withMessage("Please enter a whole number"),
        body('rating').isDecimal().withMessage("Please enter a decimal number"),
        body('synopsis').notEmpty().withMessage("Please enter a synopsis"),
    ]
}
const checkMovie = (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({
        errors: errors.array(),
       })
    }
    next()
}

module.exports = {
    validationRules,
    checkMovie
}