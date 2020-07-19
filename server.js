const log = console.log

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333

const mongoose = require('mongoose')
const db = require('./config/keys').MongoURI
mongoose.connect(db, {useNewUrlParser: true})
.then(()=>log('mongo connection'))
.catch(err => log(err))

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.set('view engine', 'ejs')


app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, log(`Server on port ${PORT}`))