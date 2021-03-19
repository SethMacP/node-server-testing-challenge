
exports.seed = async function(knex) {
    //delete everything in the table
    await knex('staff').truncate()
    //insert new fields
    await knex('staff').insert([
        { name:"Leela" , jobTitle: "Pilot"},
        { name:"Bender" , jobTitle: "Drunk"},
        { name:"Fry" , jobTitle: "Delivery Boy"},
        { name:"Zoidberg" , jobTitle: "Doctor"}
    ])
};
