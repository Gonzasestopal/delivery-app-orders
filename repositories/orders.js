const db = require('../api/db-config.js');

module.exports = {
    find,
    findById,
    add,
    edit,
    remove,
    findAllByUserId,
    updateReadyOrders,
    findReadyOrders,
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


function findAllByUserId(userId) {
    return db('orders').where('user_id', userId);
}

function updateReadyOrders(ids) {
    console.log(ids)
    return db('orders').update('status', 'entregado').whereIn('id', ids);
}

function findReadyOrders()  {
    return db('orders').where('status', 'preparando')
}