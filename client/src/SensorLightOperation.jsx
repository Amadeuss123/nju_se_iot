import React, { useEffect, useCallback, useState } from "react";
import { PageHeader, Typography, Card } from "antd";
import Bulb from "./assets/Bulb";
import api from "./api";

const { Text } = Typography;

export default function SensorLightOperation(props) {
  const [info, setInfo] = useState({});

  const { deviceId } = props;
  const getSensorLightInfo = useCallback(async () => {
    const result = await api.get(`/api/sensorlight/info/${deviceId}`);
    console.log(result.data);
    setInfo(result.data);
  }, [deviceId]);

  useEffect(() => {
    getSensorLightInfo();
    const timer = setInterval(getSensorLightInfo, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [getSensorLightInfo]);

  return (
    <>
      <PageHeader title="感应灯信息" subTitle={`设备编号${deviceId}`} onBack={() => window.history.back()} />
      <div style={{ display: "flex", alignItems: 'center', marginTop: 30 }}>
        <div style={{ width: "30%", textAlign: "center" }}>
          <Bulb fill={info.status === 0 ? "#f1f1f1" : "#d98c44"} />
        </div>
        <div style={{ width: "60%" }}>
          <Card style={{fontSize: 20}} title="感应灯数据">
            <p>当前光照为<Text keyboard>{info.beam}</Text></p>
            <p>当前声音为<Text keyboard>{info.sound}</Text></p>
            <p>感应灯状态为<Text keyboard>{info.status === 0 ? "关" : "开"}</Text></p>
          </Card>
        </div>
      </div>
    </>
  );
}
