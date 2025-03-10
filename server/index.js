const express = require('express')
const { dbConnection } = require('./config/dbConnection')
const userRoutes = require('./routes/userRoutes')

require('dotenv').config();

const app = express()

dbConnection()

app.use(express.json())


app.use("/users", userRoutes)

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log(`server starts at port ${process.env.PORT}`)
    }
})