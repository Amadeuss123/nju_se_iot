package cn.nju.server.controller;

import cn.nju.server.common.entity.*;
import cn.nju.server.common.util.KieCache;
import cn.nju.server.common.vo.IotResult;
import cn.nju.server.common.vo.SensorLightVo;
import cn.nju.server.service.RuleEngineService;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.internal.utils.KieHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("sensorlight")
public class SensorLightController {

    @Resource
    private KieCache kieCache;

    @Autowired
    private RuleEngineService ruleEngineService;

    @Resource
    private KieSession kieSession;


    @RequestMapping("/info/{deviceId}")
    public IotResult info(@PathVariable String deviceId) throws IOException {


        //TODO  数据库返回device
        Device device = new Device();
        device.setDeviceId(deviceId);
        device.setDeviceType("sensorLight");


        Rule rule = getRule(deviceId);
        rule.setDeviceId(deviceId);
        device.setDeviceRule(rule);

        //verify
        kieSession.insert(device);
        SensorLightVo sensorLightVo = new SensorLightVo();
        kieSession.insert(sensorLightVo);
        kieSession.fireAllRules();
        boolean status = verify(device);

        if (rule.getBeam() != null) {
            sensorLightVo.setBeam(rule.getBeam());
        }
        if (rule.getSound() != null) {
            sensorLightVo.setSound(rule.getSound());
        }
        if (status) {
            sensorLightVo.setStatus(1);
        } else {
            sensorLightVo.setStatus(0);
        }
        return IotResult.success(sensorLightVo);
    }

    private boolean verify(Device device) {
        Map<String, Float> ruleMap = kieCache.getRule(device.getDeviceId());
        boolean beamStatus = true;
        if (ruleMap.containsKey("beam")) {
            System.out.println("beam : " + ruleMap.get("beam"));
            beamStatus = device.getDeviceRule().getBeam() < ruleMap.get("beam");
        }
        boolean soundStatus = true;
        if (ruleMap.containsKey("sound")) {
            System.out.println("sound : " + ruleMap.get("sound"));
            soundStatus = device.getDeviceRule().getSound() > ruleMap.get("sound");
        }

        System.out.println(beamStatus);
        System.out.println(soundStatus);
        return beamStatus && soundStatus;
    }

    private Rule getRule(String deviceId) {
        Map<String, Float> ruleMap = kieCache.getRule(deviceId);
        Rule rule = new Rule();
        Random random = new Random();
        if (ruleMap.containsKey("beam")) {
            float beamValue = (float) (Math.round(random.nextFloat()*100*10))/10;
            rule.setBeam(beamValue);
        }

        if (ruleMap.containsKey("sound")) {
            float soundValue = (float) (Math.round(random.nextFloat()*100*10))/10;
            rule.setSound(soundValue);
        }
        return rule;
    }
}
