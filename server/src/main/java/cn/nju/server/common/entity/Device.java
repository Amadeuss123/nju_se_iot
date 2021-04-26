package cn.nju.server.common.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Device {
    private String deviceId;

    private String deviceType;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date expireDate;

    private String token;

    private Rule deviceRule;

    public Rule getDeviceRule() {
        return deviceRule;
    }

    public void setDeviceRule(Rule deviceRule) {
        this.deviceRule = deviceRule;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public Date getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(Date expireDate) {
        this.expireDate = expireDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
