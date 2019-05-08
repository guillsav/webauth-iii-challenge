const db = require('../database/dbConfig');

module.exports = {
  getUsers,
  getUser,
  addUser
};

function getUsers() {
  return db('users');
}

function getUser(id) {
  return db('users')
    .where({id}, 'id')
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(([id]) => {
      return getUser(id);
    });
}
