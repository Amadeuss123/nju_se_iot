package cn.nju.server.controller;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.vo.DeviceVo;
import cn.nju.server.common.vo.IotResult;
import cn.nju.server.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RequestMapping("/device")
@RestController
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping("/add")
    public IotResult addDevice(@RequestBody Device device) throws IOException {
        System.out.println(device.getDeviceRule());
        return IotResult.success(deviceService.addDevice(device));
    }

    @RequestMapping("/list")
    public IotResult listDevice() {
        //TODO: deviceVO  http status
        List<Device> devices = deviceService.listDevice();

        List<DeviceVo> deviceVoList = new ArrayList<>(devices.size());
        Random random = new Random();
        for (Device device : devices) {
            int status = (int) (0.5 + random.nextFloat());
            DeviceVo deviceVo = new DeviceVo();
            deviceVo.setDevice(device);
            deviceVo.setStatus(status);
            deviceVoList.add(deviceVo);
        }


        return IotResult.success(deviceVoList);
    }

    @RequestMapping("/delete/{deviceId}")
    public IotResult deleteDevice(@PathVariable String deviceId) {
        deviceService.deleteDevice(deviceId);
        return IotResult.success(null);
    }

    @RequestMapping("/test")
    public IotResult test() {
        ResponseEntity<IotResult> responseEntity = restTemplate.getForEntity("http://localhost:8080/device/list", IotResult.class);
        HttpHeaders headers = responseEntity.getHeaders();
        HttpStatus statusCode = responseEntity.getStatusCode();
        int code = statusCode.value();
        return responseEntity.getBody();
    }
}
