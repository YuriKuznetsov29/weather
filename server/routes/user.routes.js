const express = require('express')
const SavedLocations = require('../models/SavedLocations')
const router = express.Router({mergeParams: true})


router.post('/:userId', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await SavedLocations.find()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router