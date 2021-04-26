const express = require("express");
const router = express.Router(); 
const moment = require('moment');

let temperatureData = [
  {
    time: "11:47",
    value: 24,
    type: 'temperature',
  },
  {
    time: "11:48",
    value: 27,
    type: 'temperature',
  },
  {
    time: "11:49",
    value: 20,
    type: 'temperature',
  },
  {
    time: "11:50",
    value: 29,
    type: 'temperature',
  },
  {
    time: "11:56",
    value: 24,
    type: 'temperature',
  },
  {
    time: "11:58",
    value: 22,
    type: 'temperature',
  },
  {
    time: "12:06",
    value: 26,
    type: 'temperature',
  },
  {
    time: "12:16",
    value: 29,
    type: 'temperature',
  },
  {
    time: "12:19",
    value: 12,
    type: 'temperature',
  },
];

let humidData = [
  {
    time: "11:47",
    value: 21,
    type: 'humid',
  },
  {
    time: "11:48",
    value: 44,
    type: 'humid',
  },
  {
    time: "11:49",
    value: 23,
    type: 'humid',
  },
  {
    time: "11:50",
    value: 19,
    type: 'humid',
  },
  {
    time: "11:56",
    value: 29,
    type: 'humid',
  },
  {
    time: "11:58",
    value: 31,
    type: 'humid',
  },
  {
    time: "12:06",
    value: 12,
    type: 'humid',
  },
  {
    time: "12:16",
    value: 39,
    type: 'humid',
  },
  {
    time: "12:19",
    value: 12,
    type: 'humid',
  },
];

router.get("/info/:deviceId", (req, res) => {
  const newRecord1 = {
    time: moment(new Date()).format('HH:mm:ss'),
    value: Number((10 + 20 * Math.random()).toFixed(2)),
    type: 'temperature',
  }
  const newRecord2 = {
    time: moment(new Date()).format('HH:mm:ss'),
    value: Number((10 + 20 * Math.random()).toFixed(2)),
    type: 'humid',
  }
  // console.log(newRecord)
  temperatureData.push(newRecord1);
  humidData.push(newRecord2);
  res.send(
    JSON.stringify({
      temperatureData,
      humidData,
    })
  );
});

module.exports = router;
