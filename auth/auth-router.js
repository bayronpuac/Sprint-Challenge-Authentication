const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');


const Jokes = require('../jokes/jokes-model');
const { validateUser } = require("../jokes/jokes-helpers.js");


router.post('/register', (req, res) => {
 let user = req.body;
  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    Jokes.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
    } else {
      res.status(400).json({
        message: "Invalid information about the user, see errors for details",
        errors: validateResult.errors
    }); 
  }
});

router.post('/login', (req, res) => {
 let {username, password } = req.body;

 Jokes.findBy({ username })
 .first()
 .then(user => {
  if (user && bcrypt.compareSync(password, user.password)) {
    // 2: produce a token
    const token = getJwtToken(user);

    // 3: send the token to the client
     res.status(200).json({
      message: `Welcome ${user.username}! have a token...`,
      token
      });
    } else {
    res.status(401).json({ message: "Invalid Credentials" });
    }
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

function getJwtToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}


module.exports = router;
