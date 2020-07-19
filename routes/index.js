const express = require('express')
const router = express.Router()

router.get ('/', (req, res)=>{res.send("GOGOGO")})

module.exports = router