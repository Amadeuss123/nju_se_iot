package cn.nju.server.common.entity;

public class Rule {
    private String deviceId;

    private Float sound;

    private Float beam;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Float getSound() {
        return sound;
    }

    public void setSound(Float sound) {
        this.sound = sound;
    }

    public Float getBeam() {
        return beam;
    }

    public void setBeam(Float beam) {
        this.beam = beam;
    }

    @Override
    public String toString() {
        return "Rule{" +
                "sound=" + sound +
                ", beam=" + beam +
                '}';
    }
}
