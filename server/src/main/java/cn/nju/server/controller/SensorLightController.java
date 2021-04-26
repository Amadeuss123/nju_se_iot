package cn.nju.server.controller;

import cn.nju.server.common.vo.IotResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sensorlight")
public class SensorLightController {

    @RequestMapping("/info/{deviceId}")
    public IotResult info(@PathVariable String deviceId) {


        return IotResult.success(null);
    }
}
