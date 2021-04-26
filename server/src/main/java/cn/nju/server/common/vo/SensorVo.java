package cn.nju.server.common.vo;

import cn.nju.server.common.entity.Humidity;
import cn.nju.server.common.entity.Temp;

import java.util.List;

public class SensorVo {
    private List<Temp> tempList;

    private List<Humidity> humidityList;

    public List<Temp> getTempList() {
        return tempList;
    }

    public void setTempList(List<Temp> tempList) {
        this.tempList = tempList;
    }

    public List<Humidity> getHumidityList() {
        return humidityList;
    }

    public void setHumidityList(List<Humidity> humidityList) {
        this.humidityList = humidityList;
    }
}
