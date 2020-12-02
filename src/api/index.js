const express = require('express');

const emojis = require('./emojis');
const poll = require('./polls');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/poll', poll);

module.exports = router;
