const { body, validationResult } = require('express-validator')
const validationRules = () => {
    return[
        body('name').notEmpty().withMessage("Please enter a name"),
        body('realName').notEmpty().withMessage("Please enter the heroe's real name"),
        body('powers').notEmpty().withMessage("Please enter superpowers"),
        body('universe').notEmpty().withMessage("Please enter which universe the heroe's come from"),
        body('allies').notEmpty().withMessage("Please enter the heroe's allies"),
        body('villains').notEmpty().withMessage("Please enter villains"),
        body('introductionYear').isInt().withMessage("Please enter a whole number"),
    ]
}
const checkHeroe = (req, res, next) => {
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
    checkHeroe
}