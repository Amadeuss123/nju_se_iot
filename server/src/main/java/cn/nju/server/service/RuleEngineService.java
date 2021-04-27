package cn.nju.server.service;

import cn.nju.server.common.entity.Device;
import cn.nju.server.common.util.KieCache;
import org.apache.commons.io.FileUtils;
import org.kie.api.KieServices;
import org.kie.api.builder.KieBuilder;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.builder.KieRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class RuleEngineService {

    private String kieContainer = "kieContainer";

    private String kieFileSystem = "kieFileSystem";

    private KieServices kieServices = KieServices.Factory.get();

    @Resource
    private KieCache kieCache;


    public String getDrl() throws IOException {
        String fileName = "classpath:rules/people.drl";
        File file = ResourceUtils.getFile(fileName);
        return FileUtils.readFileToString(file, StandardCharsets.UTF_8);
    }



    public void reload(String ruleName, float value, Device device) throws IOException {
        String fileName = "classpath:rules/sensorLight-"+ruleName+"-rule.drl";
        File file = ResourceUtils.getFile(fileName);
        String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
        String newContent2 = replaceContent(value,content);
        System.out.println(newContent2);

        System.out.println("============================================");

        String newContent = "package plausibcheck.adress\n\nimport cn.nju.server.common.entity.Rule\nrule\"Postcode 6 numbers\"\n\n\twhen\n\t\tRule()\n\tthen\n\t\tSystem.out.println(\"规则2中打印日志：校验通过!\");\nend";
        System.out.println(newContent);

        KieFileSystem kieFileSystem = kieCache.getKieFileSystem(device.getDeviceId());
        if (kieFileSystem == null) {
            kieFileSystem = kieServices.newKieFileSystem();
        }
        kieFileSystem.write("src/main/resources/rules/temp.drl",newContent);

        kieCache.addKieFileSystem(device.getDeviceId(),kieFileSystem);

        KieRepository kieRepository = kieServices.getRepository();
        kieRepository.addKieModule(kieRepository::getDefaultReleaseId);
        KieBuilder kieBuilder = kieServices.newKieBuilder(kieFileSystem);
        kieBuilder.buildAll();
        kieCache.addKieContainer(device.getDeviceId(),kieServices.newKieContainer(kieRepository.getDefaultReleaseId()));
    }

    private String replaceContent(float newValue, String content){
        String[] lines = content.split("\\r?\\n");
        for(int i = 0; i < lines.length; i++){
            if(lines[i].trim().startsWith("$protocol")){
                int end = lines[i].indexOf('>') == -1 ? lines[i].indexOf('<') : lines[i].indexOf('>');
                if(end != -1){
                    lines[i] = lines[i].substring(0, end + 1) + " "+ newValue + ")";
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        for(String s : lines){
            sb.append(s).append("\n");
        }
        return sb.toString();
    }
}
