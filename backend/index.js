const express = require('express');
const app = express()
const cors = require("cors")

require('dotenv').config()

// const mongoose = require('mongoose')
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
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/users/user.route')
const adminRoutes = require('./src/stats/admin.stats')
const cartRoutes = require('./src/carts/cart.route');
const connectMongoDB = require('./src/db/connect');

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/carts", cartRoutes)

async function main() {
    await connectMongoDB(process.env.DB_URL)
}

main().then(()=>{
    console.log("Mongodb connected successfully!")
}).catch(err => console.log(err))

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () =>{
    console.log("Server has been stopped!");
    server.close(() => {
        console.log('Server closed gracefully');
        process.exit(0); // Đảm bảo ứng dụng thoát sau khi đóng server
    });
})