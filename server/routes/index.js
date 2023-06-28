const  express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/savedLocations', require('./savedLocations.routes'))

module.exports = router