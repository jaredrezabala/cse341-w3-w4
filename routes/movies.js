const express = require('express')
const router = express.Router()
const movieController = require("../controllers/moviesController")
const {validationRules, checkMovie} = require('../middleware/movieValidator')
const authentication  = require("../middleware/authorization")

router.get("/", movieController.getAll)
router.get("/:id", movieController.getSingle)
router.post("/",authentication, validationRules(), checkMovie, movieController.addMovie)
router.put("/:id",authentication, validationRules(), checkMovie, movieController.updateMovie)
router.delete("/:id",authentication, movieController.deleteMovie)
module.exports = router