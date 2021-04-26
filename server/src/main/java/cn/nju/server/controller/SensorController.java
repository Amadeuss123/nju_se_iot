package cn.nju.server.controller;

import cn.nju.server.common.entity.Humidity;
import cn.nju.server.common.entity.Temp;
import cn.nju.server.common.vo.IotResult;
import cn.nju.server.common.vo.SensorVo;
import cn.nju.server.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @RequestMapping("/info/{deviceId}")
    public IotResult info(@PathVariable String deviceId) {
        List<Temp> tempList = sensorService.getTempList(deviceId);
        List<Humidity> humidityList = sensorService.getHumidityList(deviceId);
        SensorVo sensorVo = new SensorVo();
        sensorVo.setTempList(tempList);
        sensorVo.setHumidityList(humidityList);
        //TODO http -> get now temp
        //TODO add now temp
        return IotResult.success(sensorVo);
    }


}
