const express = require('express');
const router = express.Router();

router.get('/info/:deviceId', (req, res) => {
  console.log(req.params.deviceId);
  const data = [
    {
      time: "11:47",
      temperature: 24,
    },
    {
      time: "11:48",
      temperature: 27,
    },
    {
      time: "11:49",
      temperature: 20,
    },
    {
      time: "11:50",
      temperature: 29,
    },
    {
      time: "11:56",
      temperature: 24,
    },
    {
      time: "11:58",
      temperature: 22,
    },
    {
      time: "12:06",
      temperature: 26,
    },
    {
      time: "12:16",
      temperature: 29,
    },
    {
      time: "12:19",
      temperature: 12,
    },
  ];
  res.send(data);
})

module.exports = router;