const express = require('express')
const employeeRouter = require('./employees/employees-router')

const server = express()

server.use(express.json())
server.use('/employees',employeeRouter)
server.get('/', (req,res,next)=>{

    res.json({message: "Sup"})
})
server.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({
        message: "Something went wrong. :O"
    })
})
module.exports = server;