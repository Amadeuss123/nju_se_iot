const express = require('express');
const router = express.Router();

router.post('/change', (req, res) => {
  console.log(req.body);
  res.send('ć´ćšćĺ');
})

module.exports = router;