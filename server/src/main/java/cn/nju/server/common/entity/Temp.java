package cn.nju.server.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Temp {
    private String deviceId;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date time;

    private String temperature;

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }


    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
