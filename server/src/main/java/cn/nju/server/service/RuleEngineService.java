package cn.nju.server.service;

import cn.nju.server.common.util.KieContainerCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.stereotype.Service;

@Service
public class RuleEngineService {

    private String kieContainer = "kieContainer";


    @Autowired
    private DefaultListableBeanFactory defaultListableBeanFactory;


    public void addRule() {

    }

    public void updateRule() {
        if (defaultListableBeanFactory.containsBeanDefinition(kieContainer)) {
            defaultListableBeanFactory.removeBeanDefinition(kieContainer);
        }
    }
}
