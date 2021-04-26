const express = require("express");
const router = express.Router();
const { nanoid } = require('nanoid');

let data = [
  {
    key: 1,
    deviceType: "rgb",
    deviceId: "000001",
    deviceStatus: "已连接",
  },
  {
    key: 2,
    deviceType: "rgb",
    deviceId: "000002",
    deviceStatus: "未连接",
  },
  {
    key: 3,
    deviceType: "sensor",
    deviceId: "000003",
    deviceStatus: "已连接",
  },
  {
    key: 4,
    deviceType: "sensor",
    deviceId: "000004",
    deviceStatus: "已连接",
  },
  {
    key: 5,
    deviceType: "sensor",
    deviceId: "000005",
    deviceStatus: "已连接",
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
    deviceId,
    deviceType,
    expireDate,
    deviceStatus: '未连接',
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
