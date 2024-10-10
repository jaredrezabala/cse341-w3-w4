const express = require('express')
const router = express.Router()
const heroController = require('../controllers/superheroesController')
const {validationRules, checkHeroe} = require('../middleware/heroeValidator')
const authentication  = require("../middleware/authorization")

router.get("/", heroController.getAll)
router.get("/:id", heroController.getSingle)
router.post("/",authentication, validationRules(), checkHeroe, heroController.addHeroe)
router.put("/:id",authentication, validationRules(), checkHeroe, heroController.updateHeroe)
router.delete("/:id",authentication, heroController.deleteHeroe)

module.exports = router