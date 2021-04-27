package cn.nju.server.service;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.util.TokenUtils;
import cn.nju.server.mapper.DeviceMapper;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private RuleEngineService ruleEngineService;

    public String addDevice(Device device) throws IOException {
        String token = TokenUtils.generateToken(device.getDeviceId());
        device.setToken(token);

        if (device.getDeviceRule() != null) {
            handleRule(device);
        }
        deviceMapper.insertDevice(device);
        return token;
    }

    private void handleRule(Device device) throws IOException {
        System.out.println("handle: " + device.getDeviceRule());
        if (device.getDeviceRule().getBeam() != null) {
            ruleEngineService.reload("beam",device.getDeviceRule().getBeam(),device);
        }
        if (device.getDeviceRule().getSound() != null) {
            ruleEngineService.reload("sound",device.getDeviceRule().getSound(),device);
        }
    }

    public List<Device> listDevice() {
        return deviceMapper.listDevice();
    }

    public void deleteDevice(String deviceId) {
        deviceMapper.deleteDevice(deviceId);
    }
}
