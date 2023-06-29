const TokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.autorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        const data = TokenService.validateAccess(token)

        res.user = data
        console.log(data)
        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}