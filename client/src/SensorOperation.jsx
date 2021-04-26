import React, { useState, useEffect, useCallback } from "react";
import { PageHeader, Typography, Button } from "antd";
import { Line } from "@ant-design/charts";
import { SyncOutlined } from "@ant-design/icons";
import api from "./api";

const { Title, Text } = Typography;

export default function SensorOperation(props) {
  const { deviceId } = props;
  const [sensorData, setSensorData] = useState({temperatureData:[], humidData:[]});
  console.log('sensorData ', sensorData);

  const convertData = useCallback(({ tempList, humidityList }) => {
    const res =  {
      temperatureData: tempList.map((data) => (
        {
          time: data.time.split(' ')[1],
          value: Number(data.value),
          type: 'temperature'
        }
      )).sort((a, b) => {
        return a.time.localeCompare(b.time);
      }),
      humidData: humidityList.map((data) => (
        {
          time: data.time.split(' ')[1],
          value: Number(data.value),
          type: 'humidity',
        }
      )).sort((a, b) => {
        return a.time.localeCompare(b.time);
      })
    };
    console.log('res ', res);
    return res;
  }, []);

  const loadData = useCallback(async () => {
    const result = await api.get(`/api/sensor/info/${deviceId}`);
    console.log(result);
    // const data = convertData(result.data);
    // console.log('data', data);
    setSensorData(convertData(result.data));
  }, [convertData, deviceId]);

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      loadData();
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const config = {
    data: [...sensorData.temperatureData, ...sensorData.humidData],
    padding: "auto",
    xField: "time",
    yField: "value",
    seriesField: "type",
    // slider: {
    //   start: 0.1,
    //   end: 0.5,
    // },
    // smooth: true,
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };

  return (
    <>
      <PageHeader
        title="传感器设备信息"
        subTitle={`设备编号${deviceId}`}
        onBack={() => window.history.back()}
      />
      {/* <Button
        icon={<SyncOutlined />}
        onClick={() => {
          loadData(deviceId);
        }}
        style={{marginLeft: 30}}
      /> */}
      <div style={{ display: "flex", marginTop: 30 }}>
        <div
          className="data"
          style={{ width: "30%", fontSize: 20, marginLeft: 30 }}
        >
          <Title level={4} style={{ marginBottom: 15 }}>
            当前温度
          </Title>
          <Text keyboard>{`${
            sensorData.temperatureData[sensorData.temperatureData.length - 1]?.value
          }℃`}</Text>
          <Title level={4} style={{ marginBottom: 15 }}>
            当前湿度
          </Title>
          <Text keyboard>{`${
            sensorData.humidData[sensorData.humidData.length - 1]?.value
          }℃`}</Text>
        </div>
        <div className="graph" style={{ width: "60%" }}>
          <Title level={4} style={{ textAlign: "center", marginBottom: 15 }}>
            历史温、湿度
          </Title>
          <Line {...config} />
        </div>
      </div>
    </>
  );
}
