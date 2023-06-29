const express = require('express')
const SavedLocations = require('../models/SavedLocations')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams: true})


router.patch('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params
        console.log(req.user)
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
            res.send(updatedUser)
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const data = await User.find()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router