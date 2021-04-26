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

    @Select("insert into humidity_tb(deviceId,time,value) values(#{deviceId},#{time,jdbcType=TIMESTAMP},#{value})")
    void insertHumidity(Humidity humidity);
}
