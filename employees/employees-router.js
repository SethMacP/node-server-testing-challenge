const express = require('express')
const model = require('./employees-model');

const router = express.Router();

//get all employees
router.get('/', async ( req, res, next ) => {
    try{
        const employeeList = await model.findAll()
        res.status(200).json(employeeList)
    }catch(err){
        next(err)
    }
})

//get employee by id
router.get('/:id', async ( req, res, next) => {
    try{
        const employee = await model.findByID(req.params.id)
            if(!employee){
                res.status(404).json({message:"No one works here with that ID"})
            }
        res.status(200).json(employee)
    }catch(err){
        next(err)
    }
})

//hire new employee
router.post('/', async ( req, res, next) => {
    try{
        if(!req.body){
           return res.status(418).json({message:"You have no body"})
        }
        const newEmployee = await model.onboardEmployee(req.body)
        res.status(201).json(newEmployee)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async ( req, res, next) => {
    try{
        const fireEmployee = await model.fireEmployee(req.params.id)
        res.status(204).json(fireEmployee)
    }catch(err){
        next(err)
    }
})


module.exports = router;