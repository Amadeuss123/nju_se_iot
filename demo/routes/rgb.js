const express = require('express');
const router = express.Router();

router.post('/change', (req, res) => {
  console.log(req.body);
  res.send('更改成功');
})

module.exports = router;