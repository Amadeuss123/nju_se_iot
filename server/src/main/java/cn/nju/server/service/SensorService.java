package cn.nju.server.service;

import cn.nju.server.common.entity.Temp;
import cn.nju.server.mapper.TempMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    private TempMapper tempMapper;

    public List<Temp> getSensorInfo(String deviceId) {
        return tempMapper.getAllTemp();
    }
}
