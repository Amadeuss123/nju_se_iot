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
        Date date = new Date();
        Random random = new Random();
        float tempValue = (float) (Math.round(random.nextFloat()*40*10))/10;
        Temp temp = new Temp(deviceId, date, String.valueOf(tempValue));
        sensorService.addTemp(temp);
        tempList.add(temp);


        float humidityValue = (float) (Math.round(random.nextFloat()*100*10))/10;
        Humidity humidity = new Humidity(deviceId, date, String.valueOf(humidityValue));
        sensorService.addHumidity(humidity);
        humidityList.add(humidity);

        SensorVo sensorVo = new SensorVo();
        sensorVo.setTempList(tempList);
        sensorVo.setHumidityList(humidityList);
        //TODO http -> get now temp
        //TODO add now temp
        return IotResult.success(sensorVo);
    }

}
