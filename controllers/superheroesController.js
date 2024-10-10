const res = require('express/lib/response')
const mongodb = require('../modules/mongodb')
const mongoConnect = require('mongodb')
const ObjectId = mongoConnect.ObjectId
const { Collection } = require('mongodb')

const getAll  = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db('personal-project').collection('superheroes').find()
            superheroes = await result.toArray()
            
            if(superheroes.length === 0) {
                res.status(400).json({
                    message: "No superheroes found"
                })
            }else{
                res.setHeader('Content-type', 'application/json')
                res.status(200).json(superheroes)
            }
        }catch(err){
            res.status(500).json({
                message: "Failed to load superheroes list",
                error: err.message
            })
        }
}
const getSingle = async(req, res) => {
    try{
    const heroeId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('personal-project').collection('superheroes').find({_id: heroeId})
    const superheroes = await result.toArray()

    if(superheroes.length === 0) {
            res.status(400).json({
                message: "No superheroe found in database"
                })
        }else{
            res.setHeader('Content-type', 'application/json')
            res.status(200).json(superheroes[0])
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to load superheroe",
            error: err.message
        })
    }
}
const addHeroe = async(req, res) => {
    const { name, realName, powers, universe, allies, villains, introductionYear} = req.body
    
    const newHeroe = {
        name, 
        realName,
        powers, 
        universe, 
        allies, 
        villains, 
        introductionYear
    }
    try{
        const result = await mongodb.getDatabase().db('personal-project').collection('superheroes').insertOne(newHeroe)
        res.status(201).json({
            message: 'Heroe created successfully',
            heroeId: result.insertedId
        })
    }catch(err){
        res.status(500).json({
            message: "Failed to add new Heroe",
            error: err.message
        })
    }
    
}
const updateHeroe = async(req, res) => {
    try{
    const heroeId = new ObjectId(req.params.id)
    const { name, realName, powers, universe, allies, villains, introductionYear} = req.body
        const updateHeroe = {
            $set: { title, genre, director, releaseYear, duration, rating, synopsis }
        }
        const result = await mongodb.getDatabase().db('personal-project').collection('superheroes').updateOne({_id: heroeId}, updateHeroe)
        if (result.matchedCount === 0){
             res.status(404).json({
                message: "Heroe not found"
            })
        }else{
            res.status(200).json({
                message: "Heroe updated successfully",
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to update Heroe",
            error: err.message
        })
    }
}
const deleteHeroe = async(req, res) => {
    try{
    const heroeId = new ObjectId(req.params.id)

        const result = await mongodb.getDatabase().db('personal-project').collection('heroes').deleteOne({_id: heroeId})
        if (result.deletedCount === 0){
            res.status(404).json({
                message: "Heroe not found"
            })
        }else{
            res.status(200).json({
                message: "Heroe deleted succesfully",
                deletedCount: result.deletedCount
            })
        }
    }catch(err){
        res.status(500).json({
            message: "Failed to delete Heroe",
            error: err.message
        })
    }
}
module.exports = {
    getAll,
    getSingle,
    addHeroe,
    updateHeroe,
    deleteHeroe
}