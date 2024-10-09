const express = require('express')
const router = express.Router()
const movieController = require("../controllers/moviesController")
const {validationRules, checkMovie} = require('../validator')
const { isAuthenticated } = require('../authenticate')

router.get("/", movieController.getAll)
router.get("/:id", movieController.getSingle)
router.post("/", isAuthenticated, validationRules(), checkMovie, movieController.addMovie)
router.put("/:id", isAuthenticated, validationRules(), checkMovie, movieController.updateMovie)
router.delete("/:id", isAuthenticated, movieController.deleteMovie)

module.exports = router