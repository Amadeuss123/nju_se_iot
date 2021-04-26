import React, { useState, useEffect, useCallback } from "react";
import { PageHeader, Typography, Button } from "antd";
import { Line } from "@ant-design/charts";
import { SyncOutlined } from "@ant-design/icons";
import api from "./api";

const { Title, Text } = Typography;

export default function SensorOperation(props) {
  const { deviceId } = props;
  const [sensorData, setSensorData] = useState([]);


  const convertData = useCallback(
    (sensorData) => {
      return sensorData.map((data) => {
        return {
          ...data,
          temperature: Number(data.temperature),
        };
      });
    },
    []
  );
  const loadData = useCallback(async (deviceId) => {
    const result = await api.get(`/api/sensor/info/${deviceId}`);
    console.log(result.data);
    setSensorData(convertData(result.data.data));
  },[convertData]);

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      loadData();
    }, 2000);
    return () => {
      clearInterval(timer);
    }
  }, [loadData])


  useEffect(() => {
    loadData(deviceId);
  }, [deviceId, loadData]);


  const config = {
    data: sensorData,
    padding: "auto",
    xField: "time",
    yField: "temperature",
  };

  return (
    <>
      <PageHeader title="传感器设备信息" subTitle={`设备编号${deviceId}`} onBack={() => window.history.back()} />
      {/* <Button
        icon={<SyncOutlined />}
        onClick={() => {
          loadData(deviceId);
        }}
        style={{marginLeft: 30}}
      /> */}
      <div style={{ display: "flex", marginTop: 30 }}>
        <div className="data" style={{ width: "30%", fontSize: 20, marginLeft: 30 }}>
          <Title level={4} style={{ marginBottom: 15 }}>
            当前温度
          </Title>
          <Text keyboard>{`${sensorData[sensorData.length - 1]?.temperature}℃`}</Text>
        </div>
        <div className="graph" style={{ width: "60%" }}>
          <Title level={4} style={{ textAlign: "center", marginBottom: 15 }}>
            历史温度
          </Title>
          <Line {...config} />
        </div>
      </div>
    </>
  );
}
