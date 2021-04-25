import React, { useState, useEffect } from "react";
import { PageHeader, Typography, Button } from "antd";
import { Line } from "@ant-design/charts";
import { SyncOutlined } from "@ant-design/icons";
import api from "./api";

const { Title } = Typography;

export default function SensorOperation(props) {
  const { deviceId } = props;
  const [sensorData, setSensorData] = useState([]);

  const loadData = async (deviceId) => {
    const result = await api.get(`/api/sensor/info/${deviceId}`);
    setSensorData(result.data);
  };

  useEffect(() => {
    loadData(deviceId);
  }, [deviceId]);

  // const data = [
  //   {
  //     time: "11:47",
  //     temperature: 24,
  //   },
  //   {
  //     time: "11:48",
  //     temperature: 27,
  //   },
  //   {
  //     time: "11:49",
  //     temperature: 20,
  //   },
  //   {
  //     time: "11:50",
  //     temperature: 29,
  //   },
  //   {
  //     time: "11:56",
  //     temperature: 24,
  //   },
  //   {
  //     time: "11:58",
  //     temperature: 22,
  //   },
  //   {
  //     time: "12:06",
  //     temperature: 26,
  //   },
  //   {
  //     time: "12:16",
  //     temperature: 29,
  //   },
  //   {
  //     time: "12:19",
  //     temperature: 12,
  //   },
  // ];

  const config = {
    data: sensorData,
    padding: "auto",
    xField: "time",
    yField: "temperature",
  };

  return (
    <>
      <PageHeader title="传感器设备信息" onBack={() => window.history.back()} />
      <Button
        icon={<SyncOutlined />}
        onClick={() => {
          loadData(deviceId);
        }}
      />
      <div style={{ display: "flex", marginTop: 30 }}>
        {/* <Image src='./logo.svg' width={50}/> */}
        <div className="data" style={{ width: "25%" }}>
          {/* <p>当前温度为</p> */}
          <Title level={5} style={{ marginBottom: 15 }}>
            当前温度
          </Title>
          <p>
             {sensorData[sensorData.length - 1]?.temperature}
          </p>
        </div>
        <div className="graph" style={{ width: "70%" }}>
          <Title level={5} style={{ textAlign: "center", marginBottom: 15 }}>
            历史温度
          </Title>
          <Line {...config} />
        </div>
      </div>
    </>
  );
}
