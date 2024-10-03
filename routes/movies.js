const express = require('express')
const router = express.Router()
const movieController = require("../controllers/moviesController")

router.get("/", movieController.getAll)
router.get("/:id", movieController.getSingle)
router.post("/", movieController.addMovie)
router.put("/:id", movieController.updateMovie)
router.delete("/:id", movieController.deleteMovie)

module.exports = router