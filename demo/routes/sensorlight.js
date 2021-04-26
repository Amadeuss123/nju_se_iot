const express = require('express');

const router = express.Router();

router.get('/info/:deviceId', (req, res) => {
  const data = {
    beam: Number((10 + 10 * Math.random()).toFixed(2)),
    sound: Number((10 + 10 * Math.random()).toFixed(2)),
    status: parseInt((0.5 + Math.random())),
  }

  res.send(JSON.stringify(data));
})

module.exports = router;