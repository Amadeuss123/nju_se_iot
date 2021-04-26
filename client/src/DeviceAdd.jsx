import React, { useRef, useState } from "react";
import {
  PageHeader,
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  Button,
  Space,
  Modal
} from "antd";
import { useHistory } from 'react-router-dom';

import api from "./api";

const { Option } = Select;

export default function DeviceAdd() {
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [isSettingSound, setIsSettingSound] = useState(false);
  const [isSettingBeam, setIsSettingBeam] = useState(false);
  const history = useHistory();

  const [form] = Form.useForm();

  const cancelAdd = () => {
    window.history.back();
  };

  const submit = async () => {
    console.log(form.getFieldsValue());
    const body = {
      deviceId: form.getFieldValue("deviceId"),
      deviceType: form.getFieldValue("deviceType"),
      expireDate: form.getFieldValue("expireDate").format("yy-MM-DD hh:mm:ss"),
      rules: {
        beam: form.getFieldValue("bstrength"),
        sound: form.getFieldValue("sstrength"),
      },
    };
    console.log(body);
    const result = await api.post("/api/device/add", body);
    console.log(result);
    Modal.success({
      title: '添加成功',
      content: `token为${result.data.data}`,
    })
    history.push('/device/list');
  };

  return (
    <>
      <PageHeader title="添加设备" onBack={() => window.history.back()} />
      <Form
        form={form}
        name="basic"
        style={{ margin: "0 250px" }}
        onFinish={submit}
      >
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
          <Input placeholder="请输入设备编号"/>
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
            onChange={(value) => {
              if (value === "sensorlight") {
                setShowAdditionalOptions(true);
              } else {
                setShowAdditionalOptions(false);
              }
            }}
          >
            <Option value="rgb">rgb</Option>
            <Option value="sensor">传感器</Option>
            <Option value="sensorlight">感应灯</Option>
          </Select>
        </Form.Item>
        <Form.Item label="过期时间" name="expireDate" required>
          <DatePicker
            showTime
          />
        </Form.Item>

        {showAdditionalOptions ? (
          <>
            <Form.Item label="光照监控" name="beam" required>
              <Radio.Group
                style={{ display: "flex" }}
                onChange={(e) => {
                  if (e.target.value === 1) {
                    setIsSettingBeam(true);
                  } else {
                    setIsSettingBeam(false);
                  }
                }}
              >
                <Radio value={1}>开</Radio>
                <Radio value={0}>关</Radio>
              </Radio.Group>
            </Form.Item>
            {isSettingBeam ? (
              <Form.Item label="光照设置" name="bstrength" required>
                <Input addonBefore="光照强度小于" addonAfter="lx" />
              </Form.Item>
            ) : null}
            <Form.Item label="声音监控" name="sound" required>
              <Radio.Group
                style={{ display: "flex" }}
                onChange={(e) => {
                  if (e.target.value === 1) {
                    setIsSettingSound(true);
                  } else {
                    setIsSettingSound(false);
                  }
                }}
              >
                <Radio value={1}>开</Radio>
                <Radio value={0}>关</Radio>
              </Radio.Group>
            </Form.Item>
            {isSettingSound ? (
              <Form.Item label="音量设置" name="sstrength" required>
                <Input addonBefore="声音大于" addonAfter="db" />
              </Form.Item>
            ) : null}
          </>
        ) : null}

        <Form.Item>
          <Space size={10}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={cancelAdd}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
