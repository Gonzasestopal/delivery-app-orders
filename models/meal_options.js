const db = require('../api/db-config.js');

module.exports = {
    find,
    findById,
    findAllByMealId,
    add,
    edit,
    remove
}

function find() {
    return db('meal_options')
}

function findById(id) {
    return db('meal_options').where('id', id).first()
}

function add(item) {
    return db('meal_options').insert(item).returning('id');
}

function edit(id, item) {
    return db('meal_options').update(item).where('id', id).returning('id');
}

function remove(id) {
    return db('meal_options').del().where('id', id)
}

function findAllByMealId(mealId) {
    return db('meal_options').whereIn('meal_id', mealId);
}
