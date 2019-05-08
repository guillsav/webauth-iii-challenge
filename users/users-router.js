const router = require('express').Router();
const db = require('./users-model');
const restricted = require('../middleware/restricted');
const checAccess = require('../middleware/checkAccess');

router.get('/', restricted, checAccess('Finance'), async (req, res) => {
  try {
    const users = await db.getUsers();

    res.status(200).json(
      users.map(({id, username, department}) => {
        const usersList = {id, username, department};
        return usersList;
      })
    );
  } catch (e) {
    res.status(500).json({
      errorMessage: `Server error couldn't retrieve the users from the database.`
    });
  }
});

module.exports = router;
