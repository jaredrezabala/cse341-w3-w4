const express = require('express')
const router = express.Router()
const movieController = require("../controllers/moviesController")
const {validationRules, checkMovie} = require('../validator')

router.get("/", movieController.getAll)
router.get("/:id", movieController.getSingle)
router.post("/", validationRules(), checkMovie, movieController.addMovie)
router.put("/:id", validationRules(), checkMovie, movieController.updateMovie)
router.delete("/:id", movieController.deleteMovie)

module.exports = router