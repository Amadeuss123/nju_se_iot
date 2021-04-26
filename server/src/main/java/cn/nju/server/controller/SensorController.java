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

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @RequestMapping("/info/{deviceId}")
    public IotResult info(@PathVariable String deviceId) {
        List<Temp> tempList = sensorService.getTempList(deviceId);
        List<Humidity> humidityList = sensorService.getHumidityList(deviceId);

        Random random = new Random();
        float temp = (float) (Math.round(random.nextFloat()*40*10))/10;
        tempList.add(new Temp(deviceId,new Date(),String.valueOf(temp)));

        float humidity = (float) (Math.round(random.nextFloat()*100*10))/10;
        humidityList.add(new Humidity(deviceId,new Date(),String.valueOf(humidity)));

        SensorVo sensorVo = new SensorVo();
        sensorVo.setTempList(tempList);
        sensorVo.setHumidityList(humidityList);
        //TODO http -> get now temp
        //TODO add now temp
        return IotResult.success(sensorVo);
    }

}
