const db = require('../api/db-config.js');

module.exports = {
    findSuperAdmin,
    findById,
}

function findSuperAdmin() {
    return db('users').where('is_admin', true).first();
}

function findById(id) {
    return db('users').where('id', id).first();
}