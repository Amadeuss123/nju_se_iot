import React, { useEffect, useCallback, useState, useRef } from "react";
import { PageHeader, Typography, Card, Table } from "antd";
import Bulb from "./assets/Bulb";
import api from "./api";
import moment from 'moment';

const { Text } = Typography;

export default function SensorLightOperation(props) {
  const { deviceId } = props;
  const [info, setInfo] = useState({});
  const historyInfo = useRef([]);
  const sound = localStorage.getItem(`${deviceId}-sound`) || -1;
  const beam = localStorage.getItem(`${deviceId}-beam`) || -1;
  // const [historyInfo, setHistoryInfo] = useState([{beam:0, sound: 0, status: 0}]);
  console.log(info);
  console.log(historyInfo);

  const getSensorLightInfo = async () => {
    const result = await api.get(`/api/sensorlight/info/${deviceId}`);
    console.log("sensorlightinfo ", result);
    const newHistoryInfo = Array.from(historyInfo.current);
    newHistoryInfo.unshift({
      ...result.data,
      time: moment(new Date()).format('HH:mm:ss'),
    });
    historyInfo.current = newHistoryInfo;
    setInfo(result.data);
    // const newData = info;
    // newData.push(result);
    // console.log('newData ', newData);
    // setInfo(newData);
  };

  const columns = [
    {
      title: "光照强度",
      dataIndex: "beam",
    },
    {
      title: "声音强度",
      dataIndex: "sound",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text) => (text === 0 ? "关" : "开"),
    },
    {
      title: '时间',
      dataIndex: 'time',
      // render: () => (moment(new Date()).format('HH:mm:ss')),
    }
  ];

  useEffect(() => {
    getSensorLightInfo();
    const timer = setInterval(getSensorLightInfo, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <PageHeader
        title="感应灯信息"
        subTitle={`设备编号${deviceId}`}
        onBack={() => window.history.back()}
      />
      <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
        <div style={{ width: "30%", textAlign: "center" }}>
          <Bulb fill={info.status === 0 ? "#f1f1f1" : "#d98c44"} />
        </div>
        <div style={{ width: "60%" }}>
          <Card style={{ fontSize: 20 }} title="感应灯数据">
            <p>
              当前光照为<Text keyboard>{info.beam}</Text>
            </p>
            <p>
              当前声音为<Text keyboard>{info.sound}</Text>
            </p>
            {(sound !== -1 || beam !== -1) ? <p>
              启用规则：{beam !== -1 ? <span>光照低于<Text keyboard>{beam}</Text></span> : null }{sound !== -1 ? <span>声音高于<Text keyboard>{sound}</Text></span>: null}灯泡点亮
            </p> : null}
            <p>
              感应灯状态为
              <Text keyboard>{info.status === 0 ? "关" : "开"}</Text>
            </p>
          </Card>
        </div>
      </div>
      <Table columns={columns} dataSource={historyInfo.current} />
    </>
  );
}
