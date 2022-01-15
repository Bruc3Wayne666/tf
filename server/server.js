require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routers/router')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api', router)


mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) throw err
        console.log('Connected to MongoDB')
    })

app.listen(process.env.PORT, () => {
    console.log(`Server has started on port ${process.env.PORT}`)
})