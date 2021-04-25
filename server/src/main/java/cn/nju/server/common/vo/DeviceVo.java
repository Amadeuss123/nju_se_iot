package cn.nju.server.common.vo;

import cn.nju.server.common.entity.Device;

public class DeviceVo {
    private Device device;

    private Integer status;

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
