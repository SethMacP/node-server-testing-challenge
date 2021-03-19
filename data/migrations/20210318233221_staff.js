
exports.up = async function(knex) {
    await knex.schema.createTable('staff',(table)=>{
        table.increments()
        table.text('name').notNullable()
        table.text('jobTitle').notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('staff')
};
