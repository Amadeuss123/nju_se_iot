package cn.nju.server.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RuleEngineMapper {

    void addDeviceRule();
}
