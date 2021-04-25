const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('111');
});

router.get('/list', (req, res) => {
  const data = [
    {
      key: 1,
      deviceType: "RGB",
      deviceId: "000001",
      deviceStatus: "已连接",
    },
    {
      key: 2,
      deviceType: "RGB",
      deviceId: "000002",
      deviceStatus: "未连接",
    },
    {
      key: 3,
      deviceType: "sensor",
      deviceId: "000003",
      deviceStatus: "已连接",
    },
  ]
  res.send(data);
});

router.post('/add', (req, res) => {
  console.log(req.body);
  res.end(JSON.stringify({
    message: '添加成功',
  }));
})

module.exports = router;