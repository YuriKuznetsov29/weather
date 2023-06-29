const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult} = require('express-validator')
const TokenService = require('../services/token.service')
const User = require('../models/User')
const router = express.Router({mergeParams: true})

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({min: 8}),
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: 'INVALID_DATA',
                    code: 400,
                    // errors: errors.array()
                }
            })
        }

        const {email, password} = req.body

        const exitingUser = await User.findOne({ email })

        if (exitingUser) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        })

        const tokens = TokenService.generate({ _id: newUser._id})
        await TokenService.save(newUser._id, tokens.refreshToken)

        res.status(201).send({...tokens, userId: newUser._id})

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
}])

// 1. validate
// 2. find user
// 3. compared hashed password
// 4. generate token
// 5. return data
router.post('/signInWithPassword', [
    check('email', 'Email не корректный').normalizeEmail().isEmail(),
    check('password', 'Пароль не может быть пустым').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_DATA',
                        code: 400,
                        // errors: errors.array()
                    }
                })
            }

            const {email, password} = req.body

            const exitingUser = await User.findOne({ email })

            if (!exitingUser) {
                return res.status(400).send({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                })
            }

            const isPasswordEqual = await bcrypt.compare(password, exitingUser.password)
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                })
            }

            const tokens = TokenService.generate({_id: exitingUser._id})
            await TokenService.save(exitingUser._id, tokens.refreshToken)
            res.status(200).send({...tokens, userId: exitingUser._id})
        }
        catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }

}])

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body
        const data = await TokenService.validateRefresh(refreshToken)
        const dbToken = await TokenService.findToken(refreshToken)

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const tokens = TokenService.generate({
            _id: data._id
        })
        await TokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({...tokens, userId: data._id})
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router

// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDlkNzcyOTlmMzU3ZmVlM2I5MzA3ZGYiLCJpYXQiOjE2ODgwNDU3MDYsImV4cCI6MTY4ODA0OTMwNn0.fFfOn_g6qMS-MYgIMdG7v4h9KDPsffF5UF-0NvYKDx0",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDlkNzcyOTlmMzU3ZmVlM2I5MzA3ZGYiLCJpYXQiOjE2ODgwNDU3MDZ9.liEzocnWk6ZTgzQM28gAXY0vx5cfgDdOXhzdB34ylx8",
//     "expiresIn": 3600,
//     "userId": "649d77299f357fee3b9307df"
// }