const express = require('express');
const app = express()
const cors = require("cors")

require('dotenv').config()

const mongoose = require('mongoose')
const port = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    }
))

// routes
const bookRoutes = require('./src/books/book.route')
app.use("/api/books", bookRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL)
    app.use('/', (req, res)=>{
        res.send('Book Store Server is running')
    })
}

main().then(()=>{
    console.log("Mongodb connected successfully!")
}).catch(err => console.log(err))

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})