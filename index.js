const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

const calculator = require('./routes/calculator')
app.use('/', calculator)
//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))