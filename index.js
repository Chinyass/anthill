require('dotenv').config()
const express = require('express')
const db = require('./db')
const router = require('./routes')

const app = express()
const DB_HOST = process.env.DB_HOST
db.connect(DB_HOST)

app.use(express.json())
app.use('/api',router)

app.listen(4000,() =>{
    console.log('started')
})