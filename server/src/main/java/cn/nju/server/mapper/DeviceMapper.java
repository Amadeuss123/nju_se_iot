package cn.nju.server.mapper;

import cn.nju.server.common.entity.Device;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface DeviceMapper {
    @Insert({"insert into device_tb(deviceId, deviceType,expireDate,token) values(#{deviceId},#{deviceType}," +
            "#{expireDate, jdbcType=TIMESTAMP}),#{token}"})
    void insertDevice(Device device);

    @Select("select deviceId,deviceType,expireDate from device_tb")
    List<Device> listDevice();
}
