const supertest = require('supertest')
const server = require('../server')
const db = require('../data/config')




//suite wide modifications
// beforeEach(async()=>{
//     await db.seed.run()
// })
// beforeAll(async()=>{
//     await db.migrate.rollback()
//     await db.migrate.latest()
// })
afterAll(async()=>{
    await db.destroy()
})

//test away

describe('Planet Express Employee Integration Tests',()=>{
    test(`(Quote):"I don't want to live on this planet anymore"(sanity check)`,()=>{
        expect(2+2).toEqual(4)
        expect(2+2).not.toEqual(5)
    })
    test('Call a staff meeting (Grab all employees)', async()=>{
        const res = await supertest(server).get('/employees')
        
        
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        
        expect(res.body[0].name).toBe('Leela')
        expect(res.body[0].jobTitle).toBe('Pilot')
    })
    test('1:1 meeting with employee (Grab by ID)', async()=>{
        const res = await supertest(server).get('/employees/2')

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.name).toBe('Bender')
        expect(res.body.jobTitle).toBe('Drunk')
    })
    test('Hire a new employee', async() => {
        const res = await supertest(server)
            .post('/employees')
            .send({
                name:"Nibbler",
                jobTitle:"Lord"
            })

        expect(res.statusCode).toBe(201)
        expect(res.type).toBe('application/json')
        
        expect(res.body.id).toBe(5)
        expect(res.body.name).toBe("Nibbler")
        expect(res.body.jobTitle).toBe("Lord")

    })
    test('Fire the Hire', async()=>{
        //delete from database
        const res = await supertest(server)
            .delete('/employees/5')
        expect(res.statusCode).toBe(204)
        //ensure database change happened
        const deletionCheck = await supertest(server)
            .get('/employees/5')
        expect(deletionCheck.statusCode).toBe(404)
    })
    
})