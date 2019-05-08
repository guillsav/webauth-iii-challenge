const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../users/users-model');
const validation = require('../middleware/validation');

router.post('/register', validation, async (req, res) => {
  try {
    let user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    const newUser = await db.addUser(user);

    res
      .status(201)
      .json({message: `${user.username} was successfully registered!`});
  } catch (e) {
    res
      .status(500)
      .json({errorMessage: 'Server error while registering the user'});
  }
});

module.exports = router;
