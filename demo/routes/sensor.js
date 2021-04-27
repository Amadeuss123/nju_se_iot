const express = require("express");
const router = express.Router(); 
const moment = require('moment');

let tempList = [
  {
    time: "2021-04-27 09:47:01",
    value: 24,
    type: 'temperature',
  },
  {
    time: "2021-04-27 09:48:02",
    value: 27,
    type: 'temperature',
  },
  {
    time: "2021-04-27 09:49:03",
    value: 20,
    type: 'temperature',
  },
  {
    time: "2021-04-27 09:50:11",
    value: 29,
    type: 'temperature',
  },
  {
    time: "2021-04-27 09:56:12",
    value: 24,
    type: 'temperature',
  },
  {
    time: "2021-04-27 09:58:14",
    value: 22,
    type: 'temperature',
  },
  {
    time: "2021-04-27 10:06:43",
    value: 26,
    type: 'temperature',
  },
  {
    time: "2021-04-27 10:16:14",
    value: 29,
    type: 'temperature',
  },
  {
    time: "2021-04-27 10:19:14",
    value: 12,
    type: 'temperature',
  },
];

let humidityList = [
  {
    time: "2021-04-27 09:47:01",
    value: 21,
    type: 'humid',
  },
  {
    time: "2021-04-27 09:48:02",
    value: 44,
    type: 'humid',
  },
  {
    time: "2021-04-27 09:49:03",
    value: 23,
    type: 'humid',
  },
  {
    time: "2021-04-27 09:50:11",
    value: 19,
    type: 'humid',
  },
  {
    time: "2021-04-27 09:56:12",
    value: 29,
    type: 'humid',
  },
  {
    time: "2021-04-27 09:58:14",
    value: 31,
    type: 'humid',
  },
  {
    time: "2021-04-27 10:06:43",
    value: 12,
    type: 'humid',
  },
  {
    time: "2021-04-27 10:16:14",
    value: 39,
    type: 'humid',
  },
  {
    time: "2021-04-27 10:19:14",
    value: 12,
    type: 'humid',
  },
];

router.get("/info/:deviceId", (req, res) => {
  const newRecord1 = {
    time: moment(new Date()).format('yy-MM-DD HH:mm:ss'),
    value: Number((10 + 20 * Math.random()).toFixed(2)),
    type: 'temperature',
  }
  const newRecord2 = {
    time: moment(new Date()).format('yy-MM-DD HH:mm:ss'),
    value: Number((10 + 20 * Math.random()).toFixed(2)),
    type: 'humid',
  }
  // console.log(newRecord)
  tempList.push(newRecord1);
  humidityList.push(newRecord2);
  res.send(
    JSON.stringify({
      data: {
        tempList,
        humidityList,
      }
    })
  );
});

module.exports = router;
