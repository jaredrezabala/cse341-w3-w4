const res = require('express/lib/response')
const mongodb = require('../modules/mongodb')
const mongoConnect = require('mongodb')
const ObjectId = mongoConnect.ObjectId
const { Collection } = require('mongodb')

const getAll = async(req, res) =>{
    //#swagger.tags=['Movies']
    try{
    const result = await mongodb.getDatabase().db('personal-project').collection('test').find()
        movies = await result.toArray()
        // cause error 500
        let errorTrigger = null;
        console.log(errorTrigger.someProperty)
        
        if(movies.length === 0) {
            res.status(400).json({
                message: "No movies found"
            })
        }else{
            res.setHeader('Content-type', 'application/json')
            res.status(200).json(movies)
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to load movies list",
            error: err.message
        })
    }
    
}
const getSingle = async(req, res) => {
    //#swagger.tags=['Movies']
    try{
    const movieId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('personal-project').collection('movies').find({_id: movieId})
    const movies = await result.toArray()

    if(movies.length === 0) {
            res.status(400).json({
                message: "No movie found in database"
                })
        }else{
            res.setHeader('Content-type', 'application/json')
            res.status(200).json(movies[0])
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to load movie",
            error: err.message
        })
    }
}
const addMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    const { title, genre, director, releaseYear, duration, rating, synopsis} = req.body
    
    const newMovie = {
        title, 
        genre,
        director, 
        releaseYear, 
        duration, 
        rating, 
        synopsis
    }
    try{
        const result = await mongodb.getDatabase().db('personal-project').collection('movies').insertOne(newMovie)
        res.status(201).json({
            message: 'Movie created successfully',
            movieId: result.insertedId
        })
    }catch(err){
        res.status(500).json({
            message: "Failed to add new movie",
            error: err.message
        })
    }
    
}
const updateMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    try{
    const movieId = new ObjectId(req.params.id)
    const { title, genre, director, releaseYear, duration, rating, synopsis} = req.body
        const updateMovie = {
            $set: { title, genre, director, releaseYear, duration, rating, synopsis }
        }
        const result = await mongodb.getDatabase().db('personal-project').collection('movies').updateOne({_id: movieId}, updateMovie)
        if (result.matchedCount === 0){
             res.status(404).json({
                message: "Movie not found"
            })
        }else{
            res.status(200).json({
                message: "Movie updated successfully",
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to update movie",
            error: err.message
        })
    }
}
const deleteMovie = async(req, res) => {
    //#swagger.tags=['Movies']
    try{
    const movieId = new ObjectId(req.params.id)

        const result = await mongodb.getDatabase().db('personal-project').collection('movies').deleteOne({_id: movieId})
        if (result.deletedCount === 0){
            res.status(404).json({
                message: "Movie not found"
            })
        }else{
            res.status(200).json({
                message: "Movie deleted succesfully",
                deletedCount: result.deletedCount
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to delete movie",
            error: err.message
        })
    }
}
module.exports = {
    getAll,
    getSingle,
    addMovie,
    updateMovie,
    deleteMovie
}