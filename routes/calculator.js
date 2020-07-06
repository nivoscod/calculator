const express = require('express')
const router = express.Router()
const {DisplayNextState} = require("../calclogic")

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/calculate', (req, res) => {
    //let jsonState = !req.body['jsonState'] ? null : req.body['jsonState'])
    res.send(DisplayNextState(req.body['jsonState'], req.body['input']))
})

module.exports = router