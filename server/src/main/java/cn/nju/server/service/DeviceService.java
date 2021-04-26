package cn.nju.server.service;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.util.TokenUtils;
import cn.nju.server.mapper.DeviceMapper;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceMapper deviceMapper;

    @Resource
    private KieContainer kieContainer;

    public String addDevice(Device device) {
        String token = TokenUtils.generateToken(device.getDeviceId());
        device.setToken(token);

        if (device.getDeviceRule() != null) {

        }
        KieSession kieSession = kieContainer.newKieSession();



        deviceMapper.insertDevice(device);
        return token;
    }

    public List<Device> listDevice() {
        return deviceMapper.listDevice();
    }
}
