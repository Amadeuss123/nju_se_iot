package cn.nju.server.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Humidity {
    private String deviceId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date time;

    private String value;

    public Humidity() {
    }

    public Humidity(String deviceId, Date time, String value) {
        this.deviceId = deviceId;
        this.time = time;
        this.value = value;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
