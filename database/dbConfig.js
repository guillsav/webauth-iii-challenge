const knex = require('kenx');
const knexConfig = require('../knexfile');

const db = knex(knexConfig);

module.exports = db;
