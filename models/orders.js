const db = require('../api/db-config.js');

module.exports = {
    find,
    findById,
    add,
    edit,
    remove
}

function find() {
    return db('orders')
}

function findById(id) {
    return db('orders').where('id', id).first()
}

function add(item) {
    return db('orders').insert(item).returning('id');
}

function edit(id, item) {
    return db('orders').update(item).where('id', id).returning('id');
}

function remove(id) {
    return db('orders').del().where('id', id)
}
