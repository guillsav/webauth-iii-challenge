const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../users/users-model');
const validation = require('../middleware/validation');
const secret = require('../config/secrets');

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

router.post('/login', validation, async (req, res) => {
  try {
    const {username, password} = req.body;
    const foundUser = await db.getUserBy(username);
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
      const token = generateToken(foundUser);
      res.status(200).json({message: `Welcome ${foundUser.username}!`, token});
    } else {
      res.status(404).json({message: 'Invalid credentials!'});
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: `Server error couldn't login!`});
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
