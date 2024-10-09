const express = require('express')
const router = express.Router()
const movieController = require("../controllers/moviesController")
const {validationRules, checkMovie} = require('../validator')
const authenticate = require("./auth")

router.get("/", movieController.getAll)
router.get("/:id", movieController.getSingle)
router.post("/",authenticate, validationRules(), checkMovie, movieController.addMovie)
router.put("/:id",authenticate, validationRules(), checkMovie, movieController.updateMovie)
router.delete("/:id",authenticate, movieController.deleteMovie)
module.exports = router