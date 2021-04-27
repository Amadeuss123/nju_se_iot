const express = require("express");
const router = express.Router();
const { nanoid } = require('nanoid');

let data = [
  {
    device: {
      deviceType: "rgb",
      deviceId: "000001",
    },
    key: 1,
    status: 1,
  },
  {
    device: {
      deviceType: "rgb",
      deviceId: "000002",
    },
    key: 2,
    status: 0,
  },
  {
    device: {

      deviceType: "sensor",
      deviceId: "000003",
    },
    key: 3,
    status: 1,
  },
  {
    device: {

      deviceType: "sensor",
      deviceId: "000004",
    },
    key: 4,
    status: 1,
  },
  {
    device: {
      deviceType: "sensor",
      deviceId: "000005",

    },
    key: 5,
    status: 1,
  },
];

router.get("/", (req, res) => {
  res.send("111");
});

router.get("/list", (req, res) => {
  res.send(JSON.stringify({ data }));
});

router.post("/add", (req, res) => {
  const { deviceId, deviceType, expireDate } = req.body;
  const newDevice = {
    device: {
      deviceId,
      deviceType,
    },
    expireDate,
    status: 1,
    token: nanoid(),
  }
  data.push(newDevice);

  res.end(
    JSON.stringify({
      message: "添加成功",
      data: newDevice.token,
    })
  );
});

router.delete("/delete/:deviceId", (req, res) => {
  // console.log(req.params.deviceId);
  const deviceId = req.params.deviceId;
  console.log(data.findIndex((device) => device.deviceId === deviceId));
  data.splice(data.findIndex((device) => device.deviceId === deviceId), 1);
  console.log(data);
  res.send(
    JSON.stringify({
      message: "删除成功",
      deviceId: req.params.deviceId,
    })
  );
});

module.exports = router;
