const axios = require('axios');

const Jokes = require('./jokes-model');
const router = require('express').Router();

router.get("/users", (req, res) => {
  Jokes.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


router.get('/', (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
