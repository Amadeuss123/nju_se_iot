package cn.nju.server.mapper;

import cn.nju.server.common.entity.Humidity;
import cn.nju.server.common.entity.Temp;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HumidityMapper {
    @Select("select deviceId,time,value from humidity_tb where deviceId = #{deviceId}")
    List<Humidity> getAllHumidity(String deviceId);
}
