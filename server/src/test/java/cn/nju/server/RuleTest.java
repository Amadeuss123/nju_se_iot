package cn.nju.server;

import cn.nju.server.common.entity.People;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.runner.RunWith;
import org.kie.api.KieBase;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class RuleTest {
    @Autowired
    private KieSession session;

    @Autowired
    private KieBase kieBase;


    @Test
    public void people() {

        People people = new People();
        people.setName("达");
        people.setSex(0);
        people.setDrlType("people");
        session.insert(people);//插入
        session.fireAllRules();//执行规则
    }
    @AfterEach
    public void runDispose() {
        session.dispose();//释放资源
    }
}
