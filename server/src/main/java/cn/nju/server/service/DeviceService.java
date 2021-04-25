package cn.nju.server.service;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.util.TokenUtils;
import cn.nju.server.common.vo.DeviceVo;
import cn.nju.server.mapper.DeviceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceMapper deviceMapper;

    public String addDevice(Device device) {
        String token = TokenUtils.generateToken(device.getDeviceId());
        device.setToken(token);
        deviceMapper.insertDevice(device);
        return token;
    }

    public List<Device> listDevice() {
        return deviceMapper.listDevice();
    }
}
