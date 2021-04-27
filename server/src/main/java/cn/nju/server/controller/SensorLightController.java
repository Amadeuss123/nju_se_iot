package cn.nju.server.controller;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.entity.People;
import cn.nju.server.common.entity.Rule;
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

@RestController
@RequestMapping("sensorlight")
public class SensorLightController {

    @Resource
    private KieCache kieCache;

    @Autowired
    private RuleEngineService ruleEngineService;

    @Autowired
    private KieSession kieSession;

    @RequestMapping("/info/{deviceId}")
    public IotResult info(@PathVariable String deviceId) throws IOException {
        People people = new People();
        people.setName("达");
        people.setSex(0);
        people.setDrlType("people");

        kieSession.insert(people);//插入
        kieSession.fireAllRules();//执行规则
        kieSession.dispose();//释放资源


        //TODO  数据库返回device
        /*Device device = new Device();
        device.setDeviceId(deviceId);
        device.setDeviceType("sensorLight");
        Rule rule = new Rule();
        rule.setSound(150F);
        rule.setBeam(150F);
        rule.setDeviceId("1");
        device.setDeviceRule(rule);
        //KieSession kieSession = kieCache.getKieContainer(deviceId).newKieSession();
        KieHelper kieHelper = new KieHelper();

        kieHelper.addContent(rule2Drl(), ResourceType.DRL);
        //KieSession kieSession = kieHelper.build().newKieSession();


        People people = new People();
        people.setName("达");
        people.setSex(1);
        people.setDrlType("people");


        kieSession.insert(people);
        SensorLightVo sensorLightVo = new SensorLightVo();
        //kieSession.insert(sensorLightVo);
        kieSession.fireAllRules();
        System.out.println(sensorLightVo.getStatus());
        kieSession.dispose();*/
        return IotResult.success(null);
    }

    public String rule2Drl() {

        StringBuilder result = new StringBuilder();
        /*package部分*/
        result.append("package cn.nju.server.rule1;\r\n");
        result.append("\r\n");

        /*导包部分*/
        //result.append("import cn.nju.server.common.vo.SensorLightVo;\r\n");
        result.append("import cn.nju.server.common.entity.Rule;\r\n");
        result.append("import java.util.List;\r\n");
        result.append("\r\n");

        /*规则申明部分*/
        result.append("rule \"32353242\"\r\n");

        /*规则属性部分*/

        /*规则条件部分*/
        result.append("\twhen\r\n");
        result.append("\t\tRule(deviceId==\"1\")\r\n");

        /*规则结果部分*/
        result.append("\tthen\r\n");
        result.append("\t\tSystem.out.println(\"动态加载的规则被触发了\");\r\n");

        /*规则结束*/
        result.append("end\r\n");
        return result.toString();
    }
}
