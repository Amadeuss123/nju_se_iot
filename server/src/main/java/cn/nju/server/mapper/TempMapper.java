package cn.nju.server.mapper;

import cn.nju.server.common.entity.Temp;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TempMapper {

    @Select("select deviceId,time,value from temp_tb where deviceId = #{deviceId}")
    List<Temp> getAllTemp(String deviceId);

    @Insert("insert into temp_tb(time,temperature) values(#{time,jdbcType=TIMESTAMP}),#{temperature}")
    void insertTemp(Temp temp);
}
