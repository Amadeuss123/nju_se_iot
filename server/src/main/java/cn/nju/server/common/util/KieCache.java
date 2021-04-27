package cn.nju.server.common.util;

import org.kie.api.builder.KieFileSystem;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class KieCache {

    private Map<String,KieContainer> kcMap = new HashMap<>();

    private Map<String, KieFileSystem> kfMap = new HashMap<>();

    public void addKieContainer(String deviceId, KieContainer kieContainer) {
        this.kcMap.put(deviceId,kieContainer);
    }

    public void removeKieContainer(String deviceId) {
        this.kcMap.remove(deviceId);
    }

    public KieContainer getKieContainer(String deviceId) {
        return this.kcMap.get(deviceId);
    }

    public KieSession getKieSession(String deviceId) {
        return getKieContainer(deviceId).newKieSession();
    }

    public void addKieFileSystem(String deviceId,KieFileSystem kieFileSystem) {
        this.kfMap.put(deviceId,kieFileSystem);
    }

    public KieFileSystem getKieFileSystem(String deviceId) {
        return this.kfMap.get(deviceId);
    }
}
