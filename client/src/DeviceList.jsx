import { Table, Typography, Button, Modal, Select, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const { Title } = Typography;
const { Option } = Select;

export default function DeviceList() {
  const [showModal, setShowModal] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const timer = useRef(null);
  const deviceIdRef = useRef(null);
  const deviceTypeRef = useRef(null);

  useEffect(() => {
    getDeviceList();
  }, []);

  const getDeviceList = async () => {
    const result = await api.get("/api/device/list");
    console.log(result.data);
    setDeviceList(result.data);
  };

  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceId",
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
    },
    {
      title: "设备状态",
      dataIndex: "deviceStatus",
    },
    {
      title: "操作",
      align: "center",
      render: (text, record) => {
        return record.deviceType === "sensor" ? (
          <Link to={`/operate/sensor/${record.deviceId}`}>查看</Link>
        ) : (
          <Link to={`/operate/rgb/${record.deviceId}`}>查看</Link>
        );
      },
    },
  ];

  // const dataSource = [
  //   {
  //     key: 1,
  //     deviceType: "RGB",
  //     deviceId: "000001",
  //     deviceStatus: "已连接",
  //   },
  //   {
  //     key: 2,
  //     deviceType: "RGB",
  //     deviceId: "000002",
  //     deviceStatus: "未连接",
  //   },
  //   {
  //     key: 3,
  //     deviceType: "sensor",
  //     deviceId: "000003",
  //     deviceStatus: "已连接",
  //   },
  // ];

  const addDevice = async () => {
    if(!deviceIdRef.current || !deviceTypeRef.current) {
      Modal.warning({
        content: '设备编号或设备类型不能为空'
      })
      setShowModal(false);
      return;
    }
    const body = {
      deviceId: deviceIdRef.current,
      deviceTypeRef: deviceTypeRef.current,
    }
    deviceIdRef.current = null;
    deviceTypeRef.current = null;
    console.log(body);
    const result = await api.post("/api/device/add", body);
    console.log(result);
    if(result.data.error) {
      Modal.error({
        content: '添加失败',
      })
    }else {
      Modal.success({
        content: '添加成功',
      })
    }
    setShowModal(false);
  };

  const handleDetecting = () => {
    if(detecting) {
      clearInterval(timer.current);
      setDetecting(false);
    }else {
      timer.current = setInterval(() => {
        getDeviceList();
      }, 2000);
      setDetecting(true);
    }
  }

  const DeviceModal = () => (
    <Modal
      visible={showModal}
      title="设备信息"
      onCancel={() => setShowModal(false)}
      onOk={addDevice}
    >
      设备编号:
      <Input
        style={{ width: 250, marginLeft: 80 }}
        placeholder="请输入设备编号"
        onChange={(e) => {
          deviceIdRef.current = e.target.value;
        }}
        required
      />
      <br />
      <br />
      设备类型:
      <Select
        style={{ width: 250, marginLeft: 80 }}
        placeholder="请选择设备类型"
        onChange={(value) => {
          deviceTypeRef.current = value;
        }}
        required
      >
        <Option value="rgb">RGB</Option>
        <Option value="sensor">传感器</Option>
      </Select>
    </Modal>
  );

  return (
    <>
      <Title level={3}>设备列表</Title>
      <Button
        type="primary"
        style={{ margin: "10px 20px 10px 0" }}
        onClick={() => setShowModal(true)}
      >
        添加设备
      </Button>
      {detecting ? <Button onClick={handleDetecting}>停止检测</Button> : <Button onClick={handleDetecting}>检测设备</Button>}
      <Table columns={columns} dataSource={deviceList} />
      <DeviceModal />
    </>
    // <Layout>
    //   <Header style={{ padding: 0 }}>
    //     <Title level={3}>设备列表</Title>
    //     <Menu
    //       onClick={handleClick}
    //       style={{ width: 256, height: 800 }}
    //       defaultSelectedKeys={["1"]}
    //       defaultOpenKeys={["sub1"]}
    //       mode="horizontal"
    //     >
    //       <Menu.Item key="1">设备列表</Menu.Item>
    //       <Menu.Item key="2">Option 2</Menu.Item>
    //       <Menu.Item key="3">Option 3</Menu.Item>
    //       <Menu.Item key="4">Option 4</Menu.Item>
    //       <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
    //     <Menu.ItemGroup key="g1" title="Item 1">
    //       <Menu.Item key="1">Option 1</Menu.Item>
    //       <Menu.Item key="2">Option 2</Menu.Item>
    //     </Menu.ItemGroup>
    //     <Menu.ItemGroup key="g2" title="Item 2">
    //       <Menu.Item key="3">Option 3</Menu.Item>
    //       <Menu.Item key="4">Option 4</Menu.Item>
    //     </Menu.ItemGroup>
    //   </SubMenu>
    //   <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
    //     <Menu.Item key="5">Option 5</Menu.Item>
    //     <Menu.Item key="6">Option 6</Menu.Item>
    //     <SubMenu key="sub3" title="Submenu">
    //       <Menu.Item key="7">Option 7</Menu.Item>
    //       <Menu.Item key="8">Option 8</Menu.Item>
    //     </SubMenu>
    //   </SubMenu>
    //   <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
    //     <Menu.Item key="9">Option 9</Menu.Item>
    //     <Menu.Item key="10">Option 10</Menu.Item>
    //     <Menu.Item key="11">Option 11</Menu.Item>
    //     <Menu.Item key="12">Option 12</Menu.Item>
    //   </SubMenu>
    //     </Menu>
    //   </Header>
    //   <Content>
    //     <Table columns={columns} dataSource={dataSource} />
    //   </Content>
    //   <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 200 }}>IoT Project ©2021 Created by Group 17</Footer>
    // </Layout>
  );
}
