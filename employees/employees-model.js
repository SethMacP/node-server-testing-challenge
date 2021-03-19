const db = require('../data/config')

const findAll = async ( ) =>{
    const employees = await db('staff')
        .select(
            "*"
        )
    return employees
}

const findByID = async (id) =>{
    const employee = await db('staff')
        .select("*")
        .where("staff.id", id)
        .first()
    return employee
    }

const onboardEmployee = async ( data ) =>{
    
    const [id] = await db('staff').insert(data)
    return findByID(id)
    
}

const fireEmployee = ( id ) =>{
    return db('staff')
        .where({ id })
        .del()
}

    

module.exports = {
    findAll,
    findByID,
    onboardEmployee,
    fireEmployee
}