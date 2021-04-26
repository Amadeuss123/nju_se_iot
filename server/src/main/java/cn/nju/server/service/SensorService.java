package cn.nju.server.service;

import cn.nju.server.common.entity.Humidity;
import cn.nju.server.common.entity.Temp;
import cn.nju.server.mapper.HumidityMapper;
import cn.nju.server.mapper.TempMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    private TempMapper tempMapper;

    @Autowired
    private HumidityMapper humidityMapper;


    public List<Temp> getTempList(String deviceId) {
        return tempMapper.getAllTemp(deviceId);
    }

    public List<Humidity> getHumidityList(String deviceId) {
        return humidityMapper.getAllHumidity(deviceId);
    }

    public void addTemp(Temp temp) {
        tempMapper.insertTemp(temp);
    }

    public void addHumidity(Humidity humidity) {
        humidityMapper.insertHumidity(humidity);
    }
}
