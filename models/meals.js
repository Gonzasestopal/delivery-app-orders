const db = require('../api/db-config.js');

module.exports = {
    find,
    findById,
    findAll,
    add,
    edit,
    remove
}

function find() {
    return db('meals')
}

function findById(id) {
    return db('meals').where('id', id).first()
}

function add(item) {
    return db('meals').insert(item).returning('id');
}

function edit(id, item) {
    return db('meals').update(item).where('id', id).returning('id');
}

function remove(id) {
    return db('meals').del().where('id', id)
}

function findAll(mealIds) {
    return db('meals').whereIn('id', mealIds);
}
