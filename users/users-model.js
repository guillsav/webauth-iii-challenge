const db = require('../database/dbConfig');

module.exports = {
  getUsers,
  getUserBy,
  getUser,
  addUser
};

function getUsers() {
  return db('users').select('id', 'username', 'password', 'department');
}

function getUserBy(username) {
  return db('users')
    .where({username}, 'username')
    .first();
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
