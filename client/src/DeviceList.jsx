import {
  Table,
  Typography,
  Button,
  Modal,
  Select,
  Input,
  DatePicker,
  Space,
  Popconfirm,
  Form,
  Radio,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "./api";

const { Title } = Typography;
const { Option } = Select;

export default function DeviceList() {
  const [showModal, setShowModal] = useState(false);
  const [detecting, setDetecting] = useState(false);
  // const [showAdditionalOptions, setShowAdditionOptions] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const timer = useRef(null);
  const deviceIdRef = useRef(null);
  const deviceTypeRef = useRef(null);
  const deviceExpireDateRef = useRef(null);
  const showAdditionalOptions = useRef(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const additionalOptions = {};

  const additionalOptionsConfig = {
    slight: [{}, {}],
  };

  useEffect(() => {
    getDeviceList();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const getDeviceList = async () => {
    const result = await api.get("/api/device/list");
    console.log(result.data.data);
    setDeviceList(result.data.data);
  };

  const deleteDevice = async (deviceId) => {
    const result = await api.delete(`/api/device/delete/${deviceId}`);
    Modal.success({
      content: "删除成功",
    });
    getDeviceList();
  };

  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceId",
    },
    {
      title: "设备类型",
      dataIndex: "deviceType",
      render: (text, record) => {
        switch(text) {
          case 'rgb': return 'RGB';
          case 'sensor': return '传感器';
          case 'sensorlight': return '感应灯';
          default: return '未识别';
        }
      }
    },
    {
      title: "设备状态",
      dataIndex: "deviceStatus",
    },
    {
      title: "操作",
      align: "center",
      render: (text, record) => {
        return (
          <Space>
            <Link to={`/operate/${record.deviceType}/${record.deviceId}`}>查看</Link>
            <Popconfirm
              okText="确定"
              cancelText="取消"
              title="你确定要删除该设备吗"
              onConfirm={() => deleteDevice(record.deviceId)}
            >
              <Button type="link">删除</Button>
            </Popconfirm>
            <Button type="link" onClick={addRule}>
              添加规则
            </Button>
          </Space>
        );
      },
    },
  ];

  const addDevice = async () => {
    history.push('/device/add');
    // if (
    //   !deviceIdRef.current ||
    //   !deviceTypeRef.current ||
    //   !deviceExpireDateRef.current
    // ) {
    //   Modal.warning({
    //     content: "设备编号或设备类型或日期不能为空",
    //   });
    //   setShowModal(false);
    //   return;
    // }
    // const body = {
    //   deviceId: deviceIdRef.current,
    //   deviceType: deviceTypeRef.current,
    //   expireDate: deviceExpireDateRef.current,
    // };
    // deviceIdRef.current = null;
    // deviceTypeRef.current = null;
    // deviceExpireDateRef.current = null;
    // console.log(body);
    // const result = await api.post("/api/device/add", body);
    // console.log(result.data);
    // if (result.data.error) {
    //   Modal.error({
    //     title: "添加失败",
    //   });
    // } else {
    //   Modal.success({
    //     title: "添加成功",
    //     content: `授权码为${result.data.data}`,
    //   });
    // }
    // getDeviceList();
    // setShowModal(false);
  };

  const addRule = () => {};

  const handleDetecting = () => {
    if (detecting) {
      clearInterval(timer.current);
      setDetecting(false);
    } else {
      timer.current = setInterval(() => {
        getDeviceList();
      }, 2000);
      setDetecting(true);
    }
  };

  const handleSelect = (value) => {
    console.log(value);
    if (value === "slight") {
      showAdditionalOptions.current = true;
    } else {
      showAdditionalOptions.current = false;
    }
    console.log(form.getFieldsValue());
  };

  const DeviceModal = () => (
    <Modal
      visible={showModal}
      title="设备信息"
      onCancel={() => setShowModal(false)}
      onOk={addDevice}
    >
      <Form form={form} name="basic">
        <Form.Item
          label="设备编号"
          name="deviceId"
          rules={[
            {
              required: true,
              message: "请填写设备编号",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              deviceIdRef.current = e.target.value;
            }}
          />
        </Form.Item>
        <Form.Item
          label="设备类型"
          name="deviceType"
          rules={[
            {
              required: true,
              message: "请选择设备类型",
            },
          ]}
        >
          <Select
            placeholder="设备类型"
            defaultValue="rgb"
            onChange={(value) => {
              deviceTypeRef.current = value;
            }}
            onSelect={handleSelect}
          >
            <Option value="rgb">rgb</Option>
            <Option value="sensor">传感器</Option>
            <Option value="slight">感应灯</Option>
          </Select>
        </Form.Item>
        <Form.Item label="过期时间" name="expireDate" required>
          <DatePicker
            showTime
            onOk={(e) => {
              deviceExpireDateRef.current = e.format("yyyy-MM-DD hh:mm:ss");
            }}
          />
        </Form.Item>

        {/* <Form.List name="addOptions">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <Form.Item label={field.name} key={field.fieldKey}>
                  <Radio.Group defaultValue={0}>
                    <Radio value={1}>开</Radio>
                    <Radio value={0}>关</Radio>
                  </Radio.Group>
                </Form.Item>
              ))}
              <Form.Item
                label="设备类型"
                name="deviceType"
                rules={[
                  {
                    required: true,
                    message: "请选择设备类型",
                  },
                ]}
              >
                <Select
                  placeholder="设备类型"
                  defaultValue="rgb"
                  onChange={(value) => {
                    deviceTypeRef.current = value;
                  }}
                  onSelect={(value) => {
                    if (value === "slight") {
                      add();
                    }
                  }}
                >
                  <Option value="rgb">rgb</Option>
                  <Option value="sensor">传感器</Option>
                  <Option value="slight">感应灯</Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form.List> */}

        <Form.Item label="光照监控" name="beam" required>
          <Radio.Group style={{display: 'flex'}} defaultValue={0}>
            <Radio value={1}>开</Radio>
            <Radio value={0}>关</Radio>
            <Input addonBefore="光照强度小于" addonAfter="db" />
          </Radio.Group>
        </Form.Item>
        <Form.Item label="声音监控" name="sound" required>
          <Radio.Group style={{display: 'flex'}} defaultValue={0}>
            <Radio value={1}>开</Radio>
            <Radio value={0}>关</Radio>
            <Input addonBefore="声音大于" addonAfter="db" />
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      <Title level={4}>设备列表</Title>
      <Space size={15}>
        <Button
          type="primary"
          style={{ margin: "10px 0" }}
          onClick={() => history.push('/device/add')}
        >
          添加设备
        </Button>
        {detecting ? (
          <Button onClick={handleDetecting}>停止检测</Button>
        ) : (
          <Button onClick={handleDetecting}>检测设备</Button>
        )}
      </Space>
      <Table
        columns={columns}
        dataSource={deviceList}
        rowKey={(record) => record.deviceId}
      />
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
